package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "class_registration")
public class Class_registration {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_classRegistration")
    private int id_classRegistration;
    
    //FOREIGN KEY
    @ManyToOne//Llave foranea con Relacion de muchos a uno a cliente
    @JoinColumn(name = "client_id", referencedColumnName = "id_client")
    private Client client_id;
    
    @ManyToOne //Llave foranea con Relacion de muchos a uno a clases
    @JoinColumn(name = "class_id", referencedColumnName = "id_class")
    private Class class_id;

    //consutructores
        //Vacío
    public Class_registration(){

    }
        //Con parametros
    public Class_registration(int id_classRegistration, Client client_id, Class class_id) {
        this.id_classRegistration = id_classRegistration;
        this.client_id = client_id;
        this.class_id = class_id;
    }

    // encapsulado
    public int getId_classRegistration() {
        return id_classRegistration;
    }
    public void setId_classRegistration(int id_classRegistration) {
        this.id_classRegistration = id_classRegistration;
    }
    public Client getClient_id() {
        return client_id;
    }
    public void setClient_id(Client client_id) {
        this.client_id = client_id;
    }
    public Class getClass_id() {
        return class_id;
    }
    public void setClass_id(Class class_id) {
        this.class_id = class_id;
    }
}
