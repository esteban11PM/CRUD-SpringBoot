package com.sena.crud_basic.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "attendance")
public class Attendance {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_attendance")
    private int id_attendance;

    @Column(name = "attendance_date", length = 100, nullable = false)
    private LocalDate attendance_date;
    
    //FOREIGN KEY
    @ManyToOne //Llave foranea con relación de muchos a uno a client
    @JoinColumn(name = "client_id", referencedColumnName = "id_client")
    private Client client_id;
    
    @ManyToOne //Llave foranea con relación de muchos a uno a class
    @JoinColumn(name = "class_id", referencedColumnName = "id_class")
    private Class class_id;
    
    //Constructores
        //Vacío
    public Attendance(){

    }
        //con parametros
    public Attendance(int id_attendance, Client client_id, Class class_id, LocalDate attendance_date) {
        this.id_attendance = id_attendance;
        this.client_id = client_id;
        this.class_id = class_id;
        this.attendance_date = attendance_date;
    }

    //Encapsulado
    public int getId_attendance() {
        return id_attendance;
    }
    public void setId_attendance(int id_attendance) {
        this.id_attendance = id_attendance;
    }
    public LocalDate getAttendance_date() {
        return attendance_date;
    }
    public void setAttendance_date(LocalDate attendance_date) {
        this.attendance_date = attendance_date;
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