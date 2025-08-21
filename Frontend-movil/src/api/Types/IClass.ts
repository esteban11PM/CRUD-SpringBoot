export interface IClass {
    id_class?: number;
    type: string;
    schedule: string;      // ISO con timezone
    duration: string;      // "HH:mm:ss"
    max_capacity: number;
    instructor_id?: number;   // para POST/PUT
    instructor_name?: string; // viene en GET
}