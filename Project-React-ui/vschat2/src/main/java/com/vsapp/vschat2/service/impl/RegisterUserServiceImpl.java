package com.vsapp.vschat2.service.impl;

import com.vsapp.vschat2.domain.RegisterUser;
import com.vsapp.vschat2.dto.RegisterUserDTO;
import com.vsapp.vschat2.repositories.RegisterUserRepository;
import com.vsapp.vschat2.service.RegisterUserService;
import com.vsapp.vschat2.repositories.LoginRepository;
import com.vsapp.vschat2.domain.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RegisterUserServiceImpl implements RegisterUserService {
    @Autowired
    private RegisterUserRepository repository;

    @Autowired
    private LoginRepository loginRepository;

    private RegisterUserDTO toDTO(RegisterUser entity) {
        RegisterUserDTO dto = new RegisterUserDTO();
        dto.setId(entity.getId());
        dto.setEmail(entity.getEmail());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setPassword(entity.getPassword());
        dto.setCountry(entity.getCountry());
        return dto;
    }

    private RegisterUser toEntity(RegisterUserDTO dto) {
        RegisterUser entity = new RegisterUser();
        entity.setId(dto.getId());
        entity.setEmail(dto.getEmail());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
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
        RegisterUserDTO savedDto = toDTO(repository.save(entity));
        // Create Login record
        Login login = new Login();
        login.setEmailId(dto.getEmail());
        login.setPassword(dto.getPassword());
        login.setUserID(savedDto.getId());
        loginRepository.save(login);
        return savedDto;
    }

    @Override
    public RegisterUserDTO update(UUID id, RegisterUserDTO dto) {
        RegisterUser entity = repository.findById(id).orElse(null);
        if (entity == null) return null;
        String oldEmail = entity.getEmail();
        entity.setEmail(dto.getEmail());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setPassword(dto.getPassword());
        entity.setCountry(dto.getCountry());
        RegisterUserDTO updatedDto = toDTO(repository.save(entity));
        // Update Login record
        Login login = loginRepository.findAll().stream()
            .filter(l -> l.getEmailId().equals(oldEmail))
            .findFirst().orElse(null);
        if (login != null) {
            login.setEmailId(dto.getEmail());
            login.setPassword(dto.getPassword());
            loginRepository.save(login);
        }
        return updatedDto;
    }

    @Override
    public void delete(UUID id) {
        RegisterUser entity = repository.findById(id).orElse(null);
        if (entity != null) {
            String email = entity.getEmail();
            repository.deleteById(id);
            // Delete Login record
            Login login = loginRepository.findAll().stream()
                .filter(l -> l.getEmailId().equals(email))
                .findFirst().orElse(null);
            if (login != null) {
                loginRepository.delete(login);
            }
        }
    }
}
