package com.vsapp.vschat2.service.impl;

import com.vsapp.vschat2.domain.Login;
import com.vsapp.vschat2.dto.LoginDTO;
import com.vsapp.vschat2.repositories.LoginRepository;
import com.vsapp.vschat2.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private LoginRepository repository;

    private LoginDTO toDTO(Login entity) {
        LoginDTO dto = new LoginDTO();
        dto.setId(entity.getId());
        dto.setEmailId(entity.getEmailId());
        dto.setPassword(entity.getPassword());
        dto.setUserID(entity.getUserID());
        return dto;
    }

    private Login toEntity(LoginDTO dto) {
        Login entity = new Login();
        entity.setId(dto.getId());
        entity.setEmailId(dto.getEmailId());
        entity.setPassword(dto.getPassword());
        entity.setUserID(dto.getUserID());
        return entity;
    }

    @Override
    public List<LoginDTO> getAll() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public LoginDTO getById(UUID id) {
        return repository.findById(id).map(this::toDTO).orElse(null);
    }

    @Override
    public List<LoginDTO> authenticateLogin(LoginDTO dto) {
        return repository.findByEmailIdAndPassword(dto.getEmailId(), dto.getPassword())
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public LoginDTO create(LoginDTO dto) {
        Login entity = toEntity(dto);
        entity.setId(null); // Ensure new entity
        return toDTO(repository.save(entity));
    }

    @Override
    public LoginDTO update(UUID id, LoginDTO dto) {
        Login entity = repository.findById(id).orElse(null);
        if (entity == null) return null;
        entity.setEmailId(dto.getEmailId());
        entity.setPassword(dto.getPassword());
        return toDTO(repository.save(entity));
    }

    @Override
    public void delete(UUID id) {
        repository.deleteById(id);
    }
}
