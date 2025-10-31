package com.bank.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class User {
    private int userId;

    @NotBlank
    @Size(max = 100)
    private String fullName;

    @NotBlank
    @Email
    @Size(max = 150)
    private String email;

    @NotBlank
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private String createdAt;

   
    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
