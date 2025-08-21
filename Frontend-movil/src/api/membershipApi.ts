import { MEMBERSHIP_BASE_URL } from "./endpoints/endPoints";
import { IMembership } from "./Types/IMembership";

export type MembershipOption = { id: number; label: string };

export async function getMembershipOptions(): Promise<MembershipOption[]> {
    const res = await fetch(MEMBERSHIP_BASE_URL, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const arr: any[] = Array.isArray(data)
        ? data
        : Array.isArray(data?.content)
            ? data.content
            : Array.isArray(data?.data)
                ? data.data
                : [];

    // Normalizar nombres más comunes
    const options = arr
        .map((m: any) => {
            const id = m.id_membership ?? m.id ?? null;
            const label = m.name ?? null;
            if (id == null || !label) return null;
            return { id: Number(id), label: String(label) } as MembershipOption;
        })
        .filter(Boolean) as MembershipOption[];

    // De-duplicar por id
    const seen = new Set<number>();
    return options.filter(o => (seen.has(o.id) ? false : (seen.add(o.id), true)));
}