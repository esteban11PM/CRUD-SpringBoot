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

import com.sena.crud_basic.DTO.requestAttendanceDTO;
import com.sena.crud_basic.DTO.responseAttendanceDTO;
import com.sena.crud_basic.service.AttendanceService;

@RestController
@RequestMapping({"/Api/v1/Attendance"})
public class AttendanceController {
    @Autowired
    private AttendanceService attendanceService;

    public AttendanceController() {}

    // GET all
    @GetMapping("/")
    public ResponseEntity<Object> findAllAttendances() {
        List<responseAttendanceDTO> list = attendanceService.findAllAttendances();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // GET by ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> findAttendanceById(@PathVariable("id") int id) {
        try {
            responseAttendanceDTO dto = attendanceService.findById(id);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // POST
    @PostMapping("/")
    public ResponseEntity<Object> createAttendance(@RequestBody requestAttendanceDTO dto) {
        try {
            attendanceService.save(dto);
            return new ResponseEntity<>("Registro guardado correctamente", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // PUT
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateAttendance(@RequestBody requestAttendanceDTO dto) {
        try {
            attendanceService.update(dto);
            return new ResponseEntity<>("Registro actualizado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al actualizar el registro.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteAttendance(@PathVariable("id") int id) {
        try {
            attendanceService.delete(id);
            return new ResponseEntity<>("Registro eliminado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al eliminar el registro.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
