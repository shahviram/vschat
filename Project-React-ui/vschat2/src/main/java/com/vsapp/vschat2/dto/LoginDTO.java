package com.vsapp.vschat2.dto;

import java.util.UUID;

public class LoginDTO {
    private UUID id;
    private String emailId;
    private String password;
    private UUID UserID;
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
        return "LoginDTO{" +
                "id=" + id +
                ", emailId='" + emailId + '\'' +
                ", password='" + password + '\'' +
                ", UserID=" + UserID +
                '}';
    }
}






