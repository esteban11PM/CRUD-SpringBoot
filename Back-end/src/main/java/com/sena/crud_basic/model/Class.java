package com.sena.crud_basic.model;

import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity(name = "class")
public class Class {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremental
    @Column(name = "id_class")
    private int id_class;
    
    @Column(name = "type", length = 100, nullable = false)
    private String type;
    
    @Column(name = "schedule", length = 100, nullable = false)
    private OffsetDateTime schedule;
    
    @Column(name = "duration", length = 100, nullable = false)
    private LocalTime duration;
    
    @Column(name = "max_capacity", length = 30)
    private int max_capacity;
    
    //FOREING KEY
    @ManyToOne //Llave foranea con relación de muchos a uno con Instructor
    @JoinColumn(name = "instructor_id", referencedColumnName = "id_instructor")
    private Instructor instructor;


    //RELACIONES 
        //relacion de uno a muchos con Attendances
    @OneToMany(mappedBy = "class_id", cascade = CascadeType.ALL)
    private List<Attendance> attendances = new ArrayList<>();

        //relacion de uno a muchos con equipment_usage
    @OneToMany(mappedBy = "class_id", cascade = CascadeType.ALL)
    private List<Equipment_usage> equipments = new ArrayList<>();

        //relación de uno a muchos con rating
    @OneToMany(mappedBy = "class_id", cascade = CascadeType.ALL)
    private List<Ratings> ratingses = new ArrayList<>();

        //relación de uno a muchos con class_registration
    @OneToMany(mappedBy = "class_id", cascade = CascadeType.ALL)
    private List<Class_registration> class_registrations = new ArrayList<>();

    //Constructores
        //constructor vacío
    public Class(){

    }
        //con parametros
    public Class(int id_class, String type, OffsetDateTime schedule, LocalTime duration, int max_capacity,
            Instructor instructor) {
        this.id_class = id_class;
        this.type = type;
        this.schedule = schedule;
        this.duration = duration;
        this.max_capacity = max_capacity;
        this.instructor = instructor;
    }


    //ENCAPSULADO
    public int getId_class() {
        return id_class;
    }

    public void setId_class(int id_class) {
        this.id_class = id_class;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public OffsetDateTime getSchedule() {
        return schedule;
    }

    public void setSchedule(OffsetDateTime schedule) {
        this.schedule = schedule;
    }

    public LocalTime getDuration() {
        return duration;
    }

    public void setDuration(LocalTime duration) {
        this.duration = duration;
    }

    public int getMax_capacity() {
        return max_capacity;
    }

    public void setMax_capacity(int max_capacity) {
        this.max_capacity = max_capacity;
    }

    public Instructor getInstructor_id() {
        return instructor;
    }

    public void setInstructor_id(Instructor instructor) {
        this.instructor = instructor;
    }

    //Get para la relacion con Attendances
    public List<Attendance> getAttendances(){
        return Collections.unmodifiableList(attendances);
    }

    //get par la relacion con equipament_usage
    public List<Equipment_usage> getEquipment_usages(){
        return Collections.unmodifiableList(equipments);
    }

    //get para la relación con raings
    public List<Ratings> getRatingses() {
        return Collections.unmodifiableList(ratingses);
    }

    //get para la relación con class_registration
    public List<Class_registration> getClass_registrations() {
        return Collections.unmodifiableList(class_registrations);
    }
}
