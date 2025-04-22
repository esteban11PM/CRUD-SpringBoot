import { API_BASE } from '../config.js';
const URL = `${API_BASE}/Client`;

export const clientService = {
    getAll: async () => {
        const res = await fetch(`${URL}/`);
        if (!res.ok) throw new Error('Error cargando clientes');
        return res.json();
    },
    getByName: async name => {
        // Suponiendo que tu API no tenga filtro por nombre,
        // lo filtramos en el frontend:
        const all = await clientService.getAll();
        return all.filter(c =>
            (c.first_name + ' ' + c.last_name).toLowerCase()
                .includes(name.toLowerCase())
        );
    },
    getById: async id => {
        const res = await fetch(`${URL}/${id}`);
        if (!res.ok) throw new Error('Cliente no encontrado');
        return res.json();
    },
    create: async dto => {
        const res = await fetch(`${URL}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto)
        });
        if (!res.ok) throw new Error('Error creando cliente');
        return res.json();
    },
    update: async dto => {
        const res = await fetch(`${URL}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto)
        });
        if (!res.ok) throw new Error('Error actualizando cliente');
        return res.text();
    },
    delete: async id => {
        const res = await fetch(`${URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error eliminando cliente');
        return res.text();
    }
};
