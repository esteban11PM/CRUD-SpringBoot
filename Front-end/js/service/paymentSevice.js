import { API_BASE } from '../config.js';
const URL = `${API_BASE}/Payment`;

export const paymentService = {
    getAll: async () => {
        const res = await fetch(`${URL}/`);
        if (!res.ok) throw new Error('Error cargando medios de pago');
        return res.json();
    },
    getById: async id => {
        const res = await fetch(`${URL}/${id}`);
        console.log(res);
        if (!res.ok) throw new Error('pagos no encontrado');
        return res.json();
    },
    create: async dto => {
        const res = await fetch(`${URL}/`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto)
        });
        if (!res.ok) throw new Error('Error creando medio de pago');
        return res.text();
    },
    update: async dto => {
        const res = await fetch(`${URL}/`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto)
        });
        if (!res.ok) throw new Error('Error actualizando medio de pago');
        return res.text();
    },
    delete: async id => {
        const res = await fetch(`${URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error eliminando medio de pago');
        return res.text();
    }
};
