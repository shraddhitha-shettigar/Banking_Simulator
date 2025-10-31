package com.bank.service.serviceimp;

import com.bank.model.Transaction;
import com.bank.repository.AccountRepository;
import com.bank.repository.TransactionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.SQLException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TransactionServiceImpTest {

    @Mock
    TransactionRepository transactionRepo;

    @Mock
    AccountRepository accountRepo;

    @InjectMocks
    TransactionServiceImp service;

    private Transaction sampleTransaction() {
        Transaction t = new Transaction();
        t.setSenderAccountNumber("123456789012");
        t.setReceiverAccountNumber("987654321098");
        t.setAmount(500.0);
        t.setDescription("Money Transfer");
        t.setPin("123456");
        return t;
    }

    @Test
    void makeTransaction_success() throws Exception {
        Transaction t = sampleTransaction();

        when(accountRepo.getPinByAccountNumber("123456789012")).thenReturn("123456"); 
        when(accountRepo.getBalance("123456789012")).thenReturn(1000.0);
        when(accountRepo.getBalance("987654321098")).thenReturn(200.0);
        when(transactionRepo.save(any(Transaction.class))).thenReturn(10);

        Transaction out = service.makeTransaction(t);

        assertNotNull(out);
        assertEquals(10, out.getTransactionId());
        verify(accountRepo).updateBalance("123456789012", 500.0);
        verify(accountRepo).updateBalance("987654321098", 700.0);
        verify(transactionRepo).save(any(Transaction.class));
    }

    @Test
    void makeTransaction_sameAccount_throwsIllegalArgument() {
        Transaction t = sampleTransaction();
        t.setReceiverAccountNumber(t.getSenderAccountNumber());

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> service.makeTransaction(t));
        assertTrue(ex.getMessage().toLowerCase().contains("must be different"));
    }

    @Test
    void makeTransaction_incorrectPin_throwsIllegalArgument() throws Exception {
        Transaction t = sampleTransaction();
        when(accountRepo.getPinByAccountNumber("123456789012")).thenReturn("999999"); 

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> service.makeTransaction(t));
        assertTrue(ex.getMessage().toLowerCase().contains("incorrect"));
    }

    @Test
    void makeTransaction_insufficientBalance_throwsIllegalArgument() throws Exception {
        Transaction t = sampleTransaction();
        when(accountRepo.getPinByAccountNumber("123456789012")).thenReturn("123456"); 
        when(accountRepo.getBalance("123456789012")).thenReturn(100.0);
        when(accountRepo.getBalance("987654321098")).thenReturn(200.0);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> service.makeTransaction(t));
        assertTrue(ex.getMessage().toLowerCase().contains("insufficient"));
        verify(transactionRepo, never()).save(any());
    }

    @Test
    void makeTransaction_dbError_throwsException() throws Exception {
        Transaction t = sampleTransaction();
        when(accountRepo.getPinByAccountNumber("123456789012")).thenReturn("123456"); 
        when(accountRepo.getBalance("123456789012")).thenReturn(2000.0);
        when(accountRepo.getBalance("987654321098")).thenReturn(1000.0);
        when(transactionRepo.save(any(Transaction.class))).thenThrow(new SQLException("DB Error"));

        RuntimeException ex = assertThrows(RuntimeException.class, () -> service.makeTransaction(t));
        assertTrue(ex.getMessage().toLowerCase().contains("db error"));
    }

    @Test
    void getTransactions_success_returnsList() throws Exception {
        Transaction t = sampleTransaction();
        t.setTransactionId(1);
        List<Transaction> list = Collections.singletonList(t);

        when(transactionRepo.getByAccountNumber("123456789012")).thenReturn(list);

        List<Transaction> out = service.getTransactions("123456789012");

        assertNotNull(out);
        assertEquals(1, out.size());
        assertEquals(1, out.get(0).getTransactionId());
    }

    @Test
    void getTransactions_sqlError_throwsRuntimeException() throws Exception {
        when(transactionRepo.getByAccountNumber(anyString())).thenThrow(new SQLException("DB fail"));

        RuntimeException ex = assertThrows(RuntimeException.class, () -> service.getTransactions("123456789012"));
        assertTrue(ex.getMessage().toLowerCase().contains("db fail"));
    }
}
