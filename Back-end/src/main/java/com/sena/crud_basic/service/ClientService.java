package com.sena.crud_basic.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.requestClientDTO;
import com.sena.crud_basic.DTO.responseClientDTO;
import com.sena.crud_basic.interfaces.IClient;
import com.sena.crud_basic.interfaces.IMembership;
import com.sena.crud_basic.model.Client;
import com.sena.crud_basic.model.Member;

@Service
public class ClientService {
    @Autowired
    private IClient clientRepository;

    @Autowired
    private IMembership memberRepository;

    // GET all
    public List<responseClientDTO> findAllClients() {
        return clientRepository.findAll()
            .stream()
            .map(this::convertToResponseDTO)
            .collect(Collectors.toList());
    }

    // GET by id (entity)
    public Client findByIdEntity(int id) {
        return clientRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("El cliente con ID " + id + " no existe."));
    }

    // GET by id (DTO)
    public responseClientDTO findById(int id) {
        return convertToResponseDTO(findByIdEntity(id));
    }

    // POST
    public responseClientDTO save(requestClientDTO dto) {
        Client entity = clientRepository.save(convertToEntity(dto));
        return convertToResponseDTO(entity);
    }

    // PUT
    public void update(requestClientDTO dto) {
        Client existing = findByIdEntity(dto.getId_client());
        Member membership = memberRepository.findById(dto.getMembership_id())
            .orElseThrow(() -> new RuntimeException("Membresía con ID " + dto.getMembership_id() + " no existe."));

        existing.setFirst_name(dto.getFirst_name());
        existing.setLast_name(dto.getLast_name());
        existing.setPhone(dto.getPhone());
        existing.setMembership_start_date(dto.getMembership_start_date());
        existing.setMembership_end_date(dto.getMembership_end_date());
        existing.setMembership(membership);

        clientRepository.save(existing);
    }

    // DELETE
    public void delete(int id) {
        Client c = findByIdEntity(id);
        clientRepository.delete(c);
    }

    // Mapeos
    public Client convertToEntity(requestClientDTO dto) {
        // Buscar membresía
        Member membership = memberRepository.findById(dto.getMembership_id())
            .orElseThrow(() -> new RuntimeException(
                "Membresía con ID " + dto.getMembership_id() + " no existe."
            ));
    
        // Crear entidad cliente
        Client client = new Client(
            dto.getId_client(),
            dto.getFirst_name(),
            dto.getLast_name(),
            dto.getPhone(),
            dto.getMembership_end_date(),
            dto.getMembership_start_date(),
            membership
        );
    
        return client;
    }

    public responseClientDTO convertToResponseDTO(Client client) {
        responseClientDTO dto = new responseClientDTO();
        dto.id_client = client.getId_client();
        dto.first_name = client.getFirst_name();
        dto.last_name = client.getLast_name();
        dto.phone = client.getPhone();
        dto.membership_start_date = client.getMembership_start_date();
        dto.membership_end_date = client.getMembership_end_date();
        
        if (client.getMembership() != null) {
            dto.membership_type = client.getMembership().getName();
            // No exponer membership_id aquí
        }

        return dto;
    }
}
