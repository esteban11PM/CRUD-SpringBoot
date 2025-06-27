import { API_BASE } from '../config.js';

const URL = `${API_BASE}/Ratings`;

export const ratingsService = {
    getAll: async () => {
        const res = await fetch(`${URL}/`);
        if (!res.ok) throw new Error('Error al obtener reseñas');
        return res.json();
    },
    getById: async (id) => {
        const res = await fetch(`${URL}/${id}`);
        if (!res.ok) throw new Error('Error al obtener reseña');
        return res.json();
    },
    create: async (dto) => {
        const res = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto)
        });
        if (!res.ok) throw new Error('Error al crear reseña');
        return res.json();
    },
    update: async (dto) => {
        const res = await fetch(`${URL}/${dto.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto)
        });
        if (!res.ok) throw new Error('Error al actualizar reseña');
        return res.json();
    },
    delete: async (id) => {
        const res = await fetch(`${URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al eliminar reseña');
    }
};
