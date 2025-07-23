package com.vsapp.vschat2.domain;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "login")
public class Login {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "UserID", nullable = false, unique = true)
    private UUID UserID;

    @Column(nullable = false, unique = true)
    private String emailId;

    @Column(nullable = false)
    private String password;

    // Getters and setters
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getEmailId() {
        return emailId;
    }
    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public UUID getUserID() {
        return UserID;
    }
    public void setUserID(UUID userID) {
        UserID = userID;
    }

    @Override
    public String toString() {
        return "Login{" +
                "id=" + id +
                ", emailId='" + emailId + '\'' +
                ", password='" + password + '\'' +
                ", UserID=" + UserID +
                '}';
    }
}

