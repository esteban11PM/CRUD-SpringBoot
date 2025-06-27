package com.sena.crud_basic.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

public class responseEquipmentUsageDTO {
    public int id_equipamentUsage;
    public String equipment_name;
    public String class_type;
    public LocalDate usage_date;
    public LocalTime start_time;
    public LocalTime end_time;

    public responseEquipmentUsageDTO(){}

    public responseEquipmentUsageDTO(int id_equipamentUsage, String equipment_name, String class_type,
            LocalDate usage_date, LocalTime start_time, LocalTime end_time) {
        this.id_equipamentUsage = id_equipamentUsage;
        this.equipment_name = equipment_name;
        this.class_type = class_type;
        this.usage_date = usage_date;
        this.start_time = start_time;
        this.end_time = end_time;
    }

    public int getId_equipamentUsage() {
        return id_equipamentUsage;
    }

    public void setId_equipamentUsage(int id_equipamentUsage) {
        this.id_equipamentUsage = id_equipamentUsage;
    }

    public String getEquipment_name() {
        return equipment_name;
    }

    public void setEquipment_name(String equipment_name) {
        this.equipment_name = equipment_name;
    }

    public String getClass_type() {
        return class_type;
    }

    public void setClass_type(String class_type) {
        this.class_type = class_type;
    }

    public LocalDate getUsage_date() {
        return usage_date;
    }

    public void setUsage_date(LocalDate usage_date) {
        this.usage_date = usage_date;
    }

    public LocalTime getStart_time() {
        return start_time;
    }

    public void setStart_time(LocalTime start_time) {
        this.start_time = start_time;
    }

    public LocalTime getEnd_time() {
        return end_time;
    }

    public void setEnd_time(LocalTime end_time) {
        this.end_time = end_time;
    }
    
}
