package com.sena.crud_basic.DTO;

import java.time.LocalDate;

public class requestPaymentDTO {
    public  int id_payment;
    public  int client_id;
    public  float amount;
    public  LocalDate payment_date;
    public  String payment_method;

    public requestPaymentDTO(){}

    public requestPaymentDTO(int id_payment, int client_id, float amount, LocalDate payment_date,
            String payment_method) {
        this.id_payment = id_payment;
        this.client_id = client_id;
        this.amount = amount;
        this.payment_date = payment_date;
        this.payment_method = payment_method;
    }

    public int getId_payment() {
        return id_payment;
    }

    public void setId_payment(int id_payment) {
        this.id_payment = id_payment;
    }

    public int getClient_id() {
        return client_id;
    }

    public void setClient_id(int client_id) {
        this.client_id = client_id;
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
