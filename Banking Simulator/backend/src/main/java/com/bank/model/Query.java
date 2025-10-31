package com.bank.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class Query {
    private int queryId;

    @NotBlank(message = "Name is required")
    @Size(max = 100)
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 150)
    private String email;

    @NotBlank(message = "Message is required")
    private String message;
    
    public int getQueryId() { return queryId; }
    public void setQueryId(int queryId) { this.queryId = queryId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
