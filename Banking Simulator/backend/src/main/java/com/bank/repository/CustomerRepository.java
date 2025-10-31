package com.bank.repository;

import config.DBConfig;
import com.bank.model.Customer;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class CustomerRepository {

    public int insert(Customer c) throws SQLException {
        //String sql = "INSERT INTO Customer (name, phoneNumber, email, address, customer_pin, aadhar_number, dob, status) " +
                     //"VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    	
    	String sql = "INSERT INTO Customer (name, phoneNumber, email, address, customer_pin, aadhar_number, dob, status, user_id) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            ps.setString(1, c.getName());
            ps.setString(2, c.getPhoneNumber());
            ps.setString(3, c.getEmail());
            ps.setString(4, c.getAddress());
            ps.setString(5, c.getCustomerPin());
            ps.setString(6, c.getAadharNumber());
            ps.setDate(7, Date.valueOf(c.getDob()));
            ps.setString(8, c.getStatus());
            ps.setInt(9, c.getUserId());

            int affected = ps.executeUpdate();
            if (affected == 0) return -1;
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) return rs.getInt(1);
            }
            return -1;
        }
    }

    
    public Optional<Customer> findByAadhar(String aadharNumber) throws SQLException {
        String sql = "SELECT * FROM Customer WHERE aadhar_number = ?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, aadharNumber);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return Optional.of(map(rs));
            }
        }
        return Optional.empty();
    }

    public List<Customer> findAll() throws SQLException {
        List<Customer> list = new ArrayList<>();
        String sql = "SELECT * FROM Customer";
        try (Connection conn = DBConfig.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) list.add(map(rs));
        }
        return list;
    }

   
    public boolean updateByAadhar(String aadharNumber, Customer c) throws SQLException {
        String sql = "UPDATE Customer SET name=?, phoneNumber=?, email=?, address=?, customer_pin=?, aadhar_number=?, dob=?, status=? WHERE aadhar_number=?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, c.getName());
            ps.setString(2, c.getPhoneNumber());
            ps.setString(3, c.getEmail());
            ps.setString(4, c.getAddress());
            ps.setString(5, c.getCustomerPin());
            ps.setString(6, c.getAadharNumber());
            ps.setDate(7, Date.valueOf(c.getDob()));
            ps.setString(8, c.getStatus());
            ps.setString(9, aadharNumber);
            return ps.executeUpdate() > 0;
        }
    }

   
    public boolean deleteByAadhar(String aadharNumber) throws SQLException {
        String sql = "DELETE FROM Customer WHERE aadhar_number = ?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, aadharNumber);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean existsByPhoneEmailOrAadhar(String phone, String email, String aadhar) throws SQLException {
        String sql = "SELECT 1 FROM Customer WHERE phoneNumber = ? OR LOWER(email) = LOWER(?) OR aadhar_number = ? LIMIT 1";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, phone);
            ps.setString(2, email);
            ps.setString(3, aadhar);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next();
            }
        }
    }

    public boolean existsByPhoneEmailOrAadharExcludingAadhar(String phone, String email, String aadhar, String excludeAadhar) throws SQLException {
        String sql = "SELECT 1 FROM Customer WHERE (phoneNumber = ? OR LOWER(email) = LOWER(?) OR aadhar_number = ?) AND aadhar_number <> ? LIMIT 1";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, phone);
            ps.setString(2, email);
            ps.setString(3, aadhar);
            ps.setString(4, excludeAadhar);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next();
            }
        }
    }

    private Customer map(ResultSet rs) throws SQLException {
        Customer c = new Customer();
        c.setCustomerId(rs.getInt("customer_id"));
        c.setName(rs.getString("name"));
        c.setPhoneNumber(rs.getString("phoneNumber"));
        c.setEmail(rs.getString("email"));
        c.setAddress(rs.getString("address"));
        c.setCustomerPin(rs.getString("customer_pin"));
        c.setAadharNumber(rs.getString("aadhar_number"));
        Date d = rs.getDate("dob");
        if (d != null) c.setDob(d.toString());
        c.setStatus(rs.getString("status"));
        return c;
    }
    
    public Optional<Customer> findByUserId(int userId) throws SQLException {
        String sql = "SELECT * FROM Customer WHERE user_id = ?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return Optional.of(map(rs));
            }
        }
        return Optional.empty();
    }

}
