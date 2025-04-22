import { API_BASE } from '../config.js';
const URL = `${API_BASE}/Class_registration`;

export const registrationService = {
    getAll: async () => {
        const res = await fetch(`${URL}/`);
        if (!res.ok) throw new Error('Error cargando registros');
        return res.json();
    },
    getById: async id => {
        const res = await fetch(`${URL}/${id}`);
        if (!res.ok) throw new Error('registro de clase no encontrado');
        return res.json();
    },
    create: async dto => {
        const res = await fetch(`${URL}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto)
        });
        if (!res.ok) throw new Error('Error creando registro');
        return res.text();
    },
    update: async dto => {
        const res = await fetch(`${URL}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto)
        });
        if (!res.ok) throw new Error('Error actualizando registro');
        return res.text();
    },
    delete: async id => {
        const res = await fetch(`${URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error eliminando registro');
        return res.text();
    }
};
