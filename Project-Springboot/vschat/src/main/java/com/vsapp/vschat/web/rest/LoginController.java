package com.vsapp.vschat.web.rest;

import com.vsapp.vschat.dto.LoginDTO;
import com.vsapp.vschat.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/logins")
public class LoginController {
    @Autowired
    private LoginService service;

    @GetMapping
    public List<LoginDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoginDTO> getById(@PathVariable UUID id) {
        LoginDTO dto = service.getById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public LoginDTO create(@RequestBody LoginDTO dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoginDTO> update(@PathVariable UUID id, @RequestBody LoginDTO dto) {
        LoginDTO updated = service.update(id, dto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

