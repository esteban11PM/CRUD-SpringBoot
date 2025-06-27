package com.sena.crud_basic.DTO;

import java.time.LocalDate;

public class responseAttendanceDTO {
    public int id_attendance;
    public String client_full_name;
    public String class_type;
    public LocalDate attendance_date;

    public responseAttendanceDTO(){}

    public responseAttendanceDTO(int id_attendance, String client_full_name, String class_type,
            LocalDate attendance_date) {
        this.id_attendance = id_attendance;
        this.client_full_name = client_full_name;
        this.class_type = class_type;
        this.attendance_date = attendance_date;
    }

    public int getId_attendance() {
        return id_attendance;
    }

    public void setId_attendance(int id_attendance) {
        this.id_attendance = id_attendance;
    }

    public String getClient_full_name() {
        return client_full_name;
    }

    public void setClient_full_name(String client_full_name) {
        this.client_full_name = client_full_name;
    }

    public String getClass_type() {
        return class_type;
    }

    public void setClass_type(String class_type) {
        this.class_type = class_type;
    }

    public LocalDate getAttendance_date() {
        return attendance_date;
    }

    public void setAttendance_date(LocalDate attendance_date) {
        this.attendance_date = attendance_date;
    }
    
}
