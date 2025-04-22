package com.sena.crud_basic.DTO;

public class responseEquipmentDTO {
    public int id_equipment;
    public String name;
    public String location;
    public String area_name;

    public responseEquipmentDTO(){}

    public responseEquipmentDTO(int id_equipment, String name, String location, String area_name) {
        this.id_equipment = id_equipment;
        this.name = name;
        this.location = location;
        this.area_name = area_name;
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

    public String getArea_name() {
        return area_name;
    }

    public void setArea_name(String area_name) {
        this.area_name = area_name;
    }

    
}
