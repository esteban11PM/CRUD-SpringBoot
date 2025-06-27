package com.sena.crud_basic.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.requestMemberDTO;
import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.interfaces.IMembership;
import com.sena.crud_basic.model.Member;

@Service
public class MemberService {
    @Autowired
    private IMembership membershipData;

    //lista todos los datos disponibles
    public List<requestMemberDTO> findAllMembers(){
        List<Member> members = this.membershipData.findAll();
        return members.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    //muestra el dato por Id
    public Member findByIdMember(int Id){
        return this.membershipData.findById(Id).orElseThrow(()->new RuntimeException("La membresia con el Id "+Id+" no existe en la base de datos."));
    }

    //Convierte a Member
    public Member converRegisterToMember(requestMemberDTO member){
        return new Member(member.getId_membership(), member.getName(), member.getPrice());
    }

    //crea un nuevo reguistro en la base de datos
    public void save(requestMemberDTO memberDTO){
        this.membershipData.save(this.converRegisterToMember(memberDTO));
    }

    //Actualiza un registro por Id
    public Member update(requestMemberDTO memberUpdate){
        Member existMember = this.findByIdMember(memberUpdate.getId_membership());
        existMember.setName(memberUpdate.getName());
        existMember.setPrice(memberUpdate.getPrice());
        return membershipData.save(existMember);
    }

    //Eliminar un registro
    public responseDTO delete(int Id){
        Member member = this.findByIdMember(Id);
        responseDTO responseDTO = new responseDTO();
        this.membershipData.delete(member);
        return responseDTO;
    }

    public requestMemberDTO convertToDTO(Member m) {
        requestMemberDTO dto = new requestMemberDTO();
        dto.id_membership = m.getId_membership();
        dto.name = m.getName();
        dto.price = m.getPrice();
        return dto;
    }
}
