package com.bank.service.serviceimp;

import com.bank.model.Transaction;
import com.bank.repository.TransactionRepository;
import com.bank.repository.AccountRepository;
import com.bank.service.TransactionService;
import com.bank.alert.NotificationService;

import java.sql.SQLException;
import java.util.List;

public class TransactionServiceImp implements TransactionService {

    private final TransactionRepository transactionRepo;
    private final AccountRepository accountRepo;

    public TransactionServiceImp() {
        this.transactionRepo = new TransactionRepository();
        this.accountRepo = new AccountRepository();
    }

    public TransactionServiceImp(TransactionRepository transactionRepo, AccountRepository accountRepo) {
        this.transactionRepo = transactionRepo;
        this.accountRepo = accountRepo;
    }

    @Override
    public Transaction makeTransaction(Transaction t) throws Exception {

        if (t.getSenderAccountNumber().equals(t.getReceiverAccountNumber())) {
            throw new IllegalArgumentException("Sender and receiver account numbers must be different");
        }

        String actualPin = accountRepo.getPinByAccountNumber(t.getSenderAccountNumber());
        if (!actualPin.equals(t.getPin())) {
            throw new IllegalArgumentException("Incorrect PIN");
        }

        double senderBalance = accountRepo.getBalance(t.getSenderAccountNumber());
        double receiverBalance = accountRepo.getBalance(t.getReceiverAccountNumber());

        if (senderBalance < t.getAmount()) {
            throw new IllegalArgumentException("Insufficient balance in sender account");
        }

        try {
            accountRepo.updateBalance(t.getSenderAccountNumber(), senderBalance - t.getAmount());
            accountRepo.updateBalance(t.getReceiverAccountNumber(), receiverBalance + t.getAmount());

            int id = transactionRepo.save(t);
            if (id <= 0) throw new Exception("Failed to record transaction");

            t.setTransactionId(id);

            
            try {
                NotificationService notifier = new NotificationService();

                
                String senderEmail = accountRepo.getEmailByAccountNumber(t.getSenderAccountNumber());
                String receiverEmail = accountRepo.getEmailByAccountNumber(t.getReceiverAccountNumber());

                notifier.sendEmailAlert(senderEmail,receiverEmail,t.getAmount(),t.getReceiverAccountNumber(),t.getSenderAccountNumber());
            } catch (Exception e) {
                System.out.println("Email notification failed: " + e.getMessage());
            }

            return t;

        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    @Override
    public List<Transaction> getTransactions(String accountNumber) throws Exception {
        try {
            return transactionRepo.getByAccountNumber(accountNumber);
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }
    
    @Override
    public List<Transaction> getAllTransactions() throws Exception {
        return transactionRepo.findAll(); 
    }

}
