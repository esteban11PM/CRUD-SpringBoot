package com.sena.crud_basic.DTO;

public class requestMemberDTO {
    public int id_membership;
    public String name;
    public float price;

    public requestMemberDTO(){} //constructor vacío

    public requestMemberDTO(int id_membership, String name, float price) {
        this.id_membership = id_membership;
        this.name = name;
        this.price = price;
    }

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

    
}
