
import { useEffect, useState, useCallback } from "react";
import { getMembershipOptions, MembershipOption } from "../api/membershipApi";

export function useMemberships() {
    const [options, setOptions] = useState<MembershipOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOptions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const opts = await getMembershipOptions();
            setOptions(opts);
        } catch (e: any) {
            setError(e?.message ?? "Error cargando membresías");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOptions();
    }, [fetchOptions]);

    return {
        options,           // [{ id, label }]
        loading,           // boolean
        error,             // string | null
        refetch: fetchOptions,
    };
}
