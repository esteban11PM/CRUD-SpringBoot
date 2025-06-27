package com.sena.crud_basic.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.requestRatingDTO;
import com.sena.crud_basic.DTO.responseRatingDTO;
import com.sena.crud_basic.interfaces.IClass;
import com.sena.crud_basic.interfaces.IClient;
import com.sena.crud_basic.interfaces.IRatings;
import com.sena.crud_basic.model.Client;
import com.sena.crud_basic.model.Ratings;

@Service
public class RatingService {
    @Autowired
    private IRatings ratingsRepository;

    @Autowired
    private IClient clientRepository;

    @Autowired
    private IClass classRepository;

    // GET all
    public List<responseRatingDTO> findAllRatings() {
        return ratingsRepository.findAll()
            .stream()
            .map(this::convertToResponseDTO)
            .collect(Collectors.toList());
    }

    // GET entity by ID
    public Ratings findByIdEntity(int id) {
        return ratingsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Rating con ID " + id + " no existe."));
    }

    // GET DTO by ID
    public responseRatingDTO findById(int id) {
        return convertToResponseDTO(findByIdEntity(id));
    }

    // POST
    public void save(requestRatingDTO dto) {
        ratingsRepository.save(convertToEntity(dto));
    }

    // PUT
    public Ratings update(requestRatingDTO dto) {
        Ratings existing = findByIdEntity(dto.getId_ratigs());

        Client client = clientRepository.findById(dto.getClient_id())
            .orElseThrow(() -> new RuntimeException("Cliente con ID " + dto.getClient_id() + " no existe."));
        com.sena.crud_basic.model.Class cls = classRepository.findById(dto.getClass_id())
            .orElseThrow(() -> new RuntimeException("Clase con ID " + dto.getClass_id() + " no existe."));

        existing.setClient_id(client);
        existing.setClass_id(cls);
        existing.setRating(dto.getRating());
        existing.setComment(dto.getComment());
        existing.setRating_date(dto.getRating_date());

        return ratingsRepository.save(existing);
    }

    // DELETE
    public void delete(int id) {
        Ratings r = findByIdEntity(id);
        ratingsRepository.delete(r);
    }

    // Convert DTO → Entity
    public Ratings convertToEntity(requestRatingDTO dto) {
        Client client = clientRepository.findById(dto.getClient_id())
            .orElseThrow(() -> new RuntimeException("Cliente con ID " + dto.getClient_id() + " no existe."));
        com.sena.crud_basic.model.Class cls = classRepository.findById(dto.getClass_id())
            .orElseThrow(() -> new RuntimeException("Clase con ID " + dto.getClass_id() + " no existe."));

        return new Ratings(
            dto.getId_ratigs(),
            client,
            cls,
            dto.getRating(),
            dto.getComment(),
            dto.getRating_date()
        );
    }

    // Convert Entity → DTO
    public responseRatingDTO convertToResponseDTO(Ratings rating) {
        String clientName = rating.getClient_id().getFirst_name()
                            + " " + rating.getClient_id().getLast_name();
        String classType  = rating.getClass_id().getType();

        return new responseRatingDTO(
            rating.getId_ratigs(),
            clientName,
            classType,
            rating.getRating(),
            rating.getComment(),
            rating.getRating_date()
        );
    }

}
