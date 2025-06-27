package com.sena.crud_basic.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.ResponseClassDTO;
import com.sena.crud_basic.DTO.requestClassDTO;
import com.sena.crud_basic.interfaces.IClass;
import com.sena.crud_basic.interfaces.IInstructor;
import com.sena.crud_basic.model.Instructor;

@Service
public class ClassService {
    @Autowired
    private IClass classRepository;

    @Autowired
    private IInstructor instructorRepository;

    // GET todos
    public List<ResponseClassDTO> findAllClasses() {
        return classRepository.findAll()
            .stream()
            .map(this::convertToResponseDTO)
            .collect(Collectors.toList());
    }

    // GET entidad por ID
    public com.sena.crud_basic.model.Class findByIdEntity(int id) {
        return classRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("La clase con ID " + id + " no existe."));
    }

    // GET DTO por ID
    public ResponseClassDTO findById(int id) {
        return convertToResponseDTO(findByIdEntity(id));
    }

    // POST
    public void save(requestClassDTO dto) {
        classRepository.save(convertToEntity(dto));
    }

    // PUT
    public com.sena.crud_basic.model.Class update(requestClassDTO dto) {
        com.sena.crud_basic.model.Class existing = findByIdEntity(dto.getId_class());
        Instructor instr = instructorRepository.findById(dto.getInstructor_id())
            .orElseThrow(() -> new RuntimeException("Instructor con ID " + dto.getInstructor_id() + " no existe."));

        existing.setType(dto.getType());
        existing.setSchedule(dto.getSchedule());
        existing.setDuration(dto.getDuration());
        existing.setMax_capacity(dto.getMax_capacity());
        existing.setInstructor_id(instr);

        return classRepository.save(existing);
    }

    // DELETE
    public void delete(int id) {
        com.sena.crud_basic.model.Class cls = findByIdEntity(id);
        classRepository.delete(cls);
    }

    // mapea DTO → Entity
    public com.sena.crud_basic.model.Class convertToEntity(requestClassDTO dto) {
        Instructor instr = instructorRepository.findById(dto.getInstructor_id())
            .orElseThrow(() -> new RuntimeException("Instructor con ID " + dto.getInstructor_id() + " no existe."));
        return new com.sena.crud_basic.model.Class(
            dto.getId_class(),
            dto.getType(),
            dto.getSchedule(),
            dto.getDuration(),
            dto.getMax_capacity(),
            instr
        );
    }

    // mapea Entity → DTO
    public ResponseClassDTO convertToResponseDTO(com.sena.crud_basic.model.Class cls) {
        String instrName = cls.getInstructor_id().getName();
        return new ResponseClassDTO(
            cls.getId_class(),
            cls.getType(),
            cls.getSchedule(),
            cls.getDuration(),
            cls.getMax_capacity(),
            instrName
        );
    }
}
