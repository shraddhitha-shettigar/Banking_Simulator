package config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DBConfig {   
    private static final String URL = "jdbc:mysql://localhost:3306/bankSimulation?useSSL=false&serverTimezone=UTC";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "&Hraddha_1024";

    static {
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement()) {
        	String userTable = "CREATE TABLE IF NOT EXISTS User (" +
        	        "user_id INT AUTO_INCREMENT PRIMARY KEY," +
        	        "full_name VARCHAR(100) NOT NULL," +
        	        "email VARCHAR(150) UNIQUE NOT NULL," +
        	        "password VARCHAR(255) NOT NULL," +
        	        "created_at DATETIME DEFAULT CURRENT_TIMESTAMP" +
        	    ")";
        	stmt.executeUpdate(userTable);


        	String customerTable = "CREATE TABLE IF NOT EXISTS Customer (" +
        		    "customer_id INT AUTO_INCREMENT PRIMARY KEY, " +
        		    "name VARCHAR(50), " +
        		    "phoneNumber VARCHAR(15) UNIQUE, " +
        		    "email VARCHAR(100) UNIQUE, " +
        		    "address VARCHAR(200), " +
        		    "customer_pin VARCHAR(12), " +
        		    "aadhar_number VARCHAR(12) UNIQUE, " +
        		    "dob DATE, " +
        		    "status VARCHAR(20) DEFAULT 'Active', " +
        		    "user_id INT, " +  
        		    "FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE" +
        		    ")";


            String accountTable = "CREATE TABLE IF NOT EXISTS Account (" +
                    "account_id INT AUTO_INCREMENT PRIMARY KEY," +
                    "customer_id INT," +
                    "aadhar_number VARCHAR(12) NOT NULL," +
                    "created_at DATETIME DEFAULT CURRENT_TIMESTAMP," +
                    "modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP," +
                    "balance DOUBLE," +
                    "account_type VARCHAR(20)," +
                    "account_name VARCHAR(50)," +
                    "account_number VARCHAR(20) NOT NULL UNIQUE," +
                    "phone_number_linked VARCHAR(15) NOT NULL," +
                    "ifsc_code VARCHAR(11) NOT NULL," +
                    "status VARCHAR(20) DEFAULT 'Active'," +
                    "bank_name VARCHAR(100) NOT NULL," +
                    "FOREIGN KEY (customer_id) REFERENCES Customer(customer_id))";
            		

            String transactionTable = "CREATE TABLE IF NOT EXISTS Transaction (" +
                    "transaction_id INT AUTO_INCREMENT PRIMARY KEY," +
                    "sender_account_number VARCHAR(12) NOT NULL," +
                    "receiver_account_number VARCHAR(12) NOT NULL," +
                    "amount DOUBLE NOT NULL," +
                    "description VARCHAR(255)," +
                    "transaction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
                    "FOREIGN KEY (sender_account_number) REFERENCES Account(account_number)," +
                    "FOREIGN KEY (receiver_account_number) REFERENCES Account(account_number))";


            stmt.executeUpdate(customerTable);
            stmt.executeUpdate(accountTable);
            stmt.executeUpdate(transactionTable);
            
       
            String queryTable = "CREATE TABLE IF NOT EXISTS `Query` (" +
            	    "query_id INT AUTO_INCREMENT PRIMARY KEY, " +
            	    "name VARCHAR(100) NOT NULL, " +
            	    "email VARCHAR(150) NOT NULL, " +
            	    "message TEXT NOT NULL" +
            	")";
            	stmt.executeUpdate(queryTable);
            	
            	
            	


            System.out.println("Tables Customer, Account, Transaction created successfully.");

        } catch (SQLException e) {
            System.err.println("Error creating tables: " + e.getMessage());
        }
    }

    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); 
        } catch (ClassNotFoundException e) {
            throw new SQLException("MySQL JDBC Driver not found.", e);
        }
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }
}
