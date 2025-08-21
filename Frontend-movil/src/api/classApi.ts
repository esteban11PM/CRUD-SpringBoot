import { CLASS_BASE_URL } from "./endpoints/endPoints";
import { IClass } from "./Types/IClass";

const json = async <T>(url: string, init?: RequestInit) => {
    const res = await fetch(url, { ...init, headers: { "Content-Type": "application/json", Accept: "application/json" } });
    const ct = res.headers.get("content-type") || "";
    const hasJson = ct.includes("application/json");
    const body = hasJson ? await res.json().catch(() => undefined) : undefined;
    if (!res.ok) throw new Error(body?.message || body?.error || `HTTP ${res.status}`);
    return (body ?? ({} as T)) as T;
};

export const getClasses = async (): Promise<IClass[]> => json<IClass[]>(CLASS_BASE_URL);

export const getClassById = async (id: number): Promise<IClass> => json<IClass>(`${CLASS_BASE_URL}${id}`);

export const createClass = async (dto: IClass) =>
    json<IClass>(CLASS_BASE_URL, { method: "POST", body: JSON.stringify(dto) });

export const updateClass = async (id: number, dto: IClass) =>
    json<IClass>(`${CLASS_BASE_URL}${id}`, { method: "PUT", body: JSON.stringify({ ...dto, id_class: id }) });

export const deleteClass = async (id: number) => json<void>(`${CLASS_BASE_URL}${id}`, { method: "DELETE" });

export { IClass };
