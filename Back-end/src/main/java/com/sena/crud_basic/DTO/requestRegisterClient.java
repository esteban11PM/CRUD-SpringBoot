package com.sena.crud_basic.DTO;

public class requestRegisterClient {
    private String first_name;
    
    private String last_name;
    
    private String phone;

    public requestRegisterClient(String first_name, String last_name, String phone) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    
}
