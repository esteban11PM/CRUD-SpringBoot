//Interfaces para las peticiones

export interface IClient {
    id_client?: number;
    first_name: string;
    last_name: string;
    phone: string;
    membership_start_date: Date;
    membership_end_date: Date;
    membership_id?: number;
    membership_type?: string;
}