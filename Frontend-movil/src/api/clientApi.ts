// clientApi.ts
import { CLIENT_BASE_URL } from "./endpoints/endPoints";
import { IClient } from "./Types/IClient";

// clientApi.ts
const toYMD = (d: Date | string): string => {
    if (!d) return "";
    if (typeof d === "string") return d.split("T")[0];
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
};

const normalizeClientPayload = (c: IClient) => ({
    ...c,
    membership_start_date: toYMD(c.membership_start_date as any),
    membership_end_date: toYMD(c.membership_end_date as any),
    membership_id: c.membership_id != null ? Number(c.membership_id) : undefined,
});

export const updateClient = async (id: number, client: IClient): Promise<IClient> => {
    const body = {
        ...normalizeClientPayload(client),
        id_client: id, // 👈 requerido por tu backend
    };

    // LOG útil temporalmente
    console.log("[PUT] /Api/v1/Client/", id, body);

    return fetchJson<IClient>(`${CLIENT_BASE_URL}${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
    });
};

// Helper centralizado...
const fetchJson = async <T>(
    input: string,
    init?: RequestInit & { timeoutMs?: number }
): Promise<T> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), init?.timeoutMs ?? 15000);

    try {
        const res = await fetch(input, {
            ...init,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...(init?.headers || {}),
            },
            signal: controller.signal,
        });

        const contentType = res.headers.get("content-type") || "";
        const hasJson = contentType.includes("application/json");
        let payload: any = undefined;

        if (hasJson) {
            // puede haber body JSON
            payload = await res.json().catch(() => undefined);
        } else {
            // si es 204 o 200 sin JSON, lo tratamos como éxito sin payload
            payload = undefined;
        }

        if (!res.ok) {
            const message =
                (payload && (payload.message || payload.error || JSON.stringify(payload))) ||
                `HTTP ${res.status}`;
            throw new Error(message);
        }

        // Si no hay payload (204), devolvemos {} como T para no romper tipado aguas arriba
        return (payload === undefined ? ({} as T) : (payload as T));
    } catch (err: any) {
        if (err?.name === "AbortError") {
            throw new Error("La solicitud fue cancelada por timeout o navegación.");
        }
        throw err;
    } finally {
        clearTimeout(timeout);
    }
};

// Endpoints para Client
export const getClients = async (): Promise<IClient[]> => {
    return fetchJson<IClient[]>(CLIENT_BASE_URL);
};

export const getClientById = async (id: number): Promise<IClient> => {
    return fetchJson<IClient>(`${CLIENT_BASE_URL}${id}`);
};

export const createClient = async (client: IClient): Promise<IClient> => {
    const body = normalizeClientPayload(client);
    return fetchJson<IClient>(CLIENT_BASE_URL, {
        method: "POST",
        body: JSON.stringify(body),
    });
};

export const deleteClient = async (id: number): Promise<void> => {
    await fetchJson<void>(`${CLIENT_BASE_URL}${id}`, { method: "DELETE" });
};
