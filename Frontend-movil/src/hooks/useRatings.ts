import { useCallback, useEffect, useState } from "react";
import { getRatings, createRating, deleteRating, IRatingDTO, IRatingView } from "../api/ratingApi";

export function useRatings() {
    const [ratings, setRatings] = useState<IRatingView[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getRatings();
            setRatings(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { refetch(); }, [refetch]);

    const addRating = async (dto: IRatingDTO) => {
        const created = await createRating(dto);
        setRatings(prev => [created, ...prev]);
    };

    const removeRating = async (id: number) => {
        await deleteRating(id);
        setRatings(prev => prev.filter(r => r.id_rating !== id));
    };

    return { ratings, loading, error, refetch, addRating, removeRating };
}