// src/screens/RatingListScreen.tsx
import React, { useCallback, useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, RefreshControl } from "react-native";
import { useRatings } from "../../hooks/useRatings";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const LIMIT = 8;

const Stars = ({ n }: { n: number }) => (
    <Text style={{ color: "#f59e0b", fontSize: 16 }}>
        {Array.from({ length: 5 }).map((_, i) => (i < n ? "★" : "☆")).join("")}
    </Text>
);

export default function RatingListScreen() {
    const navigation = useNavigation<any>();
    const { ratings, loading, error, refetch, removeRating } = useRatings();
    const [refreshing, setRefreshing] = useState(false);
    const [showAll, setShowAll] = useState(false);

    useFocusEffect(useCallback(() => { refetch(); }, [refetch]));
    const onRefresh = useCallback(async () => { setRefreshing(true); await refetch(); setRefreshing(false); }, [refetch]);

    const visible = useMemo(() => (showAll ? ratings : ratings.slice(0, LIMIT)), [ratings, showAll]);
    const remaining = Math.max(0, ratings.length - LIMIT);

    const confirmDelete = (id: number) => {
        Alert.alert("Eliminar reseña", "¿Estás seguro de eliminar esta reseña?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Eliminar", style: "destructive", onPress: async () => { await removeRating(id); refetch(); } },
        ]);
    };

    if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    if (error) return <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>Error: {error}</Text>;

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>Reseñas</Text>
                <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate("RatingForm")}>
                    <Text style={styles.ctaText}>+ Nueva</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={visible}
                keyExtractor={(item, i) => String(item.id_rating ?? i)}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={styles.name}>{item.client_full_name ?? "Cliente"}</Text>
                            <Stars n={item.rating} />
                        </View>
                        <Text style={styles.detail}>Clase: {item.class_type ?? "-"}</Text>
                        <Text style={styles.comment}>"{item.comment}"</Text>
                        <Text style={styles.date}>📅 {item.rating_date}</Text>

                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => confirmDelete(item.id_rating)}>
                                <Text style={styles.delete}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListFooterComponent={
                    <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
                        {ratings.length > LIMIT && (
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
    name: { fontSize: 18, fontWeight: "700", color: "#111827" },
    detail: { color: "#475569", marginTop: 6 },
    comment: { color: "#0f172a", marginTop: 8, fontStyle: "italic" },
    date: { color: "#64748b", marginTop: 6 },
    actions: { flexDirection: "row", gap: 24, marginTop: 12, justifyContent: "flex-end" },
    delete: { color: "#b91c1c", fontWeight: "700" },
    toggle: { backgroundColor: "#f1f5f9", borderRadius: 10, paddingVertical: 10, alignItems: "center" },
    toggleText: { fontWeight: "700", color: "#0f172a" },
});
