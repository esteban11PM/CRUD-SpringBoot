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

import com.sena.crud_basic.DTO.requestClientDTO;
import com.sena.crud_basic.DTO.responseClientDTO;
import com.sena.crud_basic.service.ClientService;

@RestController
@RequestMapping({"/Api/v1/Client"})
public class ClientController {
    @Autowired
    private ClientService clientService;

    public ClientController() {}

    @GetMapping("/")
    public ResponseEntity<Object> findAllClients() {
        List<responseClientDTO> clients = clientService.findAllClients();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findClientById(@PathVariable("id") int id) {
        try {
            responseClientDTO dto = clientService.findById(id);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public ResponseEntity<responseClientDTO> createClient(@RequestBody requestClientDTO dto) {
        // try {
            responseClientDTO createdClient = clientService.save(dto);
            return new ResponseEntity<>(createdClient, HttpStatus.CREATED);
        // } catch (RuntimeException e) {
        //     return new ResponseEntity<>(createdClient, HttpStatus.BAD_REQUEST);
        // }
    }

    @PutMapping("/")
    public ResponseEntity<Object> updateClient(@RequestBody requestClientDTO dto) {
        try {
            clientService.update(dto);
            return new ResponseEntity<>("Registro actualizado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al actualizar el cliente.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteClient(@PathVariable("id") int id) {
        try {
            clientService.delete(id);
            return new ResponseEntity<>("Registro eliminado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al eliminar el cliente.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
