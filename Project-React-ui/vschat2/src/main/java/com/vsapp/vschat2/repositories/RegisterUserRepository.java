package com.vsapp.vschat2.repositories;

import com.vsapp.vschat2.domain.RegisterUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface RegisterUserRepository extends JpaRepository<RegisterUser, UUID> {
}

