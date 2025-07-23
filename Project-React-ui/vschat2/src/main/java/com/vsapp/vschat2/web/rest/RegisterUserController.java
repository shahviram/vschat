package com.vsapp.vschat2.web.rest;

import com.vsapp.vschat2.dto.RegisterUserDTO;
import com.vsapp.vschat2.service.RegisterUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
//@Validated
public class RegisterUserController {
    @Autowired
    private RegisterUserService registerUserService;

    @GetMapping
    public List<RegisterUserDTO> getAllUsers() {
        List<RegisterUserDTO> users = registerUserService.getAll();
        users.forEach(u -> u.setPassword(null));
        return users;
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegisterUserDTO> getUserById(@PathVariable UUID id) {
        RegisterUserDTO user = registerUserService.getById(id);
        if (user == null) return ResponseEntity.notFound().build();
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable UUID id, @RequestBody RegisterUserDTO dto) {
        RegisterUserDTO existing = registerUserService.getById(id);
        if (existing == null) return ResponseEntity.notFound().build();
        existing.setFirstName(dto.getFirstName());
        existing.setLastName(dto.getLastName());
        existing.setEmail(dto.getEmail());
        RegisterUserDTO updated = registerUserService.update(id, existing);
        updated.setPassword(null);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable UUID id) {
        RegisterUserDTO existing = registerUserService.getById(id);
        if (existing == null) return ResponseEntity.notFound().build();
        registerUserService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<RegisterUserDTO> createUser(@RequestBody RegisterUserDTO dto) {
        RegisterUserDTO created = registerUserService.create(dto);
        created.setPassword(null);
        return ResponseEntity.ok(created);
    }
}
