package com.bank.repository;

import com.bank.model.Account;
import config.DBConfig;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AccountRepository {

    public Account create(Account account) throws SQLException {
        try (Connection conn = DBConfig.getConnection()) {

            String fetchCustomer = "SELECT customer_id FROM Customer WHERE aadhar_number=?";
            int customerId = -1;

            try (PreparedStatement ps = conn.prepareStatement(fetchCustomer)) {
                ps.setString(1, account.getAadharNumber());
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    customerId = rs.getInt("customer_id");
                }
            }

            if (customerId == -1) {
                throw new SQLException("Aadhar number not found in Customer table");
            }

            String insertSql = "INSERT INTO Account (customer_id, aadhar_number, balance, account_type, " +
                    "account_name, account_number, phone_number_linked, ifsc_code, bank_name, status) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            try (PreparedStatement ps = conn.prepareStatement(insertSql, Statement.RETURN_GENERATED_KEYS)) {
                ps.setInt(1, customerId);
                ps.setString(2, account.getAadharNumber());
                ps.setDouble(3, account.getBalance());
                ps.setString(4, account.getAccountType());
                ps.setString(5, account.getAccountName());
                ps.setString(6, account.getAccountNumber());
                ps.setString(7, account.getPhoneNumberLinked());
                ps.setString(8, account.getIfscCode());
                ps.setString(9, account.getBankName());
                ps.setString(10, account.getStatus());

                ps.executeUpdate();

                ResultSet keys = ps.getGeneratedKeys();
                if (keys.next()) {
                    account.setAccountId(keys.getInt(1));
                    account.setCustomerId(customerId);
                }
            }
        }
        return account;
    }

    public List<Account> getAll() throws SQLException {
        List<Account> list = new ArrayList<>();
        try (Connection conn = DBConfig.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM Account")) {

            while (rs.next()) {
                list.add(mapRow(rs));
            }
        }
        return list;
    }

    public Account getByAccountNumber(String accountNumber) throws SQLException {
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM Account WHERE account_number=?")) {
            ps.setString(1, accountNumber);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return mapRow(rs);
            }
        }
        return null;
    }

    public Account updateByAccountNumber(String accountNumber, Account account) throws SQLException {
        try (Connection conn = DBConfig.getConnection()) {
            String sql = "UPDATE Account SET balance=?, account_type=?, account_name=?, phone_number_linked=?, " +
                    "ifsc_code=?, bank_name=?, status=? WHERE account_number=?";

            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setDouble(1, account.getBalance());
                ps.setString(2, account.getAccountType());
                ps.setString(3, account.getAccountName());
                ps.setString(4, account.getPhoneNumberLinked());
                ps.setString(5, account.getIfscCode());
                ps.setString(6, account.getBankName());
                ps.setString(7, account.getStatus());
                ps.setString(8, accountNumber);

                int updated = ps.executeUpdate();
                if (updated > 0) {
                    return getByAccountNumber(accountNumber);
                }
            }
        }
        return null;
    }

    public boolean deleteByAccountNumber(String accountNumber) throws SQLException {
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement("DELETE FROM Account WHERE account_number=?")) {
            ps.setString(1, accountNumber);
            return ps.executeUpdate() > 0;
        }
    }

    private Account mapRow(ResultSet rs) throws SQLException {
        Account acc = new Account();
        acc.setAccountId(rs.getInt("account_id"));
        acc.setCustomerId(rs.getInt("customer_id"));
        acc.setAadharNumber(rs.getString("aadhar_number"));
        acc.setBalance(rs.getDouble("balance"));
        acc.setAccountType(rs.getString("account_type"));
        acc.setAccountName(rs.getString("account_name"));
        acc.setAccountNumber(rs.getString("account_number"));
        acc.setPhoneNumberLinked(rs.getString("phone_number_linked"));
        acc.setIfscCode(rs.getString("ifsc_code"));
        acc.setBankName(rs.getString("bank_name"));
        acc.setStatus(rs.getString("status"));
        acc.setCreatedAt(rs.getString("created_at"));
        acc.setModifiedAt(rs.getString("modified_at"));
        return acc;
    }

    
    public double getBalance(String accountNumber) throws SQLException {
        String sql = "SELECT balance FROM Account WHERE account_number = ?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, accountNumber);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getDouble("balance");
                } else {
                    throw new SQLException("Account not found for number: " + accountNumber);
                }
            }
        }
    }


    public boolean updateBalance(String accountNumber, double newBalance) throws SQLException {
        String sql = "UPDATE Account SET balance = ? WHERE account_number = ?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setDouble(1, newBalance);
            ps.setString(2, accountNumber);
            return ps.executeUpdate() > 0;
        }
    }
    public String getPinByAccountNumber(String accountNumber) throws SQLException {
        String sql = "SELECT c.customer_pin FROM Customer c " +
                     "JOIN Account a ON c.customer_id = a.customer_id " +
                     "WHERE a.account_number = ?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, accountNumber);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getString("customer_pin");
                } else {
                    throw new SQLException("No customer found for given account number");
                }
            }
        }
    }
    
    public String getEmailByAccountNumber(String accountNumber) throws SQLException {
        String sql = "SELECT c.email FROM Customer c JOIN Account a ON c.customer_id = a.customer_id WHERE a.account_number = ?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, accountNumber);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getString("email");
                }
            }
        }
        throw new SQLException("Email not found for account: " + accountNumber);
    }
    
    public String getCustomerNameByAccountNumber(String accountNumber) throws SQLException {
        String sql = "SELECT c.name FROM Customer c " +
                     "JOIN Account a ON c.customer_id = a.customer_id " +
                     "WHERE a.account_number = ?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, accountNumber);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getString("name");
                }
            }
        }
        throw new SQLException("Customer name not found for account: " + accountNumber);
    }

}
