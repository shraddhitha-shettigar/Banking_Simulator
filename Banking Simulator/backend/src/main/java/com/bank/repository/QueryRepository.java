package com.bank.repository;

import com.bank.model.Query;
import config.DBConfig;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class QueryRepository {

    public int insert(Query q) throws SQLException {
        String sql = "INSERT INTO Query (name, email, message) VALUES (?, ?, ?)";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            ps.setString(1, q.getName());
            ps.setString(2, q.getEmail());
            ps.setString(3, q.getMessage());

            int affected = ps.executeUpdate();
            if (affected == 0) return -1;
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) {
                    int id = rs.getInt(1);
                    q.setQueryId(id);
                    return id;
                }
            }
            return -1;
        }
    }

    public List<Query> findAll() throws SQLException {
        List<Query> list = new ArrayList<>();
        String sql = "SELECT * FROM Query ORDER BY query_id DESC";
        try (Connection conn = DBConfig.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) {
                Query q = new Query();
                q.setQueryId(rs.getInt("query_id"));
                q.setName(rs.getString("name"));
                q.setEmail(rs.getString("email"));
                q.setMessage(rs.getString("message"));
                list.add(q);
            }
        }
        return list;
    }

    public Optional<Query> findById(int id) throws SQLException {
        String sql = "SELECT * FROM Query WHERE query_id = ?";
        try (Connection conn = DBConfig.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    Query q = new Query();
                    q.setQueryId(rs.getInt("query_id"));
                    q.setName(rs.getString("name"));
                    q.setEmail(rs.getString("email"));
                    q.setMessage(rs.getString("message"));
                    return Optional.of(q);
                }
            }
        }
        return Optional.empty();
    }
}
