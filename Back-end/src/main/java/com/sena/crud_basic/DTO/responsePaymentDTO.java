package com.sena.crud_basic.DTO;

import java.time.LocalDate;

public class responsePaymentDTO {
    public  int id_payment;
    public  String client_name;
    public  float amount;
    public  LocalDate payment_date;
    public  String payment_method;

    public responsePaymentDTO(){}

    public responsePaymentDTO(int id_payment, String client_name, float amount, LocalDate payment_date,
            String payment_method) {
        this.id_payment = id_payment;
        this.client_name = client_name;
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

    public String getClient_name() {
        return client_name;
    }

    public void setClient_name(String client_name) {
        this.client_name = client_name;
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
