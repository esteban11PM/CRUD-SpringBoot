package com.sena.crud_basic.DTO;

import java.time.LocalDate;

public class responseClientDTO {
    public int id_client;
    public String first_name;
    public String last_name;
    public String phone;
    public LocalDate membership_start_date;
    public LocalDate membership_end_date;
    public String membership_type;

    public responseClientDTO(){}

    public responseClientDTO(int id_client, String first_name, String last_name, String phone,
            LocalDate membership_start_date, LocalDate membership_end_date, String membership_type) {
        this.id_client = id_client;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.membership_start_date = membership_start_date;
        this.membership_end_date = membership_end_date;
        this.membership_type = membership_type;
    }

    public int getId_client() {
        return id_client;
    }

    public void setId_client(int id_client) {
        this.id_client = id_client;
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

    public LocalDate getMembership_start_date() {
        return membership_start_date;
    }

    public void setMembership_start_date(LocalDate membership_start_date) {
        this.membership_start_date = membership_start_date;
    }

    public LocalDate getMembership_end_date() {
        return membership_end_date;
    }

    public void setMembership_end_date(LocalDate membership_end_date) {
        this.membership_end_date = membership_end_date;
    }

    public String getMembership_type() {
        return membership_type;
    }

    public void setMembership_type(String membership_type) {
        this.membership_type = membership_type;
    }

    
}
