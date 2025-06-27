import { API_BASE } from '../config.js';

const URL = `${API_BASE}/Equipment`;

export const equipmentService = {
    getAll: async () => {
        const res = await fetch(`${URL}/`);
        if (!res.ok) throw new Error('Error al cargar equipos');
        return res.json();
    },
    getById: async id => {
        const res = await fetch(`${URL}/${id}`);
        if (!res.ok) throw new Error('Equipo no encontrado');
        return res.json();
    },
    create: async dto => {
        const res = await fetch(`${URL}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto)
        });
        if (!res.ok) throw new Error('Error al crear equipo');
        return res.text();
    },
    update: async dto => {
        const res = await fetch(`${URL}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto)
        });
        if (!res.ok) throw new Error('Error al actualizar equipo');
        return res.text();      // <-- lo recibimos como texto
    },
    delete: async id => {
        const res = await fetch(`${URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al eliminar equipo');
        return res.text();
    }
};
