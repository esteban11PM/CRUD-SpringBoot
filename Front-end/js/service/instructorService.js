import { API_BASE } from '../config.js';
const URL = `${API_BASE}/Instructor`;

export const instructorService = {
    getAll: async () => {
        const res = await fetch(`${URL}/`);
        if (!res.ok) throw new Error('Error cargando instructores');
        return res.json();
    },
    getById: async id => {
        const res = await fetch(`${URL}/${id}`);
        console.log(res);
        if (!res.ok) throw new Error('Instructor no encontrado');
        return res.json();
    },
    create: async dto => {
        const res = await fetch(`${URL}/`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto)
        });
        if (!res.ok) throw new Error('Error creando instructor');
        return res.text();
    },
    update: async dto => {
        const res = await fetch(`${URL}/`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto)
        });
        if (!res.ok) throw new Error('Error actualizando instructor');
        return res.text();
    },
    delete: async id => {
        const res = await fetch(`${URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error eliminando instructor');
        return res.text();
    }
};
