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

@Entity(name="member")

public class Member {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremental
    @Column(name = "id_membership")
    private int id_membership;

    @Column(name="name", length=100, nullable=false)
    private String name;

    @Column(name="price", length=100, nullable=false)
    private float  price;

    // Relación Uno-a-Muchos con Client
    @OneToMany(mappedBy = "membership", cascade = CascadeType.ALL)
    private List<Client> clients = new ArrayList<>();

    // constructor
    public Member(){}
    public Member(int id_membership, String name, float price) {
        this.id_membership = id_membership;
        this.name = name;
        this.price = price;
    }

    // encapsulado Get and Set
    public int getId_membership() {
        return id_membership;
    }

    public void setId_membership(int id_membership) {
        this.id_membership = id_membership;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    //Solo get porque los set  no se recomienda para las colecciones
    public List<Client> getClients() {
        return Collections.unmodifiableList(clients);
    }
    
}

