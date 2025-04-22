package com.sena.crud_basic.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity(name = "instructor")
public class Instructor {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremental
    @Column(name = "id_instructor")
    private int id_instructor;
    
    @Column(name = "name", length = 100, nullable = false)
    private String name;
    
    @Column(name = "specialties", length = 100)
    private String specialties;

    //relacion de uno a muchos con class
    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL)
    private List<Class> classs = new ArrayList<>();

    // Constructores
        //constructor vasío
    public Instructor() {
    }
        // constructor con parametros
    public Instructor(int id_instructor, String name, String specialties) {
        this.id_instructor = id_instructor;
        this.name = name;
        this.specialties = specialties;
    }

    public int getId_instructor() {
        return id_instructor;
    }

    public void setId_instructor(int id_instructor) {
        this.id_instructor = id_instructor;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialties() {
        return specialties;
    }

    public void setSpecialties(String specialties) {
        this.specialties = specialties;
    }

    //Solo get para las relaciones de colección
    public List<Class> getClasss() {
        return Collections.unmodifiableList(classs);
    }
}