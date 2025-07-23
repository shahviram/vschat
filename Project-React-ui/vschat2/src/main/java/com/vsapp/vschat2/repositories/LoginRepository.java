package com.vsapp.vschat2.repositories;

import com.vsapp.vschat2.domain.Login;
import com.vsapp.vschat.dto.LoginDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LoginRepository extends JpaRepository<Login, UUID> {

    List<Login> findByEmailIdAndPassword(String emailId, String password);
}

