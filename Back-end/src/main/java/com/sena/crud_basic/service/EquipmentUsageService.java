package com.sena.crud_basic.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.requestEquipmentUsageDTO;
import com.sena.crud_basic.DTO.responseEquipmentUsageDTO;
import com.sena.crud_basic.interfaces.IClass;
import com.sena.crud_basic.interfaces.IEquipment;
import com.sena.crud_basic.interfaces.IEquipmentUsage;
import com.sena.crud_basic.model.Equipment;
import com.sena.crud_basic.model.Equipment_usage;

@Service
public class EquipmentUsageService {
    @Autowired
    private IEquipmentUsage usageRepository;

    @Autowired
    private IEquipment equipmentRepository;

    @Autowired
    private IClass classRepository;

    // GET all
    public List<responseEquipmentUsageDTO> findAllUsages() {
        return usageRepository.findAll()
            .stream()
            .map(this::convertToResponseDTO)
            .collect(Collectors.toList());
    }

    // GET entity by ID
    public Equipment_usage findByIdEntity(int id) {
        return usageRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usage con ID " + id + " no existe."));
    }

    // GET DTO by ID
    public responseEquipmentUsageDTO findById(int id) {
        return convertToResponseDTO(findByIdEntity(id));
    }

    // POST
    public void save(requestEquipmentUsageDTO dto) {
        usageRepository.save(convertToEntity(dto));
    }

    // PUT
    public Equipment_usage update(requestEquipmentUsageDTO dto) {
        Equipment_usage existing = findByIdEntity(dto.getId_equipamentUsage());

        Equipment eq = equipmentRepository.findById(dto.getEquipment_id())
            .orElseThrow(() -> new RuntimeException("Equipo con ID " + dto.getEquipment_id() + " no existe."));
        com.sena.crud_basic.model.Class cls = classRepository.findById(dto.getClass_id())
            .orElseThrow(() -> new RuntimeException("Clase con ID " + dto.getClass_id() + " no existe."));

        existing.setEquipment_id(eq);
        existing.setClass_id(cls);
        existing.setUsage_date(dto.getUsage_date());
        existing.setStart_time(dto.getStart_time());
        existing.setEnd_time(dto.getEnd_time());

        return usageRepository.save(existing);
    }

    // DELETE
    public void delete(int id) {
        Equipment_usage u = findByIdEntity(id);
        usageRepository.delete(u);
    }

    // Convert DTO → Entity
    public Equipment_usage convertToEntity(requestEquipmentUsageDTO dto) {
        Equipment eq = equipmentRepository.findById(dto.getEquipment_id())
            .orElseThrow(() -> new RuntimeException("Equipo con ID " + dto.getEquipment_id() + " no existe."));
        com.sena.crud_basic.model.Class cls = classRepository.findById(dto.getClass_id())
            .orElseThrow(() -> new RuntimeException("Clase con ID " + dto.getClass_id() + " no existe."));

        return new Equipment_usage(
            dto.getId_equipamentUsage(),
            cls,
            eq,
            dto.getUsage_date(),
            dto.getStart_time(),
            dto.getEnd_time()
        );
    }

    // Convert Entity → DTO
    public responseEquipmentUsageDTO convertToResponseDTO(Equipment_usage u) {
        String eqName  = u.getEquipment_id().getName();
        String clsType = u.getClass_id().getType();

        return new responseEquipmentUsageDTO(
            u.getId_equipamentUsage(),
            eqName,
            clsType,
            u.getUsage_date(),
            u.getStart_time(),
            u.getEnd_time()
        );
    }
}
