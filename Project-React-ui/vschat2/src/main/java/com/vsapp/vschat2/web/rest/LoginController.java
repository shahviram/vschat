package com.vsapp.vschat2.web.rest;

import com.vsapp.vschat2.dto.Authresponse;
import com.vsapp.vschat2.dto.LoginDTO;
import com.vsapp.vschat2.dto.RegisterUserDTO;
import com.vsapp.vschat2.service.LoginService;
import com.vsapp.vschat2.service.RegisterUserService;
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
    @Autowired
    private RegisterUserService registerUserService;

    @GetMapping
    public List<LoginDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoginDTO> getById(@PathVariable UUID id) {
        LoginDTO dto = service.getById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping("/auth")
    public ResponseEntity<Authresponse> getById(@RequestBody LoginDTO loginDto) {
        List<LoginDTO> dto = service.authenticateLogin(loginDto);
        if (dto == null || dto.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        LoginDTO login = dto.get(0);
        UUID userId = login.getUserID();
        RegisterUserDTO userDto = registerUserService.getById(userId);
        if (userDto == null) {
            return ResponseEntity.notFound().build();
        }
        Authresponse authresponse = new Authresponse();
        // From LoginDTO
        authresponse.setId(login.getId());
        authresponse.setEmailId(login.getEmailId());
        authresponse.setPassword(login.getPassword());
        authresponse.setUserID(login.getUserID());

        // From RegisterUserDTO
        authresponse.setFirstName(userDto.getFirstName());
        authresponse.setLastName(userDto.getLastName());
        authresponse.setCountry(userDto.getCountry());

        return ResponseEntity.ok(authresponse);
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
