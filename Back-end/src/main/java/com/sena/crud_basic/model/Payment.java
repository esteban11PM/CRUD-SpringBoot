package com.sena.crud_basic.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_payment")
    private int id_payment;
    
    @Column(name = "amount", length = 100, nullable = false)
    private float amount;
    
    @Column(name = "payment_date", length = 100, nullable = false)
    private LocalDate payment_date;
    
    @Column(name = "payment_method", length = 100, nullable = false)
    private String payment_method;

    //FOREIGN KEY
    @ManyToOne //LLave foranea con Relación de muchos a uno a client
    @JoinColumn(name = "client_id", referencedColumnName = "id_client")
    private Client client_id;

    // Constructores
        //Vacío
    public Payment(){

    }
        //Con parametros
    public Payment(int id_payment, Client client_id, float amount, LocalDate payment_date, String payment_method) {
        this.id_payment = id_payment;
        this.client_id = client_id;
        this.amount = amount;
        this.payment_date = payment_date;
        this.payment_method = payment_method;
    }

    //Encapsulado
    public int getId_payment() {
        return id_payment;
    }

    public void setId_payment(int id_payment) {
        this.id_payment = id_payment;
    }

    public Client getClient_id() {
        return client_id;
    }

    public void setClient_id(Client client) {
        this.client_id = client;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public LocalDate getPayment_date() {
        return payment_date;
    }

    public void setPayment_date(LocalDate payment_date) {
        this.payment_date = payment_date;
    }

    public String getPayment_method() {
        return payment_method;
    }

    public void setPayment_method(String payment_method) {
        this.payment_method = payment_method;
    }   
}