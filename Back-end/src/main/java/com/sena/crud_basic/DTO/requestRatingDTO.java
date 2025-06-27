package com.sena.crud_basic.DTO;

import java.time.LocalDate;

public class requestRatingDTO {
    public int id_ratigs;
    public int client_id;
    public int class_id;
    public int rating;
    public String comment;
    public LocalDate rating_date;

    public requestRatingDTO(){}

    public requestRatingDTO(int id_ratigs, int client_id, int class_id, int rating, String comment,
            LocalDate rating_date) {
        this.id_ratigs = id_ratigs;
        this.client_id = client_id;
        this.class_id = class_id;
        this.rating = rating;
        this.comment = comment;
        this.rating_date = rating_date;
    }

    public int getId_ratigs() {
        return id_ratigs;
    }

    public void setId_ratigs(int id_ratigs) {
        this.id_ratigs = id_ratigs;
    }

    public int getClient_id() {
        return client_id;
    }

    public void setClient_id(int client_id) {
        this.client_id = client_id;
    }

    public int getClass_id() {
        return class_id;
    }

    public void setClass_id(int class_id) {
        this.class_id = class_id;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDate getRating_date() {
        return rating_date;
    }

    public void setRating_date(LocalDate rating_date) {
        this.rating_date = rating_date;
    }

    
}
