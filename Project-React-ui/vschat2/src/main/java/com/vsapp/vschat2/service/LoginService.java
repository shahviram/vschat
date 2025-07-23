package com.vsapp.vschat2.service;

import com.vsapp.vschat2.dto.LoginDTO;
import java.util.List;
import java.util.UUID;

public interface LoginService {
    List<LoginDTO> getAll();
    LoginDTO getById(UUID id);

    List<LoginDTO> authenticateLogin(LoginDTO dto);

    LoginDTO create(LoginDTO dto);
    LoginDTO update(UUID id, LoginDTO dto);
    void delete(UUID id);
}

