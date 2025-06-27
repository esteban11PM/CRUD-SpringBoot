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

import com.sena.crud_basic.DTO.requestMemberDTO;
import com.sena.crud_basic.service.MemberService;

@RestController
@RequestMapping({"Api/v1/Member"})
public class MemberController {
    @Autowired
    private MemberService memberService;

    public MemberController(){} //constructor por defecto

    // Controlador para obtener una lista con todos los datos
    @GetMapping({"/"})
    public ResponseEntity<Object> findAllMemberEntity(){
        List<requestMemberDTO> listMembers = this.memberService.findAllMembers();
        return new ResponseEntity(listMembers, HttpStatus.OK);
    }

    // Controlador para obtener datos por Id
    @GetMapping("/{id}")
    public ResponseEntity<Object> findMemberById(@PathVariable("id") int Id){
        try{
            requestMemberDTO member = memberService.convertToDTO(memberService.findByIdMember(Id));
            return new ResponseEntity<>(member, HttpStatus.OK);
        }
        catch(RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Controlador para crear un nuevo registro
    @PostMapping({"/"})
    public String postMethodString(@RequestBody requestMemberDTO member){
        memberService.save(member);
        return "Register Ok";
    }

    // Controlador Para actualizar
    @PutMapping({"/"})
    public ResponseEntity<Object> update(@RequestBody requestMemberDTO member){
        try{
            memberService.update(member);

            return new ResponseEntity<>("Registro actualizado correctamente", HttpStatus.OK);
        }
        catch(RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch(Exception e){
            return new ResponseEntity<>("Error interno al actualizar los datos", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Controlador para eliminar datos
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMember(@PathVariable("id") int Id){
        try{
            memberService.delete(Id);
            return new ResponseEntity<>("Resgistro eliminado correctamente", HttpStatus.OK);
        }
        catch(RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch(Exception e){
            return new ResponseEntity<>("Error interno al intentar eliminar los datos", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
