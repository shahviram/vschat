package com.vsapp.vschat.web.rest;

import com.vsapp.vschat.dto.RegisterUserDTO;
import com.vsapp.vschat.service.RegisterUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/register-users")
public class RegisterUserController {
    @Autowired
    private RegisterUserService service;

    @GetMapping
    public List<RegisterUserDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegisterUserDTO> getById(@PathVariable UUID id) {
        RegisterUserDTO dto = service.getById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public RegisterUserDTO create(@RequestBody RegisterUserDTO dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegisterUserDTO> update(@PathVariable UUID id, @RequestBody RegisterUserDTO dto) {
        RegisterUserDTO updated = service.update(id, dto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

