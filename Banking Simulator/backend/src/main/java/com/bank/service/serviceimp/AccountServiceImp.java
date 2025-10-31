package com.bank.service.serviceimp;

import com.bank.model.Account;
import com.bank.repository.AccountRepository;
import com.bank.service.AccountService;

import java.sql.SQLException;
import java.util.List;

public class AccountServiceImp implements AccountService {

    private final AccountRepository repo;
    public AccountServiceImp() {
        this.repo = new AccountRepository();
    }
    public AccountServiceImp(AccountRepository repo) {
        this.repo = repo;
    }

    @Override
    public Account createAccount(Account account) {
        try {
            return repo.create(account);
        } catch (SQLException e) {
            String message = e.getMessage() != null ? e.getMessage().toLowerCase() : "";
            
            if (message.contains("duplicate entry") && message.contains("account_number")) {
                throw new IllegalArgumentException("Account with the same account number already exists", e);
            }

        
            if ((message.contains("foreign key") && message.contains("aadhar")) || message.contains("aadhar number not found")) {
                throw new IllegalArgumentException("Customer Aadhaar not found, cannot create account", e);
            }

          
            throw new RuntimeException(e.getMessage(), e);
        }
    }


    @Override
    public List<Account> getAllAccounts() {
        try {
            return repo.getAll();
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    @Override
    public Account getByAccountNumber(String accountNumber) {
        try {
            return repo.getByAccountNumber(accountNumber);
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    @Override
    public Account updateByAccountNumber(String accountNumber, Account account) {
        try {
            return repo.updateByAccountNumber(accountNumber, account);
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    @Override
    public boolean deleteByAccountNumber(String accountNumber) {
        try {
            return repo.deleteByAccountNumber(accountNumber);
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }
}
