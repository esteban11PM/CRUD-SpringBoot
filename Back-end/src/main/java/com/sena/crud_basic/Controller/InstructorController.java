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

import com.sena.crud_basic.DTO.requestIntructorDTO;
import com.sena.crud_basic.service.InstructorService;

@RestController
@RequestMapping({"Api/v1/Instructor"})
public class InstructorController {
    @Autowired
    private InstructorService instructorService;

    public InstructorController(){}

    //Controlador para obtener una lista completa de todos los registros de la base de datos
    @GetMapping({"/"})
    public ResponseEntity<Object> findAllIntructor(){
        List<requestIntructorDTO> ListInstructor = this.instructorService.findAllInstructors();
        return new ResponseEntity(ListInstructor, HttpStatus.OK);
    }

    //Controlador que trae el un registro por el ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> findInstructorById(@PathVariable("id") int id) {
        try {
            requestIntructorDTO instructor = instructorService.convertToDTO(instructorService.findByIdInstructor(id));
            return new ResponseEntity<>(instructor, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // controlador para crear un nuevo registro en la base de datos
    @PostMapping({"/"})
    public String postMethodName(@RequestBody requestIntructorDTO instructor){
        this.instructorService.save(instructor);
        return "Register Ok";
    }

    // constrolador para actualizar un registro en la base de datos
    @PutMapping("/")
    public ResponseEntity<Object> update(@RequestBody requestIntructorDTO instructorDTO) {
        try {
            instructorService.update(instructorDTO);
            
            return new ResponseEntity<>("Registro actualizado correctamente", HttpStatus.OK);

        }catch(RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }catch (Exception e) {
            return new ResponseEntity<>("Error interno al actualizar el registro", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Constrolador que elimina un registro de la base de datos
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteInstructor(@PathVariable("id") int id) {
        try {
            // Llamar al servicio para eliminar el registro
            instructorService.delete(id);
            return new ResponseEntity<>("Registro eliminado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            // Manejar excepción cuando el registro no existe
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Capturar otros errores inesperados
            return new ResponseEntity<>("Error interno al eliminar el registro", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
