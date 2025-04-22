import { API_BASE } from '../config.js';
const URL = `${API_BASE}/Class`;

export const classService = {
    getAll: async () => {
        const res = await fetch(`${URL}/`);
        if (!res.ok) throw new Error('Error al obtener clases');
        return res.json();
    },
    getById: async id => {
        const res = await fetch(`${URL}/${id}`);
        if (!res.ok) throw new Error('Clase no encontrada');
        return res.json();
    },
    create: async dto => {
        const res = await fetch(`${URL}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto)
        });
        if (!res.ok) throw new Error('Error creando clase');
        return res.text();
    },
    update: async dto => {
        const res = await fetch(`${URL}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto)
        });
        if (!res.ok) throw new Error('Error actualizando clase');
        return res.text();
    },
    delete: async id => {
        const res = await fetch(`${URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error eliminando clase');
        return res.text();
    }
};
