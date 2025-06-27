package com.sena.crud_basic.DTO;

public class requestClass_registrationDTO {
    public int id_classRegistration;
    public int client_id;
    public int class_id;

    public requestClass_registrationDTO(){}

    public requestClass_registrationDTO(int id_classRegistration, int client_id, int class_id) {
        this.id_classRegistration = id_classRegistration;
        this.client_id = client_id;
        this.class_id = class_id;
    }

    public int getId_classRegistration() {
        return id_classRegistration;
    }

    public void setId_classRegistration(int id_classRegistration) {
        this.id_classRegistration = id_classRegistration;
    }

    public int getClient_id() {
        return client_id;
    }

    public void setClient_id(int client_id) {
        this.client_id = client_id;
    }

    public int getClass_id() {
        return class_id;
    }

    public void setClass_id(int class_id) {
        this.class_id = class_id;
    }

    
}
