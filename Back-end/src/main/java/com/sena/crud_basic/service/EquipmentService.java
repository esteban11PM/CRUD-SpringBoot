package com.sena.crud_basic.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.requestEquipmentDTO;
import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.DTO.responseEquipmentDTO;
import com.sena.crud_basic.interfaces.IArea;
import com.sena.crud_basic.interfaces.IEquipment;
import com.sena.crud_basic.model.Area;
import com.sena.crud_basic.model.Equipment;

@Service
public class EquipmentService {
    @Autowired
    private IEquipment equipmentData;

    @Autowired
    private IArea areaData;

    // GET - Todos los equipos
    public List<responseEquipmentDTO> findAllEquipment(){
        return equipmentData.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // GET - Por ID
    public responseEquipmentDTO findByIdEquipment(int id){
        Equipment equipment = equipmentData.findById(id)
                .orElseThrow(() -> new RuntimeException("El equipo con el ID " + id + " no existe."));
        return convertToResponseDTO(equipment);
    }

    // POST - Crear nuevo equipo
    public void save(requestEquipmentDTO equipmentDTO){
        Equipment equipment = convertToEquipment(equipmentDTO);
        equipmentData.save(equipment);
    }

    // PUT - Actualizar equipo
    public Equipment update(requestEquipmentDTO equipmentDTO) {
        Equipment existingEquipment = equipmentData.findById(equipmentDTO.getId_equipment())
                .orElseThrow(() -> new RuntimeException("El equipo con el ID " + equipmentDTO.getId_equipment() + " no existe."));
        
        existingEquipment.setName(equipmentDTO.getName());
        existingEquipment.setLocation(equipmentDTO.getLocation());

        Area area = areaData.findById(equipmentDTO.getArea_id())
                .orElseThrow(() -> new RuntimeException("Área con ID " + equipmentDTO.getArea_id() + " no encontrada."));
        existingEquipment.setArea_id(area);

        return equipmentData.save(existingEquipment);
    }

    // DELETE - Eliminar equipo
    public responseDTO delete(int id) {
        Equipment equipment = equipmentData.findById(id)
                .orElseThrow(() -> new RuntimeException("El equipo con el ID " + id + " no existe."));
        equipmentData.delete(equipment);
        return new responseDTO();
    }

    // Convertir DTO → Entity
    public Equipment convertToEquipment(requestEquipmentDTO dto) {
        Area area = areaData.findById(dto.getArea_id())
                .orElseThrow(() -> new RuntimeException("Área con ID " + dto.getArea_id() + " no encontrada."));
        return new Equipment(dto.getId_equipment(), dto.getName(), dto.getLocation(), area);
    }

    // Convertir Entity → DTO para mostrar
    public responseEquipmentDTO convertToResponseDTO(Equipment equipment) {
        return new responseEquipmentDTO(
                equipment.getId_equipment(),
                equipment.getName(),
                equipment.getLocation(),
                equipment.getArea_id().getName()
        );
    }
}
