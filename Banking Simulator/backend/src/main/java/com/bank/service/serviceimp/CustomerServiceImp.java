package com.bank.service.serviceimp;

import com.bank.model.Customer;
import com.bank.repository.CustomerRepository;
import com.bank.service.CustomerService;

import java.util.List;
import java.util.Optional;

public class CustomerServiceImp implements CustomerService {

    private final CustomerRepository repo;

    public CustomerServiceImp() {
        this.repo = new CustomerRepository();
    }

    public CustomerServiceImp(CustomerRepository repo) {
        this.repo = repo;
    }

    @Override
    public Customer createCustomer(Customer customer) throws Exception {
        if (repo.existsByPhoneEmailOrAadhar(
                customer.getPhoneNumber(),
                customer.getEmail(),
                customer.getAadharNumber())) {
            throw new IllegalArgumentException("Customer with same phone/email/aadhar already exists");
        }
        int id = repo.insert(customer);
        if (id <= 0) throw new Exception("Failed to insert customer");
        customer.setCustomerId(id);
        return customer;
    }

    @Override
    public Customer getCustomerByAadhar(String aadharNumber) throws Exception {
        Optional<Customer> opt = repo.findByAadhar(aadharNumber);
        return opt.orElse(null);
    }

    @Override
    public Customer updateCustomerByAadhar(String aadharNumber, Customer customer) throws Exception {
        if (repo.existsByPhoneEmailOrAadharExcludingAadhar(
                customer.getPhoneNumber(),
                customer.getEmail(),
                customer.getAadharNumber(),
                aadharNumber)) {
            throw new IllegalArgumentException("Duplicate phone/email/aadhar for another record");
        }
        boolean ok = repo.updateByAadhar(aadharNumber, customer);
        if (!ok) return null;
        return repo.findByAadhar(aadharNumber).orElse(null);
    }

    @Override
    public boolean deleteCustomerByAadhar(String aadharNumber) throws Exception {
        return repo.deleteByAadhar(aadharNumber);
    }

    @Override
    public List<Customer> getAllCustomers() throws Exception {
        return repo.findAll();
    }
    
    @Override
    public Customer getCustomerByUserId(int userId) throws Exception {
        Optional<Customer> opt = repo.findByUserId(userId);
        return opt.orElse(null);
    }

}
