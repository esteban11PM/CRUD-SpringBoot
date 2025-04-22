package com.sena.crud_basic.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.requestPaymentDTO;
import com.sena.crud_basic.DTO.responsePaymentDTO;
import com.sena.crud_basic.interfaces.IClient;
import com.sena.crud_basic.interfaces.IPayment;
import com.sena.crud_basic.model.Payment;

@Service
public class PaymentService {
    @Autowired
    private IPayment paymentRepository;

    @Autowired
    private IClient clientRepository;

    // Obtener todos los pagos (como DTO de respuesta)
    public List<responsePaymentDTO> findAllPayments() {
        return paymentRepository.findAll()
            .stream()
            .map(this::convertToResponseDTO)
            .collect(Collectors.toList());
    }

    // Buscar pago por ID
    public Payment findById(int id) {
        return paymentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("El pago con ID " + id + " no existe."));
    }

    // Guardar nuevo pago
    public void save(requestPaymentDTO dto) {
        Payment payment = convertToEntity(dto);
        paymentRepository.save(payment);
    }

    // Actualizar pago existente
    public Payment update(requestPaymentDTO dto) {
        Payment existing = this.findById(dto.getId_payment());
        
        com.sena.crud_basic.model.Client client = clientRepository.findById(dto.getClient_id())
            .orElseThrow(() -> new RuntimeException("Cliente con ID " + dto.getClient_id() + " no existe."));

        existing.setAmount(dto.getAmount());
        existing.setPayment_date(dto.getPayment_date());
        existing.setPayment_method(dto.getPayment_method());
        existing.setClient_id(client);
        
        return paymentRepository.save(existing);
    }

    // Eliminar pago
    public void delete(int id) {
        Payment payment = this.findById(id);
        paymentRepository.delete(payment);
    }

    // Convertir de DTO a entidad
    public Payment convertToEntity(requestPaymentDTO dto) {
        com.sena.crud_basic.model.Client client = clientRepository.findById(dto.getClient_id())
            .orElseThrow(() -> new RuntimeException("Cliente con ID " + dto.getClient_id() + " no existe."));

        return new Payment(
            dto.getId_payment(),
            client,
            dto.getAmount(),
            dto.getPayment_date(),
            dto.getPayment_method()
        );
    }

    // Convertir de entidad a DTO de respuesta
    public responsePaymentDTO convertToResponseDTO(Payment payment) {
        String fullName = payment.getClient_id().getFirst_name() + " " + payment.getClient_id().getLast_name();
        
        return new responsePaymentDTO(
            payment.getId_payment(),
            fullName,
            payment.getAmount(),
            payment.getPayment_date(),
            payment.getPayment_method()
        );
    }
}
