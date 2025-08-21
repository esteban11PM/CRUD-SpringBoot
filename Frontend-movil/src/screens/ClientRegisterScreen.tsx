import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { IClient } from '../api/Types/IClient';
import { useClients } from '../hooks/useClients';
import { useNavigation } from '@react-navigation/native';

// Hook y componente reusables
import { useMemberships } from '../hooks/useMemberships';
import { SelectList } from '../components/SelectList';

// Helpers
const toYMD = (d: Date | string): string => {
    if (!d) return '';
    if (typeof d === 'string') return d.split('T')[0];
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const addMonths = (src: Date, months: number) => {
    const d = new Date(src.getTime());
    const day = d.getDate();
    d.setMonth(d.getMonth() + months);
    // Ajuste por meses con menos días (p.ej., 31 -> 30/28)
    if (d.getDate() < day) d.setDate(0);
    return d;
};

const MIN_NAME_LEN = 3;
const PHONE_REGEX = /^\d{10}$/;

type Errors = Partial<Record<keyof IClient | 'membership_required', string>>;

export default function ClientRegisterScreen() {
    const navigation = useNavigation();
    const { addClient } = useClients();
    const { options: membershipOptions, loading: loadingMemberships, error: errorMemberships } = useMemberships();

    // Fechas auto (hoy y +1 mes)
    const today = useMemo(() => new Date(), []);
    const nextMonth = useMemo(() => addMonths(today, 1), [today]);

    const [client, setClient] = useState<IClient>({
        first_name: '',
        last_name: '',
        phone: '',
        membership_start_date: today,
        membership_end_date: nextMonth,
        // membership_id se define al seleccionar
    });

    const [selectedMembershipId, setSelectedMembershipId] = useState<number | null>(null);
    const [errors, setErrors] = useState<Errors>({});

    useEffect(() => {
        // Forzar que siempre estén las fechas auto
        setClient(prev => ({
            ...prev,
            membership_start_date: today,
            membership_end_date: nextMonth,
        }));
    }, [today, nextMonth]);

    const handleChange = (key: keyof IClient, value: string) => {
        setClient(prev => ({ ...prev, [key]: value as any }));
    };

    const selectOptions = useMemo(
        () => membershipOptions.map(o => ({ label: o.label, value: o.id })),
        [membershipOptions]
    );

    const validate = (): boolean => {
        const newErrors: Errors = {};

        if (
            !client.first_name ||
            client.first_name.trim().length < MIN_NAME_LEN ||
            /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(client.first_name)
        ) {
            newErrors.first_name = `Solo letras y mínimo ${MIN_NAME_LEN} caracteres`;
        }

        if (!client.last_name || client.last_name.trim().length < MIN_NAME_LEN ||
            /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(client.last_name)) {
            newErrors.last_name = `Solo letras y mínimo ${MIN_NAME_LEN} caracteres`;
        }

        if (!client.phone || !PHONE_REGEX.test(client.phone.trim())) {
            newErrors.phone = 'El teléfono debe tener exactamente 10 dígitos';
        }

        if (!selectedMembershipId) {
            newErrors.membership_required = 'Debes seleccionar una membresía';
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            Alert.alert('Validación', 'Por favor corrige los campos marcados.');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            const payload: IClient = {
                ...client,
                membership_id: Number(selectedMembershipId),
            };

            await addClient(payload);
            Alert.alert('✅ Cliente registrado con éxito');
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Error al registrar el cliente', error?.message || '');
        }
    };

    if (loadingMemberships) {
        return <Text style={{ marginTop: 50, textAlign: 'center' }}>Cargando...</Text>;
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Registrar Cliente</Text>

                {errorMemberships ? (
                    <Text style={{ color: '#b91c1c', marginBottom: 12 }}>
                        No se pudieron cargar las membresías: {errorMemberships}
                    </Text>
                ) : null}

                <Text style={styles.label}>Nombre</Text>
                <TextInput
                    style={[styles.input, errors.first_name && styles.inputError]}
                    placeholder="Ej: Juan"
                    placeholderTextColor="#aaa"
                    value={client.first_name}
                    onChangeText={(text) => handleChange('first_name', text)}
                />
                {errors.first_name ? <Text style={styles.errorText}>{errors.first_name}</Text> : null}

                <Text style={styles.label}>Apellido</Text>
                <TextInput
                    style={[styles.input, errors.last_name && styles.inputError]}
                    placeholder="Ej: Pérez"
                    placeholderTextColor="#aaa"
                    value={client.last_name}
                    onChangeText={(text) => handleChange('last_name', text)}
                />
                {errors.last_name ? <Text style={styles.errorText}>{errors.last_name}</Text> : null}

                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                    style={[styles.input, errors.phone && styles.inputError]}
                    placeholder="Ej: 3001234567"
                    placeholderTextColor="#aaa"
                    keyboardType="number-pad"
                    value={client.phone}
                    onChangeText={(text) => handleChange('phone', text.replace(/[^\d]/g, ''))}
                    maxLength={10}
                />
                {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

                <Text style={styles.label}>Membresía</Text>
                {selectOptions.length === 0 ? (
                    <Text style={{ color: '#6b7280', marginBottom: 8 }}>No hay membresías disponibles.</Text>
                ) : (
                    <>
                        <SelectList
                            options={selectOptions}
                            value={selectedMembershipId}
                            onChange={(v) => setSelectedMembershipId(Number(v))}
                            placeholder="Selecciona la membresía"
                        />
                        {errors.membership_required ? (
                            <Text style={styles.errorText}>{errors.membership_required}</Text>
                        ) : null}
                    </>
                )}

                {/* Fechas auto (solo lectura para cumplir requerimiento) */}
                <Text style={styles.label}>Inicio de Membresía</Text>
                <View style={[styles.input, styles.readOnly]}>
                    <Text style={{ color: '#111827' }}>{toYMD(client.membership_start_date as Date)}</Text>
                </View>

                <Text style={styles.label}>Fin de Membresía</Text>
                <View style={[styles.input, styles.readOnly]}>
                    <Text style={{ color: '#111827' }}>{toYMD(client.membership_end_date as Date)}</Text>
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Registrar Cliente</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9fafb',
        flexGrow: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1f2937',
        textAlign: 'center',
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 6,
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#111827',
    },
    inputError: {
        borderColor: '#b91c1c',
    },
    readOnly: {
        backgroundColor: '#e5e7eb',
    },
    errorText: {
        color: '#b91c1c',
        marginTop: 4,
    },
    dateText: {
        fontSize: 16,
        color: '#111827',
    },
    submitButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 24,
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 6,
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
});
