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

import com.sena.crud_basic.DTO.requestAreaDTO;
import com.sena.crud_basic.model.Area;
import com.sena.crud_basic.service.AreaService;

@RestController
@RequestMapping({"Api/v1/Area"})
public class AreaController {
    @Autowired
    private AreaService areaService;

    public AreaController(){}

    @GetMapping({"/"})
    public ResponseEntity<Object> findAllAreaEntity(){
        List<Area> listAreas = this.areaService.FindAllAreas();
        return new ResponseEntity(listAreas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findAreaById(@PathVariable("id") int Id){
        try{
            Area area = areaService.findByIdArea(Id);
            return new ResponseEntity<>(area, HttpStatus.OK);
        }
        catch(RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping({"/"})
    public String postMethodString(@RequestBody requestAreaDTO area){
        areaService.save(area);
        return "Register Ok";
    }

    @PutMapping({"/"})
    public ResponseEntity<Object> update(@RequestBody requestAreaDTO areaDTO){
        try{
            Area isUpdArea = this.areaService.update(areaDTO);
            return new ResponseEntity<>(isUpdArea, HttpStatus.OK);
        }
        catch(RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch(Exception e){
            return new ResponseEntity<>("Error interno al actualizar los datos.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteArea(@PathVariable("id") int Id){
        try{
            areaService.delete(Id);
            return new ResponseEntity<>("Registro eliminado correctamente", HttpStatus.OK);
        }
        catch(RuntimeException e){
            return  new  ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch(Exception e){
            return new ResponseEntity<>("Error interno al aliminar los datos.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
