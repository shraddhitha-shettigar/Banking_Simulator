package com.bank.service;

import com.bank.model.Customer;
import java.util.List;

public interface CustomerService {
    Customer createCustomer(Customer customer) throws Exception;
    Customer getCustomerByAadhar(String aadharNumber) throws Exception;
    Customer updateCustomerByAadhar(String aadharNumber, Customer customer) throws Exception;
    boolean deleteCustomerByAadhar(String aadharNumber) throws Exception;
    List<Customer> getAllCustomers() throws Exception;
    
    Customer getCustomerByUserId(int userId) throws Exception;

}
