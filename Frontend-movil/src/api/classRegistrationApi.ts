import { CLASS_REGISTRATION_BASE_URL } from "./endpoints/endPoints";
import { IClassRegistration } from "./Types/IClassRegistration";
/** Helper fetch JSON (tolerante a 204/200 sin body) */
const json = async <T>(url: string, init?: RequestInit) => {
    const res = await fetch(url, {
        ...init,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(init?.headers || {}),
        },
    });

    const ct = res.headers.get("content-type") || "";
    const hasJson = ct.includes("application/json");
    const body = hasJson ? await res.json().catch(() => undefined) : undefined;

    if (!res.ok) {
        const msg =
            (body && (body.message || body.error || JSON.stringify(body))) ||
            `HTTP ${res.status}`;
        throw new Error(msg);
    }

    return (body ?? ({} as T)) as T;
};

/** Normaliza un registro cualquiera del backend a IClassRegistration (parcial) */
const normalize = (
    r: any,
    fallbackClassId: number,
    idx: number
): IClassRegistration | null => {
    // ids que podrían o no venir
    const rawId =
        r?.id_classRegistration ??
        r?.id ??
        r?.registration_id ??
        null;

    const class_id =
        r?.class_id ??
        r?.id_class ??
        r?.class?.id_class ??
        fallbackClassId;

    const client_id =
        r?.client_id ??
        r?.id_client ??
        r?.client?.id_client ??
        null;

    const client_full_name =
        r?.client_full_name ??
        r?.clientName ??
        (r?.client
            ? `${r.client.first_name ?? ""} ${r.client.last_name ?? ""}`.trim()
            : undefined);

    const class_type = r?.class_type ?? r?.class?.type ?? undefined;

    const id: number =
        rawId != null
            ? Number(rawId)
            : Number(`${class_id}${client_id ?? idx}`);

    if (Number.isNaN(id)) return null;

    return {
        id,
        class_id: Number(class_id),
        client_id: client_id != null ? Number(client_id) : null,
        client_full_name,
        class_type,
    };
};

const dedupe = (items: IClassRegistration[]) => {
    const seen = new Set<string>();
    return items.filter((r) => {
        const key = `${r.class_id}:${r.client_id ?? "null"}:${r.client_full_name ?? ""}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
};

export const getRegistrationsByClass = async (
    classId: number
): Promise<IClassRegistration[]> => {
    // 1) /class/{id}
    try {
        const data = await json<any[]>(`${CLASS_REGISTRATION_BASE_URL}class/${classId}`);
        const arr: any[] =
            Array.isArray(data)
                ? data
                : Array.isArray((data as any)?.content)
                    ? (data as any).content
                    : Array.isArray((data as any)?.data)
                        ? (data as any).data
                        : [];
        const normed = arr
            .map((r, i) => normalize(r, classId, i))
            .filter(Boolean) as IClassRegistration[];
        return dedupe(normed.filter((r) => r.class_id === classId));
    } catch {
    }

    try {
        const data = await json<any[]>(`${CLASS_REGISTRATION_BASE_URL}?class_id=${classId}`);
        const arr: any[] =
            Array.isArray(data)
                ? data
                : Array.isArray((data as any)?.content)
                    ? (data as any).content
                    : Array.isArray((data as any)?.data)
                        ? (data as any).data
                        : [];
        const normed = arr
            .map((r, i) => normalize(r, classId, i))
            .filter(Boolean) as IClassRegistration[];
        return dedupe(normed.filter((r) => r.class_id === classId));
    } catch {
        // sigue con el fallback
    }

    // 3) Fallback: GET general y filtramos por classId
    const all = await json<any[]>(CLASS_REGISTRATION_BASE_URL);
    const arr: any[] =
        Array.isArray(all)
            ? all
            : Array.isArray((all as any)?.content)
                ? (all as any).content
                : Array.isArray((all as any)?.data)
                    ? (all as any).data
                    : [];

    const normed = arr
        .map((r, i) => normalize(r, classId, i))
        .filter(Boolean) as IClassRegistration[];

    return dedupe(normed.filter((r) => r.class_id === classId));
};

/** Crea una inscripción (pivote) */
export const createRegistration = async (payload: {
    class_id: number;
    client_id: number;
}) =>
    json<IClassRegistration>(CLASS_REGISTRATION_BASE_URL, {
        method: "POST",
        body: JSON.stringify(payload),
    });

/** Elimina una inscripción por id (si tu backend lo soporta) */
export const deleteRegistration = async (id: number) =>
    json<void>(`${CLASS_REGISTRATION_BASE_URL}${id}`, { method: "DELETE" });