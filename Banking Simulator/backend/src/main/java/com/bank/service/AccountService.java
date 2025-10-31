package com.bank.service;

import com.bank.model.Account;

import java.util.List;

public interface AccountService {
    Account createAccount(Account account);
    List<Account> getAllAccounts();
    Account getByAccountNumber(String accountNumber);
    Account updateByAccountNumber(String accountNumber, Account account);
    boolean deleteByAccountNumber(String accountNumber);
}
