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

import com.sena.crud_basic.DTO.requestPaymentDTO;
import com.sena.crud_basic.DTO.responsePaymentDTO;
import com.sena.crud_basic.service.PaymentService;

@RestController
@RequestMapping("/Api/v1/Payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    public PaymentController() {}

    // Obtener todos los pagos
    @GetMapping("/")
    public ResponseEntity<Object> findAllPayments() {
        List<responsePaymentDTO> listPayments = paymentService.findAllPayments();
        return new ResponseEntity<>(listPayments, HttpStatus.OK);
    }

    // Obtener un pago por ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> findPaymentById(@PathVariable("id") int id) {
        try {
            responsePaymentDTO response = paymentService.convertToResponseDTO(paymentService.findById(id));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Crear un nuevo pago
    @PostMapping("/")
    public ResponseEntity<Object> createPayment(@RequestBody requestPaymentDTO paymentDTO) {
        try {
            paymentService.save(paymentDTO);
            return new ResponseEntity<>("Registro guardado correctamente", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Actualizar un pago existente
    @PutMapping("/")
    public ResponseEntity<Object> updatePayment(@RequestBody requestPaymentDTO paymentDTO) {
        try {
            paymentService.update(paymentDTO);
            return new ResponseEntity<>("Registro actualizado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al actualizar el pago.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Eliminar un pago por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletePayment(@PathVariable("id") int id) {
        try {
            paymentService.delete(id);
            return new ResponseEntity<>("Registro eliminado correctamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error interno al eliminar el pago.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
