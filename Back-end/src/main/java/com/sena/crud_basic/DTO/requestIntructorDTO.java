package com.sena.crud_basic.DTO;

public class requestIntructorDTO {
    public int id_instructor;
    public String name;
    public String specialties;

    public requestIntructorDTO(){} //constructor por defecto

    public requestIntructorDTO(int id_instructor, String name, String specialties) {
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

    public String getSpecialities() {
        return specialties;
    }

    public void setSpecialities(String specialties) {
        this.specialties = specialties;
    }

    
}
