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

import com.sena.crud_basic.DTO.requestEquipmentUsageDTO;
import com.sena.crud_basic.DTO.responseEquipmentUsageDTO;
import com.sena.crud_basic.service.EquipmentUsageService;

@RestController
@RequestMapping({"/Api/v1/Equipment_usage"})
public class Equipment_UsageController {
    @Autowired
    private EquipmentUsageService usageService;

    public Equipment_UsageController() {}

    // GET all
    @GetMapping("/")
    public ResponseEntity<Object> findAllUsages() {
        List<responseEquipmentUsageDTO> list = usageService.findAllUsages();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // GET por ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> findUsageById(@PathVariable("id") int id) {
        try {
            responseEquipmentUsageDTO dto = usageService.findById(id);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // POST
    @PostMapping("/")
    public ResponseEntity<Object> createUsage(@RequestBody requestEquipmentUsageDTO dto) {
        try {
            usageService.save(dto);
            return new ResponseEntity<>("Registro guardado correctamente", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // PUT
    @PutMapping("/")
    public ResponseEntity<Object> updateUsage(@RequestBody requestEquipmentUsageDTO dto) {
        try {
            usageService.update(dto);
            return new ResponseEntity<>("Registro actualizado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al actualizar el registro.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUsage(@PathVariable("id") int id) {
        try {
            usageService.delete(id);
            return new ResponseEntity<>("Registro eliminado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al eliminar el registro.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
