package com.sena.crud_basic.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.requestClass_registrationDTO;
import com.sena.crud_basic.DTO.responseClass_registrationDTO;
import com.sena.crud_basic.interfaces.IClass;
import com.sena.crud_basic.interfaces.IClass_registration;
import com.sena.crud_basic.interfaces.IClient;
import com.sena.crud_basic.model.Class_registration;
import com.sena.crud_basic.model.Client;

@Service
public class Class_registrationService {
    @Autowired
    private IClass_registration registrationRepository;

    @Autowired
    private IClient clientRepository;

    @Autowired
    private IClass classRepository;

    // GET all
    public List<responseClass_registrationDTO> findAllRegistrations() {
        return registrationRepository.findAll()
            .stream()
            .map(this::convertToResponseDTO)
            .collect(Collectors.toList());
    }

    // GET entity by ID
    public Class_registration findByIdEntity(int id) {
        return registrationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Registro de clase con ID " + id + " no existe."));
    }

    // GET DTO by ID
    public responseClass_registrationDTO findById(int id) {
        return convertToResponseDTO(findByIdEntity(id));
    }

    // POST
    public void save(requestClass_registrationDTO dto) {
        registrationRepository.save(convertToEntity(dto));
    }

    // PUT
    public Class_registration update(requestClass_registrationDTO dto) {
        Class_registration existing = findByIdEntity(dto.getId_classRegistration());

        Client client = clientRepository.findById(dto.getClient_id())
            .orElseThrow(() -> new RuntimeException("Cliente con ID " + dto.getClient_id() + " no existe."));
        com.sena.crud_basic.model.Class cls = classRepository.findById(dto.getClass_id())
            .orElseThrow(() -> new RuntimeException("Clase con ID " + dto.getClass_id() + " no existe."));

        existing.setClient_id(client);
        existing.setClass_id(cls);

        return registrationRepository.save(existing);
    }

    // DELETE
    public void delete(int id) {
        Class_registration reg = findByIdEntity(id);
        registrationRepository.delete(reg);
    }

    // Convert DTO → Entity
    public Class_registration convertToEntity(requestClass_registrationDTO dto) {
        Client client = clientRepository.findById(dto.getClient_id())
            .orElseThrow(() -> new RuntimeException("Cliente con ID " + dto.getClient_id() + " no existe."));
        com.sena.crud_basic.model.Class cls = classRepository.findById(dto.getClass_id())
            .orElseThrow(() -> new RuntimeException("Clase con ID " + dto.getClass_id() + " no existe."));

        return new Class_registration(
            dto.getId_classRegistration(),
            client,
            cls
        );
    }

    // Convert Entity → DTO
    public responseClass_registrationDTO convertToResponseDTO(Class_registration reg) {
        String clientName = reg.getClient_id().getFirst_name() + " " + reg.getClient_id().getLast_name();
        String classType  = reg.getClass_id().getType();

        return new responseClass_registrationDTO(
            reg.getId_classRegistration(),
            clientName,
            classType
        );
    }
}
