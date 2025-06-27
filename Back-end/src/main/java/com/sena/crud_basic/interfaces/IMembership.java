package com.sena.crud_basic.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sena.crud_basic.model.Member;

@Repository
public interface IMembership extends JpaRepository<Member, Integer>{
    /*
     * Ya inclye el:
     * SELECT
     * UPDATE
     * INSERT
     * DELETE
     */

}
