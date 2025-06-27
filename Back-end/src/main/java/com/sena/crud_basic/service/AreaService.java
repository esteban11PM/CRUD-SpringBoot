package com.sena.crud_basic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.requestAreaDTO;
import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.interfaces.IArea;
import com.sena.crud_basic.model.Area;

@Service
public class AreaService {
    @Autowired
    private IArea areaData;

    public List<Area> FindAllAreas(){
        return this.areaData.findAll();
    }

    public Area findByIdArea(int Id){
        return this.areaData.findById(Id).orElseThrow(()->new RuntimeException("El area del GYM con el Id "+Id+" no existe en la base."));
    }

    public Area converRegisterToArea(requestAreaDTO area){
        return new Area(area.getId_area(), area.getName(), area.getDescription());
    }

    public void save(requestAreaDTO areaDTO){
        this.areaData.save(this.converRegisterToArea(areaDTO));
    }

    public Area update(requestAreaDTO areaUpdate){
        Area existArea = this.findByIdArea(areaUpdate.getId_area());
        existArea.setName(areaUpdate.getName());
        existArea.setDescription(areaUpdate.getDescription());

        return areaData.save(existArea);
    }

    public responseDTO delete(int Id){
        Area area = this.findByIdArea(Id);
        responseDTO responseDTO = new responseDTO();
        this.areaData.delete(area);
        return responseDTO;
    }
}
