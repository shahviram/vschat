package com.vsapp.vschat.service;

import com.vsapp.vschat.dto.LoginDTO;
import java.util.List;
import java.util.UUID;

public interface LoginService {
    List<LoginDTO> getAll();
    LoginDTO getById(UUID id);
    LoginDTO create(LoginDTO dto);
    LoginDTO update(UUID id, LoginDTO dto);
    void delete(UUID id);
}

