package com.sena.crud_basic.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sena.crud_basic.model.Class_registration;

@Repository
public interface IClass_registration extends JpaRepository<Class_registration, Integer>{

}
