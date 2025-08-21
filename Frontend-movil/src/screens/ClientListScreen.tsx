// src/screens/ClientListScreen.tsx
import React, { useCallback, useMemo, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { useClients } from '../hooks/useClients';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    ClientUpdate: { id: number | undefined };
    ClientRegister: undefined;
};

const VISIBLE_LIMIT = 8;

export default function ClientListScreen() {
    const { clients, loading, error, refetch, removeClient } = useClients();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [showAll, setShowAll] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await refetch();
        } finally {
            setRefreshing(false);
        }
    }, [refetch]);

    const confirmDelete = (id: number) => {
        Alert.alert('Eliminar cliente', '¿Estás seguro que deseas eliminar este cliente?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: async () => {
                    await removeClient(id);
                    refetch();
                },
            },
        ]);
    };

    const visibleClients = useMemo(
        () => (showAll ? clients : clients.slice(0, VISIBLE_LIMIT)),
        [clients, showAll]
    );

    const remaining = Math.max(0, clients.length - VISIBLE_LIMIT);

    const formatDate = (d: any) => {
        if (!d) return '-';
        if (d instanceof Date) return d.toLocaleDateString();
        // Si llega ISO string
        try {
            const parsed = new Date(d);
            return isNaN(parsed.getTime()) ? String(d) : parsed.toLocaleDateString();
        } catch {
            return String(d);
        }
    };

    if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    if (error) return <Text style={{ color: 'red', marginTop: 20, textAlign: 'center' }}>Error: {error}</Text>;

    if (!clients || clients.length === 0) {
        return (
            <View style={[styles.list, { alignItems: 'center', justifyContent: 'center', flex: 1 }]}>
                <Text style={styles.emptyTitle}>No hay clientes aún</Text>
                <Text style={styles.emptyText}>Registra tu primer cliente para comenzar.</Text>
                <TouchableOpacity
                    style={[styles.ctaButton, { marginTop: 16 }]}
                    onPress={() => navigation.navigate('ClientRegister')}
                >
                    <Text style={styles.ctaText}>+ Registrar nuevo cliente</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {/* Encabezado con contador y acción rápida */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Clientes</Text>
                <View style={styles.headerRight}>
                    <Text style={styles.badge}>{clients.length}</Text>
                    <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('ClientRegister')}>
                        <Text style={styles.ctaText}>+ Registrar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={visibleClients}
                keyExtractor={(item, index) => (item.id_client ? item.id_client.toString() : `temp-${index}`)}
                contentContainerStyle={styles.list}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.name}>
                                {item.first_name} {item.last_name}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.detail}>📞 {item.phone || '-'}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.detail}>📅 Inicio: {formatDate(item.membership_start_date)}</Text>
                            <Text style={[styles.detail, { marginLeft: 12 }]}>
                                ⏳ Fin: {formatDate(item.membership_end_date)}
                            </Text>
                        </View>

                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => navigation.navigate('ClientUpdate', { id: item.id_client })}>
                                <Text style={styles.editStrong}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => confirmDelete(item.id_client!)}>
                                <Text style={styles.delete}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListFooterComponent={
                    <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
                        {clients.length > VISIBLE_LIMIT && (
                            <TouchableOpacity
                                style={[styles.toggleButton, { marginBottom: 12 }]}
                                onPress={() => setShowAll((s) => !s)}
                            >
                                <Text style={styles.toggleText}>
                                    {showAll ? 'Ver menos' : `Ver más (${remaining})`}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    badge: {
        backgroundColor: '#e5e7eb',
        color: '#111827',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginRight: 8,
        minWidth: 28,
        textAlign: 'center',
        overflow: 'hidden',
        fontWeight: '700',
    },

    list: { padding: 16 },
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: '#eef2f7',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    detail: {
        fontSize: 14.5,
        color: '#475569',
    },
    actions: {
        flexDirection: 'row',
        marginTop: 12,
        gap: 24,
    },
    edit: {
        color: '#2563eb',
        fontWeight: '600',
    },
    editStrong: {
        color: '#1d4ed8',
        fontWeight: '700',
    },
    delete: {
        color: '#b91c1c',
        fontWeight: '700',
    },
    footer: {
        textAlign: 'center',
        marginTop: 20,
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // CTAs
    ctaButton: {
        backgroundColor: '#2563eb',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
    },
    ctaText: {
        color: '#fff',
        fontWeight: '700',
    },
    secondaryCta: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    secondaryCtaText: {
        color: '#059669',
        fontWeight: '700',
        fontSize: 16,
    },

    // Empty state
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    emptyText: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
    },

    // Ver más/menos
    toggleButton: {
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        paddingVertical: 10,
        borderRadius: 10,
    },
    toggleText: {
        color: '#0f172a',
        fontWeight: '700',
    },
});
