package com.sena.crud_basic.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.requestAttendanceDTO;
import com.sena.crud_basic.DTO.responseAttendanceDTO;
import com.sena.crud_basic.interfaces.IAttendance;
import com.sena.crud_basic.interfaces.IClass;
import com.sena.crud_basic.interfaces.IClient;
import com.sena.crud_basic.model.Attendance;
import com.sena.crud_basic.model.Client;

@Service
public class AttendanceService {
    @Autowired
    private IAttendance attendanceRepository;

    @Autowired
    private IClient clientRepository;

    @Autowired
    private IClass classRepository;

    // GET all
    public List<responseAttendanceDTO> findAllAttendances() {
        return attendanceRepository.findAll()
            .stream()
            .map(this::convertToResponseDTO)
            .collect(Collectors.toList());
    }

    // GET entity by ID
    public Attendance findByIdEntity(int id) {
        return attendanceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Attendance con ID " + id + " no existe."));
    }

    // GET DTO by ID
    public responseAttendanceDTO findById(int id) {
        return convertToResponseDTO(findByIdEntity(id));
    }

    // POST
    public void save(requestAttendanceDTO dto) {
        attendanceRepository.save(convertToEntity(dto));
    }

    // PUT
    public Attendance update(requestAttendanceDTO dto) {
        Attendance existing = findByIdEntity(dto.getId_attendance());

        Client client = clientRepository.findById(dto.getClient_id())
            .orElseThrow(() -> new RuntimeException("Cliente con ID " + dto.getClient_id() + " no existe."));
        com.sena.crud_basic.model.Class cls = classRepository.findById(dto.getClass_id())
            .orElseThrow(() -> new RuntimeException("Clase con ID " + dto.getClass_id() + " no existe."));

        existing.setClient_id(client);
        existing.setClass_id(cls);
        existing.setAttendance_date(dto.getAttendance_date());

        return attendanceRepository.save(existing);
    }

    // DELETE
    public void delete(int id) {
        Attendance a = findByIdEntity(id);
        attendanceRepository.delete(a);
    }

    // Convert DTO → Entity
    public Attendance convertToEntity(requestAttendanceDTO dto) {
        Client client = clientRepository.findById(dto.getClient_id())
            .orElseThrow(() -> new RuntimeException("Cliente con ID " + dto.getClient_id() + " no existe."));
        com.sena.crud_basic.model.Class cls = classRepository.findById(dto.getClass_id())
            .orElseThrow(() -> new RuntimeException("Clase con ID " + dto.getClass_id() + " no existe."));

        return new Attendance(
            dto.getId_attendance(),
            client,
            cls,
            dto.getAttendance_date()
        );
    }

    // Convert Entity → DTO
    public responseAttendanceDTO convertToResponseDTO(Attendance a) {
        String clientName = a.getClient_id().getFirst_name() + " " + a.getClient_id().getLast_name();
        String clsType    = a.getClass_id().getType();

        return new responseAttendanceDTO(
            a.getId_attendance(),
            clientName,
            clsType,
            a.getAttendance_date()
        );
    }
}
