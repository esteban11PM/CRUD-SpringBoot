package com.sena.crud_basic.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

public class requestEquipmentUsageDTO {
    public  int id_equipamentUsage;
    public  int equipment_id;
    public  int class_id;
    public  LocalDate usage_date;
    public  LocalTime start_time;
    public  LocalTime end_time;

    public requestEquipmentUsageDTO(){}

    public requestEquipmentUsageDTO(int id_equipamentUsage, int equipment_id, int class_id, LocalDate usage_date,
            LocalTime start_time, LocalTime end_time) {
        this.id_equipamentUsage = id_equipamentUsage;
        this.equipment_id = equipment_id;
        this.class_id = class_id;
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

    public int getEquipment_id() {
        return equipment_id;
    }

    public void setEquipment_id(int equipment_id) {
        this.equipment_id = equipment_id;
    }

    public int getClass_id() {
        return class_id;
    }

    public void setClass_id(int class_id) {
        this.class_id = class_id;
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
