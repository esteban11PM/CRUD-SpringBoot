import React, { useCallback, useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, RefreshControl } from "react-native";
import { useInstructors } from "../../hooks/useInstructors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const LIMIT = 8;

export default function InstructorListScreen() {
    const { instructors, loading, error, refetch, removeInstructor } = useInstructors();
    const navigation = useNavigation<any>();
    const [refreshing, setRefreshing] = useState(false);
    const [showAll, setShowAll] = useState(false);

    useFocusEffect(useCallback(() => { refetch(); }, [refetch]));
    const onRefresh = useCallback(async () => { setRefreshing(true); await refetch(); setRefreshing(false); }, [refetch]);

    const visible = useMemo(() => (showAll ? instructors : instructors.slice(0, LIMIT)), [instructors, showAll]);
    const remaining = Math.max(0, instructors.length - LIMIT);

    const confirmDelete = (id: number, name?: string) => {
        Alert.alert("Eliminar instructor", `¿Eliminar a ${name ?? "este instructor"}?`, [
            { text: "Cancelar", style: "cancel" },
            { text: "Eliminar", style: "destructive", onPress: async () => { await removeInstructor(id); refetch(); } },
        ]);
    };

    if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    if (error) return <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>Error: {error}</Text>;

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>Instructores</Text>
                <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate("InstructorRegister")}>
                    <Text style={styles.ctaText}>+ Nuevo</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={visible}
                keyExtractor={(item, i) => String(item.id_instructor ?? i)}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.detail}>Especialidades: {item.specialties}</Text>

                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => navigation.navigate("InstructorUpdate", { id: item.id_instructor })}>
                                <Text style={styles.edit}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => confirmDelete(item.id_instructor!, item.name)}>
                                <Text style={styles.delete}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListFooterComponent={
                    <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
                        {instructors.length > LIMIT && (
                            <TouchableOpacity style={styles.toggle} onPress={() => setShowAll(s => !s)}>
                                <Text style={styles.toggleText}>{showAll ? "Ver menos" : `Ver más (${remaining})`}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: { paddingHorizontal: 16, paddingVertical: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    title: { fontSize: 22, fontWeight: "700", color: "#0f172a" },
    cta: { backgroundColor: "#2563eb", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
    ctaText: { color: "#fff", fontWeight: "700" },
    list: { padding: 16 },
    card: { backgroundColor: "#fff", padding: 16, marginBottom: 12, borderRadius: 12, borderWidth: 1, borderColor: "#eef2f7" },
    name: { fontSize: 18, fontWeight: "700", color: "#111827", marginBottom: 6 },
    detail: { color: "#475569" },
    actions: { flexDirection: "row", gap: 24, marginTop: 12 },
    edit: { color: "#1d4ed8", fontWeight: "700" },
    delete: { color: "#b91c1c", fontWeight: "700" },
    toggle: { backgroundColor: "#f1f5f9", borderRadius: 10, paddingVertical: 10, alignItems: "center" },
    toggleText: { fontWeight: "700", color: "#0f172a" },
});
