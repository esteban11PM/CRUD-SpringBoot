package com.sena.crud_basic.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "ratings")
public class Ratings {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremental
    @Column(name = "id_ratigs")
    private int id_ratigs;
    

    @Column(name = "rating", length = 30, nullable = false)
    private int rating;
    
    @Column(name = "comment", length = 100)
    private String comment;
    
    @Column(name = "rating_date", length = 100, nullable = false)
    private LocalDate rating_date;

    //FOREIGN KEY
    @ManyToOne //llave foranea con relacion de muchos a uno a client
    @JoinColumn(name = "client_id", referencedColumnName = "id_client")
    private Client client_id;
    
    @ManyToOne //Llave foranea con relación de muchos a muchos a class
    @JoinColumn(name = "class_id", referencedColumnName = "id_class")
    private Class class_id;

    public Ratings(){} //constructor por defecto

    public Ratings(int id_ratigs, Client client_id, Class class_id, int rating, String comment, LocalDate rating_date) {
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

    public Client getClient_id() {
        return client_id;
    }

    public void setClient_id(Client client_id) {
        this.client_id = client_id;
    }

    public Class getClass_id() {
        return class_id;
    }

    public void setClass_id(Class class_id) {
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