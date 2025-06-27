package com.sena.crud_basic.DTO;

import java.time.LocalTime;
import java.time.OffsetDateTime;

public class requestClassDTO {
    public int id_class;
    public String type;
    public OffsetDateTime schedule;
    public LocalTime duration;
    public int max_capacity;
    public int instructor_id;

    public requestClassDTO() {}

    public requestClassDTO(int id_class, String type, OffsetDateTime schedule, LocalTime duration, int max_capacity,
            int instructor_id) {
        this.id_class = id_class;
        this.type = type;
        this.schedule = schedule;
        this.duration = duration;
        this.max_capacity = max_capacity;
        this.instructor_id = instructor_id;
    }

    public int getId_class() {
        return id_class;
    }

    public void setId_class(int id_class) {
        this.id_class = id_class;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public OffsetDateTime getSchedule() {
        return schedule;
    }

    public void setSchedule(OffsetDateTime schedule) {
        this.schedule = schedule;
    }

    public LocalTime getDuration() {
        return duration;
    }

    public void setDuration(LocalTime duration) {
        this.duration = duration;
    }

    public int getMax_capacity() {
        return max_capacity;
    }

    public void setMax_capacity(int max_capacity) {
        this.max_capacity = max_capacity;
    }

    public int getInstructor_id() {
        return instructor_id;
    }

    public void setInstructor_id(int instructor_id) {
        this.instructor_id = instructor_id;
    }

    
}
