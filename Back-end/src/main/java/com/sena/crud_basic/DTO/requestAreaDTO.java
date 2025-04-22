package com.sena.crud_basic.DTO;

public class requestAreaDTO {
    public int id_area;
    public String name;
    public String description;

    public requestAreaDTO(){}

    public requestAreaDTO(int id_area, String name, String description) {
        this.id_area = id_area;
        this.name = name;
        this.description = description;
    }

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

    


}
