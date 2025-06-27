package com.sena.crud_basic.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.crud_basic.DTO.requestEquipmentDTO;
import com.sena.crud_basic.DTO.responseEquipmentDTO;
import com.sena.crud_basic.model.Equipment;
import com.sena.crud_basic.service.EquipmentService;

@RestController
@RequestMapping({"Api/v1/Equipment"})
public class EquipmentController {
    @Autowired
    private EquipmentService equipmentService;

    public EquipmentController() {}

    // GET - Todos los equipos
    @GetMapping({"/"})
    public ResponseEntity<Object> findAllEquipment() {
        List<responseEquipmentDTO> equipmentList = this.equipmentService.findAllEquipment();
        return new ResponseEntity<>(equipmentList, HttpStatus.OK);
    }

    // GET - Por ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> findEquipmentById(@PathVariable("id") int id) {
        try {
            responseEquipmentDTO equipment = this.equipmentService.findByIdEquipment(id);
            return new ResponseEntity<>(equipment, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // POST - Crear nuevo equipo
    @PostMapping({"/"})
    public String saveEquipment(@RequestBody requestEquipmentDTO equipmentDTO) {
        this.equipmentService.save(equipmentDTO);
        return "Register OK";
    }

    // PUT - Actualizar equipo
    @PutMapping({"/"})
    public ResponseEntity<Object> updateEquipment(@RequestBody requestEquipmentDTO equipmentDTO) {
        try {
            Equipment updated = this.equipmentService.update(equipmentDTO);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al actualizar los datos.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE - Eliminar equipo
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEquipment(@PathVariable("id") int id) {
        try {
            this.equipmentService.delete(id);
            return new ResponseEntity<>("Registro eliminado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al eliminar los datos.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
