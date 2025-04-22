package com.sena.crud_basic.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.requestIntructorDTO;
import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.interfaces.IInstructor;
import com.sena.crud_basic.model.Instructor;

@Service
public class InstructorService {
    @Autowired
    private IInstructor instructorData;

    // Trae todos los registros de la base de datos
    public List<requestIntructorDTO> findAllInstructors(){
        List<Instructor> instructors = this.instructorData.findAll();
        return instructors.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    // Trae un registro por ID
    public Instructor findByIdInstructor(int Id){
        return this.instructorData.findById(Id).orElseThrow(()-> new RuntimeException("El instructor con el Id "+Id+" no existe ne la base de datos"));
    } 

    // Crea un nuevo registro en la base de datos
    public void save(requestIntructorDTO intructorDTO){
        this.instructorData.save(this.converRegisterToInstructor(intructorDTO));
    }

    // convierte un intructor
    public  Instructor converRegisterToInstructor(requestIntructorDTO instructor){
        return new Instructor(instructor.getId_instructor(), instructor.getName(), instructor.getSpecialities());
    }

    // Actualiza los registros de la base de datos
    public Instructor update(requestIntructorDTO instructorUpdate) {
            Instructor existingInstructor = this.findByIdInstructor(instructorUpdate.getId_instructor());
            existingInstructor.setName(instructorUpdate.getName()); 
            existingInstructor.setSpecialties(instructorUpdate.getSpecialities());
    
            // Guardar la entidad actualizada
            return instructorData.save(existingInstructor); // Pasamos la entidad directamente
    }
    

    // Elimina un registro de la base de datos
    public responseDTO delete(int id) {
        Instructor instructor = this.findByIdInstructor(id);
        responseDTO response = new responseDTO();
        this.instructorData.delete((instructor)); // aquí me elimina el registro
        return response;
    }

    // Convierte un instructor a DTO
    public requestIntructorDTO convertToDTO(Instructor instructor) {
        requestIntructorDTO dto = new requestIntructorDTO();
        dto.id_instructor = instructor.getId_instructor();
        dto.name = instructor.getName();
        dto.specialties = instructor.getSpecialties();
        return dto;
    }
}
