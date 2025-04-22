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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity(name = "equipment")
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_equipment")
    private int id_equipment;
    
    @Column(name = "name", length = 100, nullable = false)
    private String name;
    
    @Column(name = "location", length = 100, nullable = false)
    private String location;
    
    //FOREIGN KEY
    @ManyToOne //llave foranea con Relacion de muchos a uno a area
    @JoinColumn(name = "area_id", referencedColumnName = "id_area")
    private Area area;

    //RELACIONES
        //relacion de uno a muchos con equipment_usage
    @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL)
    private List<Equipment_usage> equipment_usages = new ArrayList<>();

    //Constructores
        //vacío
    public  Equipment(){
        
    }
        //con parametros
    public Equipment(int id_equipment, String name, String location, Area area) {
        this.id_equipment = id_equipment;
        this.name = name;
        this.location = location;
        this.area = area;
    }

    //encapsulamiento
    public int getId_equipment() {
        return id_equipment;
    }

    public void setId_equipment(int id_equipment) {
        this.id_equipment = id_equipment;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Area getArea_id() {
        return area;
    }

    public void setArea_id(Area area) {
        this.area = area;
    }

    //get para la relacion con equipment_usage
    public List<Equipment_usage> getEquipment_usages(){
        return Collections.unmodifiableList(equipment_usages);
    }
}