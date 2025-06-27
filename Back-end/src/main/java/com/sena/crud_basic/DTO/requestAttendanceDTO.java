package com.sena.crud_basic.DTO;

import java.time.LocalDate;

public class requestAttendanceDTO {
    public int id_attendance;
    public int client_id;
    public int class_id;
    public LocalDate attendance_date;

    public requestAttendanceDTO(){}

    public requestAttendanceDTO(int id_attendance, int client_id, int class_id, LocalDate attendance_date) {
        this.id_attendance = id_attendance;
        this.client_id = client_id;
        this.class_id = class_id;
        this.attendance_date = attendance_date;
    }

    public int getId_attendance() {
        return id_attendance;
    }

    public void setId_attendance(int id_attendance) {
        this.id_attendance = id_attendance;
    }

    public int getClient_id() {
        return client_id;
    }

    public void setClient_id(int client_id) {
        this.client_id = client_id;
    }

    public int getClass_id() {
        return class_id;
    }

    public void setClass_id(int class_id) {
        this.class_id = class_id;
    }

    public LocalDate getAttendance_date() {
        return attendance_date;
    }

    public void setAttendance_date(LocalDate attendance_date) {
        this.attendance_date = attendance_date;
    }
    
}
