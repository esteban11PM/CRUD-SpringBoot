import React, { useEffect, useMemo, useRef, useState } from 'react';
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
    ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

import { IClient } from '../api/Types/IClient';
import { useClients } from '../hooks/useClients';
import { getClientById } from '../api/clientApi';

import { useMemberships } from '../hooks/useMemberships';
import { SelectList } from '../components/SelectList';

type RootStackParamList = { ClientUpdate: { id: number } };

const toYMD = (d: Date | string): string => {
    if (!d) return '';
    if (typeof d === 'string') return d.split('T')[0];
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const MIN_NAME_LEN = 3;
const PHONE_REGEX = /^\d{10}$/;
type Errors = Partial<Record<keyof IClient | 'membership_required', string>>;

export default function ClientUpdateScreen() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RootStackParamList, 'ClientUpdate'>>();
    const { id } = route.params;

    const { updateClientById } = useClients();
    const { options: membershipOptions, loading: loadingMemberships, error: errorMemberships } = useMemberships();

    const [client, setClient] = useState<IClient | null>(null);
    const [loadingClient, setLoadingClient] = useState(true);

    const [selectedMembershipId, setSelectedMembershipId] = useState<number | null>(null);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [errors, setErrors] = useState<Errors>({});

    const preselectDoneRef = useRef(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoadingClient(true);
                const data = await getClientById(id);
                if (!mounted) return;
                setClient({
                    ...data,
                    membership_start_date: new Date(data.membership_start_date),
                    membership_end_date: new Date(data.membership_end_date),
                });
            } catch {
                Alert.alert('Error', 'No se pudo cargar el cliente');
                navigation.goBack();
            } finally {
                if (mounted) setLoadingClient(false);
            }
        })();
        return () => { mounted = false; };
    }, [id, navigation]);

    useEffect(() => {
        if (preselectDoneRef.current) return;
        if (!client || membershipOptions.length === 0) return;
        const labelFromClient = (client as any).membership_type ?? (client as any).name ?? undefined;
        if (labelFromClient) {
            const match = membershipOptions.find((o) => o.label === String(labelFromClient));
            if (match) {
                setSelectedMembershipId(match.id);
                preselectDoneRef.current = true;
                return;
            }
        }
        preselectDoneRef.current = true;
    }, [client, membershipOptions]);

    useEffect(() => {
        if (!client) return;
        if (!client.membership_start_date) return;
        const startDate = new Date(client.membership_start_date);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
        setClient((prev) => prev ? { ...prev, membership_end_date: endDate } : prev);
    }, [client?.membership_start_date]);

    const handleChange = (key: keyof IClient, value: string | Date) => {
        if (!client) return;
        setClient({ ...client, [key]: value as any });
    };

    const validate = (): boolean => {
        if (!client) return false;
        const newErrors: Errors = {};

        if (!client.first_name || client.first_name.trim().length < MIN_NAME_LEN) {
            newErrors.first_name = `Mínimo ${MIN_NAME_LEN} caracteres`;
        }
        if (!client.last_name || client.last_name.trim().length < MIN_NAME_LEN) {
            newErrors.last_name = `Mínimo ${MIN_NAME_LEN} caracteres`;
        }
        if (!client.phone || !PHONE_REGEX.test(client.phone.trim())) {
            newErrors.phone = 'El teléfono debe tener exactamente 10 dígitos';
        }
        if (!selectedMembershipId) {
            newErrors.membership_required = 'Debes seleccionar una membresía';
        }
        if (!client.membership_start_date) {
            newErrors.membership_start_date = 'Fecha de inicio obligatoria';
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            Alert.alert('Validación', 'Por favor corrige los campos marcados.');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!client) return;
        if (!validate()) return;

        try {
            await updateClientById(id, {
                ...client,
                membership_id: Number(selectedMembershipId),
            });
            Alert.alert('✅ Cliente actualizado con éxito');
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Error al actualizar el cliente', error?.message || '');
        }
    };

    const isLoading = loadingClient || loadingMemberships;
    const selectOptions = useMemo(
        () => membershipOptions.map((o) => ({ label: o.label, value: o.id })),
        [membershipOptions]
    );

    if (isLoading || !client) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Actualizar Cliente</Text>

                {errorMemberships ? (
                    <Text style={{ color: '#b91c1c', marginBottom: 12 }}>
                        No se pudieron cargar las membresías: {errorMemberships}
                    </Text>
                ) : null}

                <Text style={styles.label}>Nombre</Text>
                <TextInput
                    style={[styles.input, styles.readOnly, errors.first_name && styles.inputError]}
                    value={client.first_name}
                    editable={false}
                />
                {errors.first_name ? <Text style={styles.errorText}>{errors.first_name}</Text> : null}

                <Text style={styles.label}>Apellido</Text>
                <TextInput
                    style={[styles.input, styles.readOnly, errors.last_name && styles.inputError]}
                    value={client.last_name}
                    editable={false}
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

                <Text style={styles.label}>Inicio de Membresía</Text>
                <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartPicker(true)}>
                    <Text style={styles.dateText}>{toYMD(client.membership_start_date as Date)}</Text>
                </TouchableOpacity>
                {errors.membership_start_date ? <Text style={styles.errorText}>{errors.membership_start_date}</Text> : null}
                {showStartPicker && (
                    <DateTimePicker
                        value={client.membership_start_date as Date}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event, date) => {
                            setShowStartPicker(false);
                            if (date) handleChange('membership_start_date', date);
                        }}
                    />
                )}

                <Text style={styles.label}>Fin de Membresía</Text>
                <View style={[styles.dateButton, styles.readOnly]}>
                    <Text style={styles.dateText}>{toYMD(client.membership_end_date as Date)}</Text>
                </View>
                {errors.membership_end_date ? <Text style={styles.errorText}>{errors.membership_end_date}</Text> : null}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Guardar Cambios</Text>
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
        color: '#6b7280',
    },
    dateButton: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 10,
        padding: 12,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#111827',
    },
    errorText: {
        color: '#b91c1c',
        marginTop: 4,
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
