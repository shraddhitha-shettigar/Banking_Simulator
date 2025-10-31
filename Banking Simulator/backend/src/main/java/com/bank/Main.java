package com.bank;

import config.DBConfig;
import java.sql.Connection;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        System.out.println("Testing MySQL Database Connection...");

        try (Connection conn = DBConfig.getConnection()) {
            if (conn != null && !conn.isClosed()) {
                System.out.println("Connection established successfully.");
            } else {
                System.out.println("Failed to establish connection.");
            }
        } catch (SQLException e) {
            System.out.println("Error connecting to database: " + e.getMessage());
            e.printStackTrace();
        }
    }
}