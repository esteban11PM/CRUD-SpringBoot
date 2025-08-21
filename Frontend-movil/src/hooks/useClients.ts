// src/hooks/useClients.ts
import { useCallback, useEffect, useState } from 'react';
import { getClients, createClient, updateClient, deleteClient } from '../api/clientApi';
import type { IClient } from '../api/Types/IClient';

export function useClients() {
    const [clients, setClients] = useState<IClient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const fetchClients = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getClients();
            setClients(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    const addClient = async (client: IClient) => {
        const newClient = await createClient(client);
        setClients((prev) => [...prev, newClient]);
    };

    const updateClientById = async (id: number, dto: IClient) => {
        const updated = await updateClient(id, dto);
        setClients(prev => prev.map(c => (c.id_client === id ? updated : c)));
    };

    const removeClient = async (id: number) => {
        await deleteClient(id);
        setClients((prev) => prev.filter((c) => c.id_client !== id));
    };

    return {
        clients,
        loading,
        error,
        refetch: fetchClients,
        addClient,
        updateClientById,
        removeClient,
    };
}
