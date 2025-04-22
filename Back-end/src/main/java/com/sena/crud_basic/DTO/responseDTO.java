// Source code is decompiled from a .class file using FernFlower decompiler.
package com.sena.crud_basic.DTO;

import org.springframework.http.HttpStatus;

public class responseDTO {
    private HttpStatus status;
    private String message;

    public responseDTO() {
    }

    public responseDTO(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return this.status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
