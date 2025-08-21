// src/api/instructorApi.ts
import { INSTRUCTOR_BASE_URL } from "./endpoints/endPoints";

export interface IInstructor {
    id_instructor?: number;
    name: string;
    specialties: string;      
    specialities?: string;
}

export interface InstructorOption { id: number; label: string }

// Helper común
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
    const hasJson = ct.includes("application/json");
    const payload = hasJson ? await res.json().catch(() => undefined) : undefined;

    if (!res.ok) {
        const msg = (payload && (payload.message || payload.error || JSON.stringify(payload))) || `HTTP ${res.status}`;
        throw new Error(msg);
    }
    return (payload ?? ({} as T)) as T;
};

// Opciones para Select (ya lo tenías)
export const getInstructorOptions = async (): Promise<InstructorOption[]> => {
    const data = await fetchJson<any>(INSTRUCTOR_BASE_URL);
    const list = Array.isArray(data) ? data : data?.content ?? data?.data ?? [];
    return list
        .map((x: any) => ({
            id: x.id_instructor ?? x.id ?? x.Id,
            label: x.name ?? `${x.first_name ?? ""} ${x.last_name ?? ""}`.trim(),
        }))
        .filter((o: any) => o.id && o.label);
};

// CRUD principal
export const getInstructors = async (): Promise<IInstructor[]> => {
    const data = await fetchJson<any>(INSTRUCTOR_BASE_URL);
    const list = Array.isArray(data) ? data : data?.content ?? data?.data ?? [];
    return list.map((x: any) => ({
        id_instructor: x.id_instructor ?? x.id ?? x.Id,
        name: x.name,
        specialties: x.specialties ?? x.specialities ?? "", // tolera duplicado
    }));
};

export const getInstructorById = async (id: number): Promise<IInstructor> => {
    const x = await fetchJson<any>(`${INSTRUCTOR_BASE_URL}${id}`);
    return {
        id_instructor: x.id_instructor ?? x.id ?? x.Id,
        name: x.name,
        specialties: x.specialties ?? x.specialities ?? "",
    };
};

export const createInstructor = async (dto: IInstructor): Promise<IInstructor> => {
    const body = JSON.stringify({ name: dto.name, specialties: dto.specialties });
    return fetchJson<IInstructor>(INSTRUCTOR_BASE_URL, { method: "POST", body });
};

export const updateInstructor = async (id: number, dto: IInstructor): Promise<IInstructor> => {
    const payload = { id_instructor: id, name: dto.name, specialties: dto.specialties };
    return fetchJson<IInstructor>(`${INSTRUCTOR_BASE_URL}${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
};

export const deleteInstructor = async (id: number): Promise<void> => {
    await fetchJson<void>(`${INSTRUCTOR_BASE_URL}${id}`, { method: "DELETE" });
};
