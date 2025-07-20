package com.vsapp.vschat.service.impl;

import com.vsapp.vschat.domain.RegisterUser;
import com.vsapp.vschat.dto.RegisterUserDTO;
import com.vsapp.vschat.repositories.RegisterUserRepository;
import com.vsapp.vschat.service.RegisterUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RegisterUserServiceImpl implements RegisterUserService {
    @Autowired
    private RegisterUserRepository repository;

    private RegisterUserDTO toDTO(RegisterUser entity) {
        RegisterUserDTO dto = new RegisterUserDTO();
        dto.setId(entity.getId());
        dto.setEmail(entity.getEmail());
        dto.setFirstname(entity.getFirstname());
        dto.setLastname(entity.getLastname());
        dto.setPassword(entity.getPassword());
        dto.setCountry(entity.getCountry());
        return dto;
    }

    private RegisterUser toEntity(RegisterUserDTO dto) {
        RegisterUser entity = new RegisterUser();
        entity.setId(dto.getId());
        entity.setEmail(dto.getEmail());
        entity.setFirstname(dto.getFirstname());
        entity.setLastname(dto.getLastname());
        entity.setPassword(dto.getPassword());
        entity.setCountry(dto.getCountry());
        return entity;
    }

    @Override
    public List<RegisterUserDTO> getAll() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public RegisterUserDTO getById(UUID id) {
        return repository.findById(id).map(this::toDTO).orElse(null);
    }

    @Override
    public RegisterUserDTO create(RegisterUserDTO dto) {
        RegisterUser entity = toEntity(dto);
        entity.setId(null); // Ensure new entity
        return toDTO(repository.save(entity));
    }

    @Override
    public RegisterUserDTO update(UUID id, RegisterUserDTO dto) {
        RegisterUser entity = repository.findById(id).orElse(null);
        if (entity == null) return null;
        entity.setEmail(dto.getEmail());
        entity.setFirstname(dto.getFirstname());
        entity.setLastname(dto.getLastname());
        entity.setPassword(dto.getPassword());
        entity.setCountry(dto.getCountry());
        return toDTO(repository.save(entity));
    }

    @Override
    public void delete(UUID id) {
        repository.deleteById(id);
    }
}

