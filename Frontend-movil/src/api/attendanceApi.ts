import { ATTENDANCE_BASE_URL } from "./endpoints/endPoints";
import { IAttendance } from "./Types/IAttendance";

const json = async <T>(url: string, init?: RequestInit) => {
    const res = await fetch(url, { ...init, headers: { "Content-Type": "application/json", Accept: "application/json" } });
    const ct = res.headers.get("content-type") || "";
    const hasJson = ct.includes("application/json");
    const body = hasJson ? await res.json().catch(() => undefined) : undefined;
    if (!res.ok) throw new Error(body?.message || body?.error || `HTTP ${res.status}`);
    return (body ?? ({} as T)) as T;
};

export const getAttendanceByClass = async (classId: number) =>
    json<any[]>(`${ATTENDANCE_BASE_URL}?class_id=${classId}`);

export const markAttendance = async (payload: IAttendance) =>
    json<IAttendance>(ATTENDANCE_BASE_URL, { method: "POST", body: JSON.stringify(payload) });