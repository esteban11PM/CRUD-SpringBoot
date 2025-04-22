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

import com.sena.crud_basic.DTO.requestClass_registrationDTO;
import com.sena.crud_basic.DTO.responseClass_registrationDTO;
import com.sena.crud_basic.service.Class_registrationService;

@RestController
@RequestMapping({"/Api/v1/Class_registration"})
public class Class_registrationController {
    @Autowired
    private Class_registrationService registrationService;

    public Class_registrationController() {}

    // GET all
    @GetMapping("/")
    public ResponseEntity<Object> findAllRegistrations() {
        List<responseClass_registrationDTO> list = registrationService.findAllRegistrations();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // GET by ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> findRegistrationById(@PathVariable("id") int id) {
        try {
            responseClass_registrationDTO dto = registrationService.findById(id);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // POST
    @PostMapping("/")
    public ResponseEntity<Object> createRegistration(@RequestBody requestClass_registrationDTO dto) {
        try {
            registrationService.save(dto);
            return new ResponseEntity<>("Registro guardado correctamente", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // PUT
    @PutMapping("/")
    public ResponseEntity<Object> updateRegistration(@RequestBody requestClass_registrationDTO dto) {
        try {
            registrationService.update(dto);
            return new ResponseEntity<>("Registro actualizado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al actualizar el registro.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteRegistration(@PathVariable("id") int id) {
        try {
            registrationService.delete(id);
            return new ResponseEntity<>("Registro eliminado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al eliminar el registro.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
