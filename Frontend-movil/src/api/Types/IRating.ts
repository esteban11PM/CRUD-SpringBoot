export interface IRatingDTO {
    id_rating?: number;
    client_id: number;
    class_id: number;
    rating: number;
    comment: string;
    rating_date: string;
}

export interface IRatingView {
    id_rating: number;
    client_full_name?: string;
    class_type?: string;
    rating: number;
    comment: string;
    rating_date: string;
}