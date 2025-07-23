package com.vsapp.vschat2.dto;

import com.vsapp.vschat2.domain.Country;
import java.util.UUID;

public class RegisterUserDTO {
    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private Country country;
    // Getters and setters
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Country getCountry() {
        return country;
    }
    public void setCountry(Country country) {
        this.country = country;
    }
    @Override
    public String toString() {
        return "RegisterUserDTO{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", firstname='" + firstName + '\'' +
                ", lastname='" + lastName + '\'' +
                ", country=" + country +
                '}';
    }
}

