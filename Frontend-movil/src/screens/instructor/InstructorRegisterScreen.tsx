import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useInstructors } from "../../hooks/useInstructors";
import { useNavigation } from "@react-navigation/native";
import type { IInstructor } from "../../api/instructorApi";

const MIN_LEN = 3;
const NAME_RX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;

export default function InstructorRegisterScreen() {
    const navigation = useNavigation<any>();
    const { addInstructor } = useInstructors();

    const [form, setForm] = useState<IInstructor>({ name: "", specialties: "" });
    const [errors, setErrors] = useState<{ name?: string; specialties?: string }>({});

    const validate = () => {
        const e: any = {};
        if (!form.name || !NAME_RX.test(form.name.trim())) e.name = `Solo letras/espacios y mínimo ${MIN_LEN} caracteres`;
        if (!form.specialties || form.specialties.trim().length < MIN_LEN) e.specialties = `Mínimo ${MIN_LEN} caracteres`;
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
            await addInstructor({ name: form.name.trim(), specialties: form.specialties.trim() });
            Alert.alert("✅", "Instructor creado");
            navigation.goBack();
        } catch (e: any) {
            Alert.alert("Error", e.message || "No se pudo crear");
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Registrar Instructor</Text>

                <Text style={styles.label}>Nombre</Text>
                <TextInput
                    style={[styles.input, errors.name && styles.error]}
                    value={form.name}
                    onChangeText={(t) => setForm({ ...form, name: t })}
                    placeholder="Ej: Ana López"
                    placeholderTextColor="#9ca3af"
                />
                {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

                <Text style={styles.label}>Especialidades</Text>
                <TextInput
                    style={[styles.input, errors.specialties && styles.error]}
                    value={form.specialties}
                    onChangeText={(t) => setForm({ ...form, specialties: t })}
                    placeholder="Ej: Spinning, CrossFit"
                    placeholderTextColor="#9ca3af"
                />
                {errors.specialties ? <Text style={styles.errorText}>{errors.specialties}</Text> : null}

                <TouchableOpacity style={styles.submit} onPress={onSubmit}>
                    <Text style={styles.submitText}>Crear instructor</Text>
                </TouchableOpacity>
            </ScrollView>
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
    submit: { backgroundColor: "#2563eb", borderRadius: 10, paddingVertical: 14, marginTop: 20 },
    submitText: { color: "#fff", fontWeight: "700", textAlign: "center" },
});
