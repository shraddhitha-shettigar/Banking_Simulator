package com.bank.service;

import com.bank.model.Transaction;
import java.util.List;

public interface TransactionService {
    Transaction makeTransaction(Transaction t) throws Exception;
    List<Transaction> getTransactions(String accountNumber) throws Exception;
    List<Transaction> getAllTransactions() throws Exception;

}
