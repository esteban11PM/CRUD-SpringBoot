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

import com.sena.crud_basic.DTO.ResponseClassDTO;
import com.sena.crud_basic.DTO.requestClassDTO;
import com.sena.crud_basic.service.ClassService;

@RestController
@RequestMapping({"/Api/v1/Class"})
public class ClassController {
    @Autowired
    private ClassService classService;

    public ClassController() {}

    // GET todos
    @GetMapping("/")
    public ResponseEntity<Object> findAllClasses() {
        List<ResponseClassDTO> list = classService.findAllClasses();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // GET por ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> findClassById(@PathVariable("id") int id) {
        try {
            ResponseClassDTO dto = classService.findById(id);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // POST
    @PostMapping("/")
    public ResponseEntity<Object> createClass(@RequestBody requestClassDTO dto) {
        try {
            classService.save(dto);
            return new ResponseEntity<>("Registro guardado correctamente", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // PUT
    @PutMapping("/")
    public ResponseEntity<Object> updateClass(@RequestBody requestClassDTO dto) {
        try {
            classService.update(dto);
            return new ResponseEntity<>("Registro actualizado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al actualizar la clase.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteClass(@PathVariable("id") int id) {
        try {
            classService.delete(id);
            return new ResponseEntity<>("Registro eliminado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al eliminar la clase.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
