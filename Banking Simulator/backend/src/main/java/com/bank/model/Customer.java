package com.bank.model;

import jakarta.validation.constraints.*;

public class Customer {

    private int customerId;
    private int userId;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }


    @NotBlank(message = "Name cannot be blank")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Name must contain only letters and spaces")
    private String name;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Phone number must be 10 digits and start with 6/7/8/9")
    private String phoneNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Address is required")
    @Size(min = 5, max = 200, message = "Address length must be 5-200 chars")
    private String address;

    @NotBlank(message = "Customer PIN is required")
    @Pattern(regexp = "\\d{6}", message = "Customer PIN must be exactly 6 digits")
    private String customerPin;

    @NotBlank(message = "Aadhar number is required")
    @Pattern(regexp = "^[0-9]{12}$", message = "Aadhar number must be exactly 12 digits")
    private String aadharNumber;

    @NotBlank(message = "Date of birth is required (YYYY-MM-DD)")
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "DOB must be YYYY-MM-DD")
    private String dob;

    
    private String status = "Active";

   
    public int getCustomerId() { return customerId; }
    public void setCustomerId(int customerId) { this.customerId = customerId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCustomerPin() { return customerPin; }
    public void setCustomerPin(String customerPin) { this.customerPin = customerPin; }

    public String getAadharNumber() { return aadharNumber; }
    public void setAadharNumber(String aadharNumber) { this.aadharNumber = aadharNumber; }

    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }

    public String getStatus() { return status; }
    public void setStatus(String status) {
        this.status = (status == null || status.isBlank()) ? "Active" : status;
        
        
        
    }
}
