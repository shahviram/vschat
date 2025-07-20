package com.vsapp.vschat.repositories;

import com.vsapp.vschat.domain.RegisterUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface RegisterUserRepository extends JpaRepository<RegisterUser, UUID> {
}

