package com.vsapp.vschat.repositories;

import com.vsapp.vschat.domain.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface LoginRepository extends JpaRepository<Login, UUID> {
}

