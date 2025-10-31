package com.bank.service.serviceimp;

import com.bank.model.Customer;
import com.bank.repository.CustomerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomerServiceImpTest {

    @Mock
    CustomerRepository repo;

    @InjectMocks
    CustomerServiceImp service;

    private Customer sampleCustomer() {
        Customer c = new Customer();
        c.setName("Shraddha");
        c.setPhoneNumber("9876543210");
        c.setEmail("shraddha@gmail.com");
        c.setAddress("Bengaluru");
        c.setCustomerPin("1234");
        c.setAadharNumber("111122223333");
        c.setDob("2004-01-01");
        return c;
    }

   
    @Test
    void createCustomer_success_setsIdAndReturns() throws Exception {
        Customer in = sampleCustomer();
        when(repo.existsByPhoneEmailOrAadhar(anyString(), anyString(), anyString())).thenReturn(false);
        when(repo.insert(any(Customer.class))).thenReturn(10);

        Customer out = service.createCustomer(in);

        assertNotNull(out);
        assertEquals(10, out.getCustomerId());
        verify(repo).insert(any(Customer.class));
    }

    @Test
    void createCustomer_duplicate_throwsIllegalArgument() throws Exception {
        Customer in = sampleCustomer();
        when(repo.existsByPhoneEmailOrAadhar(anyString(), anyString(), anyString())).thenReturn(true);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> service.createCustomer(in));
        assertTrue(ex.getMessage().toLowerCase().contains("already exists"));

        verify(repo, never()).insert(any());
    }

    
    @Test
    void getCustomerByAadhar_found_returnsCustomer() throws Exception {
        Customer c = sampleCustomer();
        when(repo.findByAadhar("111122223333")).thenReturn(Optional.of(c));

        Customer out = service.getCustomerByAadhar("111122223333");
        assertNotNull(out);
        assertEquals("111122223333", out.getAadharNumber());
    }

    @Test
    void getCustomerByAadhar_notFound_returnsNull() throws Exception {
        when(repo.findByAadhar("000011112222")).thenReturn(Optional.empty());

        Customer out = service.getCustomerByAadhar("000011112222");
        assertNull(out);
    }

    
    @Test
    void getAllCustomers_returnsList() throws Exception {
        Customer c = sampleCustomer();
        c.setCustomerId(1);
        List<Customer> list = Collections.singletonList(c);
        when(repo.findAll()).thenReturn(list);

        var out = service.getAllCustomers();
        assertNotNull(out);
        assertEquals(1, out.size());
    }

    
    @Test
    void updateCustomerByAadhar_duplicate_throwsIllegalArgument() throws Exception {
        Customer in = sampleCustomer();
        when(repo.existsByPhoneEmailOrAadharExcludingAadhar(anyString(), anyString(), anyString(), anyString()))
                .thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> service.updateCustomerByAadhar("111122223333", in));
        verify(repo, never()).updateByAadhar(anyString(), any());
    }

    
    @Test
    void deleteCustomerByAadhar_success_returnsTrue() throws Exception {
        when(repo.deleteByAadhar("111122223333")).thenReturn(true);
        boolean res = service.deleteCustomerByAadhar("111122223333");
        assertTrue(res);
        verify(repo).deleteByAadhar("111122223333");
    }
}
