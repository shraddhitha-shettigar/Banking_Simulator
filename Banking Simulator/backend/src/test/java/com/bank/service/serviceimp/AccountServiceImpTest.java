package com.bank.service.serviceimp;

import com.bank.model.Account;
import com.bank.repository.AccountRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.SQLException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AccountServiceImpTest {

    @Mock
    AccountRepository repo;

    @InjectMocks
    AccountServiceImp service;

    private Account sampleAccount() {
        Account a = new Account();
        a.setAadharNumber("111122223333");
        a.setAccountName("Shraddha");
        a.setAccountNumber("123456789012");
        a.setAccountType("SAVINGS");
        a.setBalance(600);
        a.setIfscCode("HDFC0123456");
        a.setBankName("HDFC Bank");
        a.setPhoneNumberLinked("9876543210");
        return a;
    }

    @Test
    void createAccount_success_returnsAccountWithId() throws Exception {
        Account in = sampleAccount();
        
        when(repo.create(any(Account.class))).thenAnswer(inv -> {
            Account a = inv.getArgument(0);
            a.setAccountId(11);
            a.setCustomerId(5);
            return a;
        });

        Account out = service.createAccount(in);
        assertNotNull(out);
        assertEquals(11, out.getAccountId());
        assertEquals(5, out.getCustomerId());
        verify(repo).create(any(Account.class));
    }

    @Test
    void createAccount_aadharNotFound_throwsIllegalArgument() throws Exception {
        Account in = sampleAccount();
        when(repo.create(any(Account.class))).thenThrow(new SQLException("Aadhar number not found in Customer table"));

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> service.createAccount(in));
        assertEquals("Customer Aadhaar not found, cannot create account",ex.getMessage());
    }

    @Test
    void createAccount_duplicateAccountNumber_throwsIllegalArgument() throws Exception {
        AccountRepository mockRepo = mock(AccountRepository.class);
        AccountServiceImp service = new AccountServiceImp(mockRepo);

        Account account = new Account();
        account.setAccountNumber("123");

        
        when(mockRepo.create(any(Account.class)))
                .thenThrow(new SQLException("Duplicate entry '123' for key 'account.account_number'"));

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
            () -> service.createAccount(account));

        assertEquals("Account with the same account number already exists", ex.getMessage());
    }



    @Test
    void getAllAccounts_returnsList() throws Exception {
        Account a = sampleAccount(); a.setAccountId(1);
        List<Account> list = Collections.singletonList(a);
        when(repo.getAll()).thenReturn(list);

        List<Account> out = service.getAllAccounts();
        assertEquals(1, out.size());
    }

    @Test
    void getByAccountNumber_found_returnsAccount() throws Exception {
        Account a = sampleAccount(); a.setAccountId(2);
        when(repo.getByAccountNumber("123456789012")).thenReturn(a);

        Account out = service.getByAccountNumber("123456789012");
        assertNotNull(out);
        assertEquals(2, out.getAccountId());
    }

    @Test
    void updateByAccountNumber_notFound_returnsNull() throws Exception {
        Account in = sampleAccount();
        when(repo.updateByAccountNumber(eq("nonexist"), any(Account.class))).thenReturn(null);
        Account out = service.updateByAccountNumber("nonexist", in);
        assertNull(out);
    }

    @Test
    void deleteByAccountNumber_success_true() throws Exception {
        when(repo.deleteByAccountNumber("123456789012")).thenReturn(true);
        boolean out = service.deleteByAccountNumber("123456789012");
        assertTrue(out);
    }
}
