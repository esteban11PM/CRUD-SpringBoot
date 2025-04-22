package com.sena.crud_basic.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IClass extends JpaRepository<com.sena.crud_basic.model.Class, Integer>{

}
