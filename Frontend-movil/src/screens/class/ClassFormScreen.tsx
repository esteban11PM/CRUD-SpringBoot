// src/screens/ClassFormScreen.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Modal,
    FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { IClass, getClassById } from "../../api/classApi";
import { useClasses } from "../../hooks/useClasses";
import { getInstructorOptions, InstructorOption } from "../../api/instructorApi";
import { classEnd, overlaps } from "../../utils/schedule";

type ParamList = { ClassForm: { mode: "create" | "edit"; id?: number } };

// Duraciones predefinidas (label → HH:mm:ss)
const DURATION_PRESETS: { label: string; value: string }[] = [
    { label: "30 min", value: "00:30:00" },
    { label: "45 min", value: "00:45:00" },
    { label: "1 hora", value: "01:00:00" },
    { label: "1 h 30 min", value: "01:30:00" },
    { label: "2 horas", value: "02:00:00" },
];

// Slots de hora (sólo hh:mm; ajusta a tu operación)
const TIME_SLOTS = [
    "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00",
];

const toLocalISOWithTZ = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, "0");
    const tzOffsetMin = d.getTimezoneOffset();
    const sign = tzOffsetMin > 0 ? "-" : "+";
    const hh = pad(Math.floor(Math.abs(tzOffsetMin) / 60));
    const mm = pad(Math.abs(tzOffsetMin) % 60);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}${sign}${hh}:${mm}`;
};

const DURATION_RX = /^([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$/; // HH:mm:ss

export default function ClassFormScreen() {
    const { addClass, updateClassById, classes, refetch } = useClasses();
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<ParamList, "ClassForm">>();
    const mode = route.params?.mode ?? "create";
    const editingId = route.params?.id;

    // Instructores
    const [instructors, setInstructors] = useState<InstructorOption[]>([]);
    const [showInstructorModal, setShowInstructorModal] = useState(false);

    // Fecha / Hora / Duración con UI amigable
    const [date, setDate] = useState<Date>(new Date()); // sólo fecha
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [time, setTime] = useState<string>("07:30"); // "HH:mm"
    const [showTimeModal, setShowTimeModal] = useState(false);

    const [durationLabel, setDurationLabel] = useState<string>(DURATION_PRESETS[2].label); // "1 hora"
    const [showDurationModal, setShowDurationModal] = useState(false);

    const [form, setForm] = useState<IClass>({
        type: "",
        schedule: "",          // se construye desde date + time
        duration: "01:00:00",  // se llena desde durationLabel
        max_capacity: 20,
        instructor_id: undefined,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Cargar instructores
    useEffect(() => {
        (async () => {
            const opts = await getInstructorOptions();
            setInstructors(opts);
        })();
    }, []);

    // Si editamos, precargar datos
    useEffect(() => {
        (async () => {
            if (mode === "edit" && editingId) {
                const data = await getClassById(editingId);
                // Derivar date + time desde schedule
                const d = new Date(data.schedule);
                const pad = (n: number) => String(n).padStart(2, "0");

                setDate(new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0));
                setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}`);

                // Duración
                const durPreset = DURATION_PRESETS.find(p => p.value === data.duration);
                setDurationLabel(durPreset?.label ?? data.duration);

                // Instructor: forzamos selección; si tienes endpoint que devuelve id, úsalo aquí
                setForm({
                    type: data.type,
                    schedule: data.schedule, // se recalculará al guardar
                    duration: data.duration,
                    max_capacity: data.max_capacity,
                    instructor_id: undefined, // elige desde el modal
                });
            }
        })();
    }, [mode, editingId]);

    const instructorLabel = useMemo(() => {
        if (!form.instructor_id) return "Selecciona un instructor";
        const found = instructors.find(i => i.id === form.instructor_id);
        return found ? found.label : "Selecciona un instructor";
    }, [form.instructor_id, instructors]);

    // Construir ISO con TZ desde date + time
    const buildScheduleISO = () => {
        const [hh, mm] = time.split(":").map(Number);
        const composed = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hh || 0, mm || 0, 0);
        return toLocalISOWithTZ(composed);
    };

    // Convertir duración label → HH:mm:ss
    const buildDurationValue = () => {
        const found = DURATION_PRESETS.find(d => d.label === durationLabel);
        return found?.value ?? form.duration; // fallback
    };

    const instructorOptions = useMemo(
        () => instructors.map(i => ({ id: i.id, label: i.label })),
        [instructors]
    );

    const validate = (): boolean => {
        const e: Record<string, string> = {};
        if (!form.type || form.type.trim().length < 3) e.type = "Mínimo 3 caracteres";
        const durationValue = buildDurationValue();
        if (!DURATION_RX.test(durationValue)) e.duration = "Duración inválida";
        if (!form.max_capacity || Number(form.max_capacity) <= 0) e.max_capacity = "Debe ser > 0";
        if (!form.instructor_id) e.instructor_id = "Selecciona un instructor";

        const scheduleISO = buildScheduleISO();
        if (!scheduleISO) e.schedule = "Horario obligatorio";

        // Validar solapamiento de instructor (frontend)
        if (form.instructor_id && scheduleISO) {
            const startA = new Date(scheduleISO);
            const endA = classEnd({ schedule: scheduleISO, duration: durationValue });
            const conflict = classes.some(c => {
                if (mode === "edit" && c.id_class === editingId) return false;
                // IMPORTANTE: necesitamos instructor_id en las clases existentes para validar.
                // Si no lo tienes en GET, esta validación se vuelve parcial en front.
                return (c as any).instructor_id === form.instructor_id && overlaps(
                    new Date(c.schedule),
                    classEnd({ schedule: c.schedule, duration: c.duration }),
                    startA,
                    endA
                );
            });
            if (conflict) e.instructor_id = "Instructor ya tiene clase en ese horario";
        }

        setErrors(e);
        if (Object.keys(e).length) {
            Alert.alert("Validación", "Corrige los campos marcados.");
            return false;
        }
        return true;
    };

    const onSubmit = async () => {
        if (!validate()) return;

        try {
            const payload: IClass = {
                type: form.type.trim(),
                schedule: buildScheduleISO(),      // "YYYY-MM-DDTHH:mm:ss±TZ"
                duration: buildDurationValue(),    // "HH:mm:ss"
                max_capacity: Number(form.max_capacity),
                instructor_id: form.instructor_id!,
            };

            if (mode === "edit" && editingId) {
                await updateClassById(editingId, payload);
            } else {
                await addClass(payload);
            }
            await refetch();
            navigation.goBack();
        } catch (e: any) {
            Alert.alert("Error", e.message || "No se pudo guardar la clase");
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>{mode === "edit" ? "Editar Clase" : "Nueva Clase"}</Text>

                <Text style={styles.label}>Tipo</Text>
                <TextInput
                    style={[styles.input, errors.type && styles.error]}
                    value={form.type}
                    onChangeText={t => setForm({ ...form, type: t })}
                    placeholder="Ej: Spinning"
                    placeholderTextColor="#9ca3af"
                />
                {errors.type ? <Text style={styles.errorText}>{errors.type}</Text> : null}

                {/* Fecha + Hora preset */}
                <Text style={styles.label}>Fecha</Text>
                <TouchableOpacity style={styles.pill} onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.pillText}>
                        {new Date(date).toLocaleDateString()}
                    </Text>
                </TouchableOpacity>
                {errors.schedule ? <Text style={styles.errorText}>{errors.schedule}</Text> : null}
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={(event, d) => {
                            setShowDatePicker(false);
                            if (d) setDate(new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0));
                        }}
                    />
                )}

                <Text style={styles.label}>Hora</Text>
                <TouchableOpacity style={styles.pill} onPress={() => setShowTimeModal(true)}>
                    <Text style={styles.pillText}>{time}</Text>
                </TouchableOpacity>

                {/* Duración preset */}
                <Text style={styles.label}>Duración</Text>
                <TouchableOpacity style={styles.pill} onPress={() => setShowDurationModal(true)}>
                    <Text style={styles.pillText}>{durationLabel}</Text>
                </TouchableOpacity>
                {errors.duration ? <Text style={styles.errorText}>{errors.duration}</Text> : null}

                {/* Capacidad */}
                <Text style={styles.label}>Capacidad Máxima</Text>
                <TextInput
                    style={[styles.input, errors.max_capacity && styles.error]}
                    value={String(form.max_capacity)}
                    onChangeText={t => setForm({ ...form, max_capacity: Number(t.replace(/[^\d]/g, "")) || 0 })}
                    keyboardType="number-pad"
                    placeholder="20"
                    placeholderTextColor="#9ca3af"
                    maxLength={3}
                />
                {errors.max_capacity ? <Text style={styles.errorText}>{errors.max_capacity}</Text> : null}

                {/* Instructor modal list con scroll */}
                <Text style={styles.label}>Instructor</Text>
                <TouchableOpacity style={[styles.pill, errors.instructor_id && styles.error]} onPress={() => setShowInstructorModal(true)}>
                    <Text style={styles.pillText}>{instructorLabel}</Text>
                </TouchableOpacity>
                {errors.instructor_id ? <Text style={styles.errorText}>{errors.instructor_id}</Text> : null}

                <TouchableOpacity style={styles.submit} onPress={onSubmit}>
                    <Text style={styles.submitText}>{mode === "edit" ? "Guardar cambios" : "Crear clase"}</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Modal: Horario (time slots) */}
            <Modal visible={showTimeModal} transparent animationType="slide" onRequestClose={() => setShowTimeModal(false)}>
                <View style={styles.modalWrap}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Selecciona hora</Text>
                        <FlatList
                            data={TIME_SLOTS}
                            keyExtractor={(item) => item}
                            style={{ maxHeight: 300 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.optionItem, time === item && styles.optionItemActive]}
                                    onPress={() => { setTime(item); setShowTimeModal(false); }}
                                >
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={[styles.cta, { marginTop: 10 }]} onPress={() => setShowTimeModal(false)}>
                            <Text style={styles.ctaText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal: Duración */}
            <Modal visible={showDurationModal} transparent animationType="slide" onRequestClose={() => setShowDurationModal(false)}>
                <View style={styles.modalWrap}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Selecciona duración</Text>
                        <FlatList
                            data={DURATION_PRESETS}
                            keyExtractor={(item) => item.value}
                            style={{ maxHeight: 300 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.optionItem, durationLabel === item.label && styles.optionItemActive]}
                                    onPress={() => { setDurationLabel(item.label); setForm({ ...form, duration: item.value }); setShowDurationModal(false); }}
                                >
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={[styles.cta, { marginTop: 10 }]} onPress={() => setShowDurationModal(false)}>
                            <Text style={styles.ctaText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal: Instructor list con scroll */}
            <Modal visible={showInstructorModal} transparent animationType="slide" onRequestClose={() => setShowInstructorModal(false)}>
                <View style={styles.modalWrap}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Selecciona un instructor</Text>
                        <FlatList
                            data={instructorOptions}
                            keyExtractor={(item) => String(item.id)}
                            style={{ maxHeight: 320 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.optionItem, form.instructor_id === item.id && styles.optionItemActive]}
                                    onPress={() => { setForm({ ...form, instructor_id: item.id }); setShowInstructorModal(false); }}
                                >
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={[styles.cta, { marginTop: 10 }]} onPress={() => setShowInstructorModal(false)}>
                            <Text style={styles.ctaText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: "#f8fafc", flexGrow: 1 },
    title: { fontSize: 22, fontWeight: "700", color: "#0f172a", textAlign: "center", marginBottom: 16 },
    label: { fontSize: 14, fontWeight: "600", color: "#334155", marginTop: 12, marginBottom: 6 },

    input: { borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10, padding: 12, backgroundColor: "#fff", color: "#0f172a" },
    error: { borderColor: "#b91c1c" },
    errorText: { color: "#b91c1c", marginTop: 4 },

    pill: {
        borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10, paddingVertical: 12, paddingHorizontal: 14,
        backgroundColor: "#fff",
    },
    pillText: { color: "#0f172a", fontSize: 16 },

    submit: { backgroundColor: "#2563eb", borderRadius: 10, paddingVertical: 14, marginTop: 20 },
    submitText: { color: "#fff", fontWeight: "700", textAlign: "center" },

    // Modal genérico
    modalWrap: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "center", padding: 24 },
    modal: { backgroundColor: "#fff", borderRadius: 12, padding: 16 },
    modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
    optionItem: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
        borderRadius: 8,
    },
    optionItemActive: { backgroundColor: "#eff6ff", borderColor: "#bfdbfe" },
    optionText: { color: "#111827" },

    cta: { backgroundColor: "#2563eb", paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, alignSelf: "flex-end" },
    ctaText: { color: "#fff", fontWeight: "700" },
});
