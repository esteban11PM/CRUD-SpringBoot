import React, { useCallback, useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useClasses } from "../../hooks/useClasses";
import type { IClass } from "../../api/classApi";

const LIMIT = 8;

export default function ClassListScreen() {
    const { classes, loading, error, refetch, removeClass } = useClasses();
    const navigation = useNavigation<any>();
    const [refreshing, setRefreshing] = useState(false);
    const [showAll, setShowAll] = useState(false);

    useFocusEffect(useCallback(() => { refetch(); }, [refetch]));
    const onRefresh = useCallback(async () => { setRefreshing(true); await refetch(); setRefreshing(false); }, [refetch]);

    const visible = useMemo(() => (showAll ? classes : classes.slice(0, LIMIT)), [classes, showAll]);
    const remaining = Math.max(0, classes.length - LIMIT);

    const confirmDelete = (c: IClass) => {
        Alert.alert("Eliminar clase", `¿Eliminar ${c.type}?`, [
            { text: "Cancelar", style: "cancel" },
            { text: "Eliminar", style: "destructive", onPress: async () => { await removeClass(c.id_class!); refetch(); } },
        ]);
    };

    const fmt = (iso: string) => {
        try { const d = new Date(iso); return d.toLocaleString(); } catch { return iso; }
    };

    if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
    if (error) return <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>Error: {error}</Text>;

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>Clases</Text>
                <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate("ClassForm", { mode: "create" })}>
                    <Text style={styles.ctaText}>+ Nueva</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={visible}
                keyExtractor={(item) => String(item.id_class)}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ClassDetail", { id: item.id_class })}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.classType}>{item.type}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("ClassForm", { mode: "edit", id: item.id_class })}>
                                <Text style={styles.edit}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.meta}>🕒 {fmt(item.schedule)} — {item.duration}</Text>
                        <Text style={styles.meta}>👤 Instructor: {item.instructor_name}</Text>
                        <Text style={styles.meta}>👥 Capacidad: {item.max_capacity}</Text>

                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => navigation.navigate("ClassDetail", { id: item.id_class })}>
                                <Text style={styles.primary}>Ver detalle</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => confirmDelete(item)}>
                                <Text style={styles.delete}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                ListFooterComponent={
                    <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
                        {classes.length > LIMIT && (
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
    cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
    classType: { fontSize: 18, fontWeight: "700", color: "#111827" },
    edit: { color: "#2563eb", fontWeight: "600" },
    meta: { color: "#475569", marginTop: 3 },
    actions: { flexDirection: "row", gap: 24, marginTop: 12 },
    primary: { color: "#1d4ed8", fontWeight: "700" },
    delete: { color: "#b91c1c", fontWeight: "700" },
    toggle: { backgroundColor: "#f1f5f9", borderRadius: 10, paddingVertical: 10, alignItems: "center" },
    toggleText: { fontWeight: "700", color: "#0f172a" },
});
