package com.sena.crud_basic.DTO;

import java.time.LocalDate;

public class responseRatingDTO {
    public int id_ratigs;
    public String client_full_name;
    public String class_type;
    public int rating;
    public String comment;
    public LocalDate rating_date;

    public responseRatingDTO(){}

    public responseRatingDTO(int id_ratigs, String client_full_name, String class_type, int rating, String comment,
            LocalDate rating_date) {
        this.id_ratigs = id_ratigs;
        this.client_full_name = client_full_name;
        this.class_type = class_type;
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

    public String getClient_full_name() {
        return client_full_name;
    }

    public void setClient_full_name(String client_full_name) {
        this.client_full_name = client_full_name;
    }

    public String getClass_type() {
        return class_type;
    }

    public void setClass_type(String class_type) {
        this.class_type = class_type;
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
