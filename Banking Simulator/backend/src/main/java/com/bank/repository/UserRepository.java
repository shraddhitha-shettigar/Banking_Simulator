package com.bank.repository;

import com.bank.model.User;
import config.DBConfig;

import java.sql.*;
import java.util.Optional;

public class UserRepository {

    public boolean save(User user) throws SQLException {
        String sql = "INSERT INTO User (full_name, email, password) VALUES (?, ?, ?)";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, user.getFullName());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getPassword());
            return ps.executeUpdate() > 0;
        }
    }

    public Optional<User> findByEmail(String email) throws SQLException {
        String sql = "SELECT * FROM User WHERE email = ?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, email);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    User u = new User();
                    u.setUserId(rs.getInt("user_id"));
                    u.setFullName(rs.getString("full_name"));
                    u.setEmail(rs.getString("email"));
                    u.setPassword(rs.getString("password"));
                    u.setCreatedAt(rs.getString("created_at"));
                    return Optional.of(u);
                }
            }
        }
        return Optional.empty();
    }
}
