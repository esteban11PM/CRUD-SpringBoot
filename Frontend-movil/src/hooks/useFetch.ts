// hooks/useClients.ts
import { useCallback, useEffect, useState } from "react";
import { getClients } from "../api/clientApi";
import type { IClient } from "../api/Types/IClient";

export function useClients() {
    const [data, setData] = useState<IClient[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getClients();
            setData(res);
        } catch (e: any) {
            setError(e?.message ?? "Error inesperado");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
