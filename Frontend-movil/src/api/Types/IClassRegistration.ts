export interface IClassRegistration {
    id: number;                  // clave estable para listas
    class_id: number;            // puede venir del backend; si no, asumimos el solicitado
    client_id: number | null;    // puede no venir; el front lo enriquece por nombre cuando sea posible
    client_full_name?: string;   // nombre legible del cliente
    class_type?: string;
}