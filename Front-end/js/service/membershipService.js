import { API_BASE } from '../config.js';
const URL = `${API_BASE}/Member`;

export const membershipService = {
    getAll: async () => {
        const res = await fetch(`${URL}/`);
        if (!res.ok) throw new Error('Error cargando membresías');
        console.log(res);
        return res.json();
    }
};
