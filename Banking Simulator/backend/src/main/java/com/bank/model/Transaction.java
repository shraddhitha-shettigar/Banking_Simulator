package com.bank.model;

import jakarta.validation.constraints.*;

public class Transaction {

    private int transactionId;

    @NotBlank(message = "Sender account number is required")
    private String senderAccountNumber;

    @NotBlank(message = "Receiver account number is required")
    private String receiverAccountNumber;

    @Positive(message = "Amount must be greater than zero")
    private double amount;

    private String description;

    private String transactionTime;

    @NotBlank(message = "Please enter pin")
    @Pattern(regexp = "\\d{6}", message = "Please enter correct pin")
    private String pin;



    public int getTransactionId() { return transactionId; }
    public void setTransactionId(int transactionId) { this.transactionId = transactionId; }

    public String getSenderAccountNumber() { return senderAccountNumber; }
    public void setSenderAccountNumber(String senderAccountNumber) { this.senderAccountNumber = senderAccountNumber; }

    public String getReceiverAccountNumber() { return receiverAccountNumber; }
    public void setReceiverAccountNumber(String receiverAccountNumber) { this.receiverAccountNumber = receiverAccountNumber; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getTransactionTime() { return transactionTime; }
    public void setTransactionTime(String transactionTime) { this.transactionTime = transactionTime; }

    public String getPin() { return pin; }
    public void setPin(String pin) { this.pin = pin; }
}
