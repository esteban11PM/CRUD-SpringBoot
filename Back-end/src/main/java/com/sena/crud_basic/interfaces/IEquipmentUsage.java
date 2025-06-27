package com.sena.crud_basic.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sena.crud_basic.model.Equipment_usage;

@Repository
public interface IEquipmentUsage extends JpaRepository<Equipment_usage, Integer>{

}
