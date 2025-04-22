package com.sena.crud_basic.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity(name = "client")
public class Client {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremental
    @Column(name = "id_client")
    private int id_client; 
    
    @Column(name = "first_name", length = 100, nullable = false)
    private String first_name;
    
    @Column(name = "last_name", length = 100, nullable = false)
    private String last_name;
    
    @Column(name = "phone", length = 100)
    private String phone;
    
    @Column(name = "membership_end_date", length = 100)
    private LocalDate membership_end_date;
    
    @Column(name = "membership_start_date", length = 100)
    private LocalDate membership_start_date;
    
    //foreing key
    @ManyToOne //LLave fóranea relación de muchos a uno con membership
    @JoinColumn(name = "membership_id", referencedColumnName = "id_membership")
    private Member membership;

    //RELACIONES
        //Relacion de uno a muchos
    @OneToMany(mappedBy = "client_id", cascade = CascadeType.ALL)
    private List<Payment> payments = new  ArrayList<>();

        //relación de uno a muchos con class_registration
    @OneToMany(mappedBy = "client_id", cascade = CascadeType.ALL)
    private List<Class_registration> class_registrations = new ArrayList<>();

        //relación de uno a muchos con rating
    @OneToMany(mappedBy = "client_id", cascade = CascadeType.ALL)
    private List<Ratings> ratingses = new ArrayList<>();

        //relacion de uno a muchos con attendance
    @OneToMany(mappedBy = "client_id", cascade = CascadeType.ALL)
    private List<Attendance> attendances = new ArrayList<>();

        //  

    //CONSTRUCTORES
        // Vacío
    public Client(){

    }
        //con parametros 
    public Client(int id_client, String first_name, String last_name, String phone, LocalDate membership_end_date,
            LocalDate membership_start_date, Member membership) {
        this.id_client = id_client;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.membership_end_date = membership_end_date;
        this.membership_start_date = membership_start_date;
        this.membership = membership;
    }

    // encapsulado
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

    public LocalDate getMembership_end_date() {
        return membership_end_date;
    }

    public void setMembership_end_date(LocalDate membership_end_date) {
        this.membership_end_date = membership_end_date;
    }

    public LocalDate getMembership_start_date() {
        return membership_start_date;
    }

    public void setMembership_start_date(LocalDate membership_start_date) {
        this.membership_start_date = membership_start_date;
    }

    public Member getMembership() {
        return membership;
    }

    public void setMembership(Member membership) {
        this.membership = membership;
    }

    //get para la relacion con Payment
    public List<Payment> getPayments() {
        return Collections.unmodifiableList(payments);
    }

    //get para la relacion con Class_registration
    public List<Class_registration> getClass_registrations() {
        return Collections.unmodifiableList(class_registrations);
    }

    //get para la relacion con raings
    public List<Ratings> getRatingses() {
        return Collections.unmodifiableList(ratingses);
    }

    //get para la relacion con attendance
    public List<Attendance> getAttendances() {
        return Collections.unmodifiableList(attendances);
    }
}