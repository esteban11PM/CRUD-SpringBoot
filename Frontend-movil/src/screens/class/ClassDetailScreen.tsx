// src/screens/ClassDetailScreen.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    Modal,
    FlatList,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { getClassById, IClass } from "../../api/classApi";
import {
    createRegistration,
    getRegistrationsByClass,
    deleteRegistration as apiDeleteRegistration,
} from "../../api/classRegistrationApi";
import {
    getAttendanceByClass,
    markAttendance,
} from "../../api/attendanceApi";
import { getClients } from "../../api/clientApi";
import type { IClient } from "../../api/Types/IClient";

type ParamList = { ClassDetail: { id: number } };

type RegItem = {
    id?: number;                // puede ser sintético para key
    reg_backend_id?: number | null; // id real del pivote si el backend lo envía (id_classRegistration)
    class_id: number;
    client_id: number | null;
    client_full_name?: string;
};

const todayYMD = () => {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

const fullNameOf = (c: IClient) =>
    `${c.first_name ?? ""} ${c.last_name ?? ""}`.trim();

export default function ClassDetailScreen() {
    const route = useRoute<RouteProp<ParamList, "ClassDetail">>();
    const navigation = useNavigation<any>();
    const id = route.params.id;

    const [cls, setCls] = useState<IClass | null>(null);
    const [loading, setLoading] = useState(true);
    const [registrations, setRegistrations] = useState<RegItem[]>([]);
    const [clients, setClients] = useState<IClient[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [attendedSet, setAttendedSet] = useState<Set<number>>(new Set());

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [c, regsRaw, cli, atd] = await Promise.all([
                getClassById(id),
                getRegistrationsByClass(id),
                getClients(),
                getAttendanceByClass(id),
            ]);

            setCls(c);
            setClients(cli || []);

            // Mapa nombre → id_client
            const byName = new Map<string, number>();
            (cli || []).forEach((cl) => byName.set(fullNameOf(cl), cl.id_client!));

            // Normaliza registros
            const regs: RegItem[] = (regsRaw || []).map((r: any, idx: number) => {
                const clientName =
                    r.client_full_name ??
                    r.clientName ??
                    (r.client ? fullNameOf(r.client) : undefined);

                const inferredClientId =
                    r.client_id ??
                    r.id_client ??
                    (clientName ? byName.get(clientName) ?? null : null);

                const classId = r.class_id ?? r.id_class ?? id;

                const regBackendId =
                    r.id_classRegistration ?? r.id ?? r.registration_id ?? null;

                return {
                    id:
                        r.id ??
                        r.id_classRegistration ??
                        Number(`${classId}${inferredClientId ?? idx}`),
                    reg_backend_id:
                        regBackendId != null ? Number(regBackendId) : null,
                    class_id: Number(classId),
                    client_id:
                        inferredClientId != null ? Number(inferredClientId) : null,
                    client_full_name: clientName,
                };
            });

            // Filtra por clase actual y dedup
            const filtered = regs.filter((x) => x.class_id === id);
            const seen = new Set<string>();
            const unique = filtered.filter((x) => {
                const k = `${x.class_id}:${x.client_id ?? "null"}:${x.client_full_name ?? ""}`;
                if (seen.has(k)) return false;
                seen.add(k);
                return true;
            });
            setRegistrations(unique);

            // Set de asistencias
            const attendedIds = new Set<number>();
            (atd || []).forEach((a: any) => {
                const cid =
                    a.client_id ??
                    a.id_client ??
                    (a.client_full_name ? byName.get(a.client_full_name) : undefined);
                if (cid != null) attendedIds.add(Number(cid));
            });
            setAttendedSet(attendedIds);
        } catch (e: any) {
            Alert.alert("Error", e.message || "No se pudo cargar");
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, [id]);

    const capacityFull = useMemo(
        () => (cls ? registrations.length >= cls.max_capacity : true),
        [cls, registrations]
    );

    const onRegisterClient = async (client_id: number) => {
        try {
            const already = registrations.some((r) => r.client_id === client_id);
            if (already) {
                Alert.alert("Atención", "El cliente ya está registrado en esta clase.");
                return;
            }
            if (capacityFull) {
                Alert.alert("Capacidad completa", "No es posible registrar más personas.");
                return;
            }
            await createRegistration({ class_id: id, client_id });
            await fetchAll();
            setShowModal(false);
            Alert.alert("✅", "Cliente registrado en la clase");
        } catch (e: any) {
            Alert.alert("Error", e.message || "No se pudo registrar");
        }
    };

    const onMarkAttendance = async (client_id: number | null) => {
        try {
            if (!client_id) {
                Alert.alert("Falta información", "No se pudo identificar el cliente para marcar asistencia.");
                return;
            }
            if (attendedSet.has(client_id)) {
                Alert.alert("Ya marcada", "La asistencia de este cliente ya fue registrada.");
                return;
            }
            await markAttendance({ class_id: id, client_id, attendance_date: todayYMD() });
            setAttendedSet((prev) => new Set(prev).add(client_id)); // optimista
            Alert.alert("✅", "Asistencia marcada");
        } catch (e: any) {
            Alert.alert("Error", e.message || "No se pudo marcar asistencia");
        }
    };

    const onRemoveRegistration = async (reg: RegItem) => {
        try {
            Alert.alert(
                "Quitar de la clase",
                `¿Deseas quitar a "${reg.client_full_name ?? `Cliente ${reg.client_id ?? ""}`}" de esta clase?`,
                [
                    { text: "Cancelar", style: "cancel" },
                    {
                        text: "Quitar",
                        style: "destructive",
                        onPress: async () => {
                            // Si tenemos id real del pivote, lo usamos
                            if (reg.reg_backend_id != null) {
                                await apiDeleteRegistration(reg.reg_backend_id);
                            } else {
                                // Si tu backend NO acepta eliminar sin id del pivote,
                                // aquí podrías implementar otra ruta como:
                                // await deleteRegistrationByComposite(id, reg.client_id!)
                                // Por ahora, intentamos con el id (quizá funcione si tu backend mapea igual).
                                await apiDeleteRegistration(reg.id!);
                            }

                            // Optimista: quitar de la lista local
                            setRegistrations((prev) =>
                                prev.filter(
                                    (r) =>
                                        !(
                                            (r.reg_backend_id != null &&
                                                r.reg_backend_id === reg.reg_backend_id) ||
                                            (r.reg_backend_id == null && r.id === reg.id)
                                        )
                                )
                            );

                            // Si tenía asistencia, también la removemos del set local (opcional)
                            if (reg.client_id != null) {
                                setAttendedSet((prev) => {
                                    const next = new Set(prev);
                                    next.delete(reg.client_id!);
                                    return next;
                                });
                            }

                            Alert.alert("✅", "Cliente quitado de la clase");
                        },
                    },
                ]
            );
        } catch (e: any) {
            Alert.alert("Error", e.message || "No se pudo quitar el cliente");
        }
    };

    if (loading || !cls) return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;

    const fmt = (iso: string) => {
        try {
            const d = new Date(iso);
            return d.toLocaleString();
        } catch {
            return iso;
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>{cls.type}</Text>
                <TouchableOpacity
                    style={styles.cta}
                    onPress={() => navigation.navigate("ClassForm", { mode: "edit", id })}
                >
                    <Text style={styles.ctaText}>Editar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.box}>
                <Text style={styles.meta}>🕒 {fmt(cls.schedule)} — {cls.duration}</Text>
                <Text style={styles.meta}>👤 Instructor: {cls.instructor_name}</Text>
                <Text style={styles.meta}>👥 Capacidad: {registrations.length}/{cls.max_capacity}</Text>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Registrados</Text>
                    <TouchableOpacity
                        style={[styles.cta, capacityFull && { backgroundColor: "#94a3b8" }]}
                        onPress={() => setShowModal(true)}
                        disabled={capacityFull}
                    >
                        <Text style={styles.ctaText}>{capacityFull ? "Capacidad llena" : "+ Agregar"}</Text>
                    </TouchableOpacity>
                </View>

                {registrations.length === 0 ? (
                    <Text style={{ color: "#64748b" }}>Nadie registrado aún.</Text>
                ) : (
                    <FlatList
                        data={registrations}
                        keyExtractor={(item, index) =>
                            String(item.id ?? `${item.class_id}-${item.client_id ?? "null"}-${index}`)
                        }
                        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
                        renderItem={({ item }) => {
                            const clientId = item.client_id;
                            const attended = clientId != null && attendedSet.has(clientId);

                            return (
                                <View style={styles.regCard}>
                                    <Text style={styles.regName}>
                                        {item.client_full_name ??
                                            (() => {
                                                const c = clients.find((x) => x.id_client === clientId);
                                                return c ? fullNameOf(c) : `Cliente ${clientId ?? ""}`;
                                            })()}
                                    </Text>

                                    <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
                                        {attended ? (
                                            <View style={styles.badge}>
                                                <Text style={styles.badgeText}>Asistencia ✓</Text>
                                            </View>
                                        ) : (
                                            <TouchableOpacity
                                                onPress={() => onMarkAttendance(clientId)}
                                                disabled={clientId == null}
                                            >
                                                <Text style={styles.primary}>Marcar asistencia</Text>
                                            </TouchableOpacity>
                                        )}

                                        <TouchableOpacity onPress={() => onRemoveRegistration(item)}>
                                            <Text style={styles.danger}>Quitar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}
                    />
                )}
            </View>

            {/* Modal seleccionar cliente */}
            <Modal
                visible={showModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalWrap}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Selecciona un cliente</Text>
                        <FlatList
                            data={clients}
                            keyExtractor={(it, i) => String(it.id_client ?? i)}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.clientItem}
                                    onPress={() => onRegisterClient(item.id_client!)}
                                >
                                    <Text>
                                        {item.first_name} {item.last_name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            style={{ maxHeight: 300 }}
                        />
                        <TouchableOpacity
                            style={[styles.cta, { marginTop: 12 }]}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={styles.ctaText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: { fontSize: 22, fontWeight: "700", color: "#0f172a" },
    cta: {
        backgroundColor: "#2563eb",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
    },
    ctaText: { color: "#fff", fontWeight: "700" },
    box: {
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#eef2f7",
        padding: 16,
        margin: 16,
    },
    meta: { color: "#475569", marginTop: 3 },
    section: { flex: 1 },
    sectionHeader: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
    regCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#eef2f7",
        padding: 12,
        marginHorizontal: 16,
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    regName: { color: "#0f172a", fontWeight: "600" },
    primary: { color: "#1d4ed8", fontWeight: "700" },
    danger: { color: "#b91c1c", fontWeight: "700" },

    // Badge de asistencia
    badge: {
        backgroundColor: "#10b981",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
    },
    badgeText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 12,
    },

    // Modal
    modalWrap: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "center",
        padding: 24,
    },
    modal: { backgroundColor: "#fff", borderRadius: 12, padding: 16 },
    modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
    clientItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },
});
