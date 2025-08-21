import { RATING_BASE_URL } from "./endpoints/endPoints";
import { IRatingDTO, IRatingView } from "./Types/IRating";

type Raw = any;

const fetchJson = async <T>(input: string, init?: RequestInit): Promise<T> => {
    const res = await fetch(input, {
        ...init,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(init?.headers || {}),
        },
    });
    const ct = res.headers.get("content-type") || "";
    const isJson = ct.includes("application/json");
    const payload = isJson ? await res.json().catch(() => undefined) : undefined;

    if (!res.ok) {
        const msg = (payload && (payload.message || payload.error || JSON.stringify(payload))) || `HTTP ${res.status}`;
        throw new Error(msg);
    }
    return (payload ?? ({} as T)) as T;
};

const normalize = (x: Raw): IRatingView => ({
    id_rating: x.id_rating ?? x.id_ratings ?? x.id_ratigs ?? x.id ?? x.Id,
    client_full_name: x.client_full_name,
    class_type: x.class_type,
    rating: Number(x.rating),
    comment: x.comment ?? "",
    rating_date: (x.rating_date ?? "").split("T")[0] || "",
});

// GET all
export const getRatings = async (): Promise<IRatingView[]> => {
    const data = await fetchJson<any>(RATING_BASE_URL);
    const list = Array.isArray(data) ? data : data?.content ?? data?.data ?? [];
    return list.map(normalize).filter((r: IRatingView) => r.id_rating != null);
};

// POST (crear)
export const createRating = async (dto: IRatingDTO) => {
    return fetchJson<IRatingView>(RATING_BASE_URL, {
        method: "POST",
        body: JSON.stringify(dto),
    });
};

// DELETE
export const deleteRating = async (id: number) => {
    await fetchJson<void>(`${RATING_BASE_URL}${id}`, { method: "DELETE" });
};

export { IRatingDTO, IRatingView };
