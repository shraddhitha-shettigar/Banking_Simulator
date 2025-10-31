package com.bank.model;

import jakarta.validation.constraints.*;

public class Account {
    private int accountId;
    private int customerId;  
    private String createdAt;
    private String modifiedAt;

    @Min(value = 50, message = "Minimum balance should be 50")
    private double balance = 50;

    @NotBlank(message = "Account type is required")
    private String accountType;

    @NotBlank(message = "Account name is required")
    private String accountName;

    @NotBlank(message = "Account number is required")
    @Pattern(regexp = "^[0-9]{12}$", message = "Account number must be 12 digits")
    private String accountNumber;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Phone number must be valid")
    private String phoneNumberLinked;

    @NotBlank(message = "IFSC code is required")
    @Pattern(regexp = "^[A-Z]{4}0[0-9A-Z]{6}$", message = "Invalid IFSC code format")
    private String ifscCode;

    @NotBlank(message = "Bank name is required")
    private String bankName;

    @NotBlank(message = "Aadhar number is required")
    @Pattern(regexp = "^[0-9]{12}$", message = "Aadhar number must be 12 digits")
    private String aadharNumber;

    private String status = "Active";

    
    public int getAccountId() { return accountId; }
    public void setAccountId(int accountId) { this.accountId = accountId; }

    public int getCustomerId() { return customerId; }
    public void setCustomerId(int customerId) { this.customerId = customerId; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getModifiedAt() { return modifiedAt; }
    public void setModifiedAt(String modifiedAt) { this.modifiedAt = modifiedAt; }

    public double getBalance() { return balance; }
    public void setBalance(double balance) { this.balance = balance; }

    public String getAccountType() { return accountType; }
    public void setAccountType(String accountType) { this.accountType = accountType; }

    public String getAccountName() { return accountName; }
    public void setAccountName(String accountName) { this.accountName = accountName; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public String getPhoneNumberLinked() { return phoneNumberLinked; }
    public void setPhoneNumberLinked(String phoneNumberLinked) { this.phoneNumberLinked = phoneNumberLinked; }

    public String getIfscCode() { return ifscCode; }
    public void setIfscCode(String ifscCode) { this.ifscCode = ifscCode; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getAadharNumber() { return aadharNumber; }
    public void setAadharNumber(String aadharNumber) { this.aadharNumber = aadharNumber; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
