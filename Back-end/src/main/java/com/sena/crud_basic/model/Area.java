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

@Entity(name = "area")
public class Area {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_area")
    private int id_area;
    
    @Column(name = "name", length = 100, nullable = false)
    private String name;
    
    @Column(name = "description", length = 100)
    private String description;

    //RELACIONES
        //relación de uno a muchos
    @OneToMany(mappedBy = "area", cascade = CascadeType.ALL)
    private List<Equipment> equipments = new ArrayList<>(); 

    //Constructores
        //Vacío
    public Area(){

    }
        //con  parametros
    public Area(int id_area, String name, String description) {
        this.id_area = id_area;
        this.name = name;
        this.description = description;
    }

    //encapsulado
    public int getId_area() {
        return id_area;
    }
    public void setId_area(int id_area) {
        this.id_area = id_area;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    //get para la relacion con equipments
    public List<Equipment> getEquipments() {
        return Collections.unmodifiableList(equipments);
    } 
}