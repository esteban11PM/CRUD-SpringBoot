// src/screens/RatingFormScreen.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity, Alert, StyleSheet,
    KeyboardAvoidingView, Platform, ScrollView, Modal, FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRatings } from "../../hooks/useRatings";
import { getClients } from "../../api/clientApi";
import { getClasses } from "../../api/classApi";
import type { IClient } from "../../api/Types/IClient";
import type { IClass } from "../../api/classApi";
import type { IRatingDTO } from "../../api/ratingApi";

const todayYMD = () => {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

const MIN_COMMENT = 5;
const clamp = (n: number) => Math.max(1, Math.min(5, Math.round(n)));

export default function RatingFormScreen() {
    const navigation = useNavigation<any>();
    const { addRating } = useRatings();

    const [clients, setClients] = useState<IClient[]>([]);
    const [classes, setClasses] = useState<IClass[]>([]);
    const [clientId, setClientId] = useState<number | null>(null);
    const [classId, setClassId] = useState<number | null>(null);
    const [rating, setRating] = useState<number>(5);
    const [comment, setComment] = useState<string>("");
    const [dateYMD] = useState<string>(todayYMD());

    const [showClientModal, setShowClientModal] = useState(false);
    const [showClassModal, setShowClassModal] = useState(false);

    useEffect(() => {
        (async () => {
            const [cli, cls] = await Promise.all([getClients(), getClasses()]);
            setClients(cli || []);
            setClasses(cls || []);
        })();
    }, []);

    const clientLabel = useMemo(() => {
        if (!clientId) return "Selecciona cliente";
        const c = clients.find(x => x.id_client === clientId);
        return c ? `${c.first_name} ${c.last_name}` : "Selecciona cliente";
    }, [clientId, clients]);

    const classLabel = useMemo(() => {
        if (!classId) return "Selecciona clase";
        const cl = classes.find(x => (x as any).id_class === classId);
        if (!cl) return "Selecciona clase";
        const when = (() => { try { return new Date(cl.schedule).toLocaleString(); } catch { return cl.schedule; } })();
        return `${cl.type} — ${when}`;
    }, [classId, classes]);

    const validate = () => {
        if (!clientId) { Alert.alert("Validación", "Debes seleccionar un cliente."); return false; }
        if (!classId) { Alert.alert("Validación", "Debes seleccionar una clase."); return false; }
        if (!(rating >= 1 && rating <= 5)) { Alert.alert("Validación", "La calificación debe ser entre 1 y 5."); return false; }
        if (!comment || comment.trim().length < MIN_COMMENT) { Alert.alert("Validación", `El comentario debe tener al menos ${MIN_COMMENT} caracteres.`); return false; }
        return true;
    };

    const onSubmit = async () => {
        if (!validate()) return;
        const payload: IRatingDTO = {
            client_id: clientId!,
            class_id: classId!,
            rating: clamp(rating),
            comment: comment.trim(),
            rating_date: dateYMD,
        };
        try {
            await addRating(payload);
            Alert.alert("✅", "Reseña creada");
            navigation.goBack();
        } catch (e: any) {
            Alert.alert("Error", e.message || "No se pudo guardar");
        }
    };

    const Star = ({ filled }: { filled: boolean }) => (
        <Text style={{ fontSize: 28, marginHorizontal: 2 }}>{filled ? "★" : "☆"}</Text>
    );

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Nueva Reseña</Text>

                <Text style={styles.label}>Cliente</Text>
                <TouchableOpacity style={styles.pill} onPress={() => setShowClientModal(true)}>
                    <Text style={styles.pillText}>{clientLabel}</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Clase</Text>
                <TouchableOpacity style={styles.pill} onPress={() => setShowClassModal(true)}>
                    <Text style={styles.pillText}>{classLabel}</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Calificación</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {[1, 2, 3, 4, 5].map(n => (
                        <TouchableOpacity key={n} onPress={() => setRating(n)}>
                            <Star filled={n <= rating} />
                        </TouchableOpacity>
                    ))}
                    <Text style={{ marginLeft: 8, color: "#475569" }}>{rating}/5</Text>
                </View>

                <Text style={styles.label}>Comentario</Text>
                <TextInput
                    style={styles.input}
                    value={comment}
                    onChangeText={setComment}
                    placeholder="Escribe tu experiencia…"
                    placeholderTextColor="#9ca3af"
                    multiline
                />

                <Text style={styles.label}>Fecha</Text>
                <View style={[styles.input, styles.readOnly]}>
                    <Text style={{ color: "#0f172a" }}>{dateYMD}</Text>
                </View>

                <TouchableOpacity style={styles.submit} onPress={onSubmit}>
                    <Text style={styles.submitText}>Publicar reseña</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Modal clientes */}
            <Modal visible={showClientModal} transparent animationType="slide" onRequestClose={() => setShowClientModal(false)}>
                <View style={styles.modalWrap}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Selecciona un cliente</Text>
                        <FlatList
                            data={clients}
                            keyExtractor={(it, i) => String(it.id_client ?? i)}
                            style={{ maxHeight: 320 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.optionItem}
                                    onPress={() => { setClientId(item.id_client!); setShowClientModal(false); }}
                                >
                                    <Text>{item.first_name} {item.last_name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={[styles.cta, { marginTop: 10 }]} onPress={() => setShowClientModal(false)}>
                            <Text style={styles.ctaText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal clases */}
            <Modal visible={showClassModal} transparent animationType="slide" onRequestClose={() => setShowClassModal(false)}>
                <View style={styles.modalWrap}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Selecciona una clase</Text>
                        <FlatList
                            data={classes}
                            keyExtractor={(it: any, i) => String(it.id_class ?? i)}
                            style={{ maxHeight: 320 }}
                            renderItem={({ item }: { item: IClass & { id_class?: number } }) => {
                                const when = (() => { try { return new Date(item.schedule).toLocaleString(); } catch { return item.schedule; } })();
                                return (
                                    <TouchableOpacity
                                        style={styles.optionItem}
                                        onPress={() => { setClassId((item as any).id_class); setShowClassModal(false); }}
                                    >
                                        <Text>{item.type} — {when}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                        <TouchableOpacity style={[styles.cta, { marginTop: 10 }]} onPress={() => setShowClassModal(false)}>
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
    readOnly: { backgroundColor: "#f1f5f9" },
    pill: { borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: "#fff" },
    pillText: { color: "#0f172a", fontSize: 16 },
    submit: { backgroundColor: "#2563eb", borderRadius: 10, paddingVertical: 14, marginTop: 20 },
    submitText: { color: "#fff", fontWeight: "700", textAlign: "center" },

    modalWrap: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "center", padding: 24 },
    modal: { backgroundColor: "#fff", borderRadius: 12, padding: 16 },
    modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
    optionItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
    cta: { backgroundColor: "#2563eb", paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, alignSelf: "flex-end" },
    ctaText: { color: "#fff", fontWeight: "700" },
});
