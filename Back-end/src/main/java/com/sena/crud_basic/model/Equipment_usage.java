package com.sena.crud_basic.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "equipment_usage")
public class Equipment_usage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // genera-auto incrementa
    @Column(name = "id_equipamentUsage")
    private int id_equipamentUsage;
    
    @Column(name = "usage_date", length = 100)
    private LocalDate usage_date;
    
    @Column(name = "start_time", length = 100)
    private LocalTime start_time;
    
    @Column(name = "end_time", length = 100)
    private LocalTime end_time;

    //FOREIGN KEY
    @ManyToOne //LLave foranea con relacion de muchos a uno a equipment
    @JoinColumn(name = "equipment_id", referencedColumnName = "id_equipment")
    private Equipment equipment;
    
    @ManyToOne //Llave foranea con relacion de muchos a uno a class
    @JoinColumn(name = "class_id", referencedColumnName = "id_class")
    private Class class_id;

    //Constructores
        //Vacío
    public Equipment_usage(){

    }
        //Con parametros
    public Equipment_usage(int id_equipamentUsage, Class class_id, Equipment equipment, LocalDate usage_date,
            LocalTime start_time, LocalTime end_time) {
        this.id_equipamentUsage = id_equipamentUsage;
        this.class_id = class_id;
        this.equipment = equipment;
        this.usage_date = usage_date;
        this.start_time = start_time;
        this.end_time = end_time;
    }

    //encapsulado 
    public int getId_equipamentUsage() {
        return id_equipamentUsage;
    }

    public void setId_equipamentUsage(int id_equipamentUsage) {
        this.id_equipamentUsage = id_equipamentUsage;
    }

    public Class getClass_id() {
        return class_id;
    }

    public void setClass_id(Class class_id) {
        this.class_id = class_id;
    }

    public Equipment getEquipment_id() {
        return equipment;
    }

    public void setEquipment_id(Equipment equipment_id) {
        this.equipment = equipment_id;
    }

    public LocalDate getUsage_date() {
        return usage_date;
    }

    public void setUsage_date(LocalDate usage_date) {
        this.usage_date = usage_date;
    }

    public LocalTime getStart_time() {
        return start_time;
    }

    public void setStart_time(LocalTime start_time) {
        this.start_time = start_time;
    }

    public LocalTime getEnd_time() {
        return end_time;
    }

    public void setEnd_time(LocalTime end_time) {
        this.end_time = end_time;
    }

    
}
