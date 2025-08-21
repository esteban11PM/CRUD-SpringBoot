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

import com.sena.crud_basic.DTO.requestRatingDTO;
import com.sena.crud_basic.DTO.responseRatingDTO;
import com.sena.crud_basic.service.RatingService;

@RestController
@RequestMapping({"/Api/v1/Ratings"})
public class RatingsController {
    @Autowired
    private RatingService ratingsService;

    public RatingsController() {}

    // GET todos
    @GetMapping("/")
    public ResponseEntity<Object> findAllRatings() {
        List<responseRatingDTO> list = ratingsService.findAllRatings();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // GET por ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> findRatingById(@PathVariable("id") int id) {
        try {
            responseRatingDTO dto = ratingsService.findById(id);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // POST
    @PostMapping("/")
    public ResponseEntity<Object> createRating(@RequestBody requestRatingDTO dto) {
        try {
            ratingsService.save(dto);
            return new ResponseEntity<>("Registro guardado correctamente", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // PUT
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateRating(@RequestBody requestRatingDTO dto) {
        try {
            ratingsService.update(dto);
            return new ResponseEntity<>("Registro actualizado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al actualizar el rating.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteRating(@PathVariable("id") int id) {
        try {
            ratingsService.delete(id);
            return new ResponseEntity<>("Registro eliminado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al eliminar el rating.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
