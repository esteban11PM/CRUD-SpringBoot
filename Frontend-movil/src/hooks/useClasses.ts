import { useCallback, useEffect, useState } from "react";
import { getClasses, createClass, updateClass, deleteClass, IClass } from "../api/classApi";

export function useClasses() {
    const [classes, setClasses] = useState<IClass[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getClasses();
            setClasses(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { refetch(); }, [refetch]);

    const addClass = async (dto: IClass) => {
        const created = await createClass(dto);
        setClasses(prev => [created, ...prev]);
    };

    const updateClassById = async (id: number, dto: IClass) => {
        const updated = await updateClass(id, dto);
        setClasses(prev => prev.map(c => (c.id_class === id ? updated : c)));
    };

    const removeClass = async (id: number) => {
        await deleteClass(id);
        setClasses(prev => prev.filter(c => c.id_class !== id));
    };

    return { classes, loading, error, refetch, addClass, updateClassById, removeClass };
}
