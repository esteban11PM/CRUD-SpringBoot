package com.sena.crud_basic.DTO;

public class responseClass_registrationDTO {
    public int id_classRegistration;
    public String client_full_name;
    public String class_type;

    public responseClass_registrationDTO(){}

    public responseClass_registrationDTO(int id_classRegistration, String client_full_name, String class_type) {
        this.id_classRegistration = id_classRegistration;
        this.client_full_name = client_full_name;
        this.class_type = class_type;
    }

    public int getId_classRegistration() {
        return id_classRegistration;
    }

    public void setId_classRegistration(int id_classRegistration) {
        this.id_classRegistration = id_classRegistration;
    }

    public String getClient_full_name() {
        return client_full_name;
    }

    public void setClient_full_name(String client_full_name) {
        this.client_full_name = client_full_name;
    }

    public String getClass_type() {
        return class_type;
    }

    public void setClass_type(String class_type) {
        this.class_type = class_type;
    }
    
}
