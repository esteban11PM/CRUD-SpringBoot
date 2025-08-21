// src/hooks/useInstructors.ts
import { useCallback, useEffect, useState } from "react";
import { getInstructors, createInstructor, updateInstructor, deleteInstructor, IInstructor } from "../api/instructorApi";

export function useInstructors() {
    const [instructors, setInstructors] = useState<IInstructor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getInstructors();
            setInstructors(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { refetch(); }, [refetch]);

    const addInstructor = async (dto: IInstructor) => {
        const created = await createInstructor(dto);
        setInstructors(prev => [created, ...prev]);
    };

    const updateInstructorById = async (id: number, dto: IInstructor) => {
        const updated = await updateInstructor(id, dto);
        setInstructors(prev => prev.map(i => (i.id_instructor === id ? updated : i)));
    };

    const removeInstructor = async (id: number) => {
        await deleteInstructor(id);
        setInstructors(prev => prev.filter(i => i.id_instructor !== id));
    };

    return { instructors, loading, error, refetch, addInstructor, updateInstructorById, removeInstructor };
}
