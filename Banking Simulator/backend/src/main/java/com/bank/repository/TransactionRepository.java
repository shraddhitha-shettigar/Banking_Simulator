package com.bank.repository;

import com.bank.model.Transaction;
import config.DBConfig;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TransactionRepository {

    public int save(Transaction t) throws SQLException {
        String sql = "INSERT INTO Transaction (sender_account_number, receiver_account_number, amount, description, transaction_time) " +
                     "VALUES (?, ?, ?, ?, NOW())";

        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            ps.setString(1, t.getSenderAccountNumber());
            ps.setString(2, t.getReceiverAccountNumber());
            ps.setDouble(3, t.getAmount());
            ps.setString(4, t.getDescription());

            int affected = ps.executeUpdate();
            if (affected == 0) return -1;

            int generatedId = -1;

            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) {
                    generatedId = rs.getInt(1);
                }
            }

          
            if (generatedId > 0) {
                String fetchSql = "SELECT transaction_time FROM Transaction WHERE transaction_id = ?";
                try (PreparedStatement fetchPs = conn.prepareStatement(fetchSql)) {
                    fetchPs.setInt(1, generatedId);
                    try (ResultSet rs = fetchPs.executeQuery()) {
                        if (rs.next()) {
                            t.setTransactionTime(rs.getString("transaction_time"));
                        }
                    }
                }
            }

            return generatedId;
        }
    }

    public List<Transaction> getByAccountNumber(String accountNumber) throws SQLException {
        String sql = "SELECT * FROM Transaction WHERE sender_account_number = ? OR receiver_account_number = ? ORDER BY transaction_time DESC";
        List<Transaction> list = new ArrayList<>();

        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, accountNumber);
            ps.setString(2, accountNumber);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Transaction t = new Transaction();
                    t.setTransactionId(rs.getInt("transaction_id"));
                    t.setSenderAccountNumber(rs.getString("sender_account_number"));
                    t.setReceiverAccountNumber(rs.getString("receiver_account_number"));
                    t.setAmount(rs.getDouble("amount"));
                    t.setDescription(rs.getString("description"));
                    t.setTransactionTime(rs.getString("transaction_time"));
                    list.add(t);
                }
            }
        }
        return list;
    }
    
    
    public List<Transaction> findAll() throws SQLException {
        List<Transaction> list = new ArrayList<>();
        String sql = "SELECT * FROM Transaction ORDER BY transaction_id DESC";

        try (Connection conn = DBConfig.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

        	while (rs.next()) {
                Transaction t = new Transaction();
                t.setTransactionId(rs.getInt("transaction_id"));
                t.setSenderAccountNumber(rs.getString("sender_account_number"));
                t.setReceiverAccountNumber(rs.getString("receiver_account_number"));
                t.setAmount(rs.getDouble("amount"));
                t.setDescription(rs.getString("description"));
                t.setTransactionTime(rs.getString("transaction_time"));
                list.add(t);
            }
        }
        return list;
    }

}
