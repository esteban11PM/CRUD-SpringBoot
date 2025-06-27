package com.sena.crud_basic.DTO;

public class requestEquipmentDTO {
    public int id_equipment;
    public String name;
    public String location;
    public int area_id;

    public requestEquipmentDTO(){}

    public requestEquipmentDTO(int id_equipment, String name, String location, int area_id) {
        this.id_equipment = id_equipment;
        this.name = name;
        this.location = location;
        this.area_id = area_id;
    }

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

    public int getArea_id() {
        return area_id;
    }

    public void setArea_id(int area_id) {
        this.area_id = area_id;
    }

}
