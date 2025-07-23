package com.vsapp.vschat2.service;

import com.vsapp.vschat2.dto.RegisterUserDTO;
import java.util.List;
import java.util.UUID;

public interface RegisterUserService {
    List<RegisterUserDTO> getAll();
    RegisterUserDTO getById(UUID id);
    RegisterUserDTO create(RegisterUserDTO dto);
    RegisterUserDTO update(UUID id, RegisterUserDTO dto);
    void delete(UUID id);
}

