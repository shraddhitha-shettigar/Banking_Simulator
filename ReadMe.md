
# 💳 Banking Simulator Application

A **full-stack banking management simulator** that demonstrates core banking operations — including customer onboarding, account management, transactions, and admin control — with **secure user authentication** and an **interactive, responsive React frontend**.

---

## 🏗️ Project Overview

The **Banking Simulator** is a mini banking system where users can:
- Sign up and log in securely.
- Onboard customers (only once per user).
- Manage their own customer’s accounts and transactions.
- Submit queries to admin.
- Admins can view all customers, accounts, transactions, and queries.

---

## ⚙️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js  + TailwindCSS |
| **Backend** | Java (Servlets, JDBC) + Apache Tomcat |
| **Database** | MySQL |
| **API Communication** | RESTful APIs (Axios in frontend) |
| **IDE Tools** | Eclipse (Backend), VS Code (Frontend) |

---

## 🧩 Backend Details

- **Base URL:** `http://localhost:8080/bank-simulator/api`
- Developed using **Java Servlets** and **JDBC**.
- Uses **MySQL** for the database.
- **Tables include:** User, Customer, Account, Transaction, and Query.

---

### 🗄️ Database Schema Summary

#### 🧍 User Table
Stores login credentials for users.
```sql
CREATE TABLE IF NOT EXISTS User (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
````

#### 🧾 Customer Table

Each user can onboard one customer.

```sql
CREATE TABLE IF NOT EXISTS Customer (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  phoneNumber VARCHAR(15) UNIQUE,
  email VARCHAR(100) UNIQUE,
  address VARCHAR(200),
  customer_pin VARCHAR(12),
  aadhar_number VARCHAR(12) UNIQUE,
  dob DATE,
  status VARCHAR(20) DEFAULT 'Active',
  user_id INT, 
  FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
);
```

#### 🏦 Account Table

Stores account details linked to a customer.

```sql
CREATE TABLE IF NOT EXISTS Account (
  account_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  aadhar_number VARCHAR(12) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
  balance DOUBLE,
  account_type VARCHAR(20),
  account_name VARCHAR(50),
  account_number VARCHAR(20) NOT NULL UNIQUE,
  phone_number_linked VARCHAR(15) NOT NULL,
  ifsc_code VARCHAR(11) NOT NULL,
  status VARCHAR(20) DEFAULT 'Active',
  bank_name VARCHAR(100) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);
```

#### 💸 Transaction Table

Tracks fund transfers.

```sql
CREATE TABLE IF NOT EXISTS Transaction (
  transaction_id INT AUTO_INCREMENT PRIMARY KEY,
  sender_account_number VARCHAR(12) NOT NULL,
  receiver_account_number VARCHAR(12) NOT NULL,
  amount DOUBLE NOT NULL,
  description VARCHAR(255),
  transaction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 📩 Query Table

Stores user queries sent to admin.

```sql
CREATE TABLE IF NOT EXISTS Query (
  query_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  message TEXT NOT NULL
);
```

-----

## 🚀 Frontend Features
* **Authentication:** User signup, user login, and admin login (default: `admin` / `admin123`).
* **Customer Module:** Onboard one customer per user, with search, edit, and delete functionality.
* **Account Module:** Create, search, edit, and delete bank accounts linked to the user's customer.
* **Transaction Module:** Securely transfer funds and view transaction history. Includes email notifications for transfers and a feature to download transaction history as an Excel sheet.
* **Query Module:** Allows users to submit queries directly to the admin.
* **Admin Dashboard:** A separate interface for admins to view all customers, accounts, transactions, and user queries in responsive tables.
-----

## 🌐 API Endpoints Overview

| Module | Endpoint | Method | Description |
|---|---|---|---|
| User | `/user/signup` | `POST` | Register a new user |
| | `/user/login` | `POST` | Login existing user |
| Customer | `/customer/create` | `POST` | Create new customer (once per user) |
| | `/customer/get/{aadhar}` | `GET` | Get customer by Aadhar |
| | `/customer/update/{aadhar}` | `PUT` | Update customer |
| | `/customer/delete/{aadhar}` | `DELETE` | Delete customer |
| | `/customer/getAll` | `GET` | Get all customers (Admin) |
| Account | `/account/create` | `POST` | Create account |
| | `/account/get/{accountNumber}` | `GET` | Get account by Account Number |
| | `/account/getAll` | `GET` | Get all accounts (Admin) |
| | `/account/update/{account_number}` | `PUT` | Update account |
| | `/account/delete/{account_number}` | `DELETE` | Delete account |
| Transaction | `/transaction/create` | `POST` | Perform transaction |
| | `/transaction/get/{account_number}` | `GET` | Get transactions for account |
| | `/transaction/getAll` | `GET` | Get all transactions (Admin) |
| Admin | `/admin/login` | `POST` | Admin authentication |
| | `/admin/query` | `POST` | User sends query to admin |
| | `/admin/queries` | `GET` | Get all user queries (Admin) |

-----



## 🖼️ Screenshots

| Home Page | User Signup |
|---|---|
| ![Home Page](./Banking%20Simulator/screenshots/home.jpg) | ![User Signup](./Banking%20Simulator/screenshots/signup.jpg) |
| **User Login** | **User Dashboard** |
| ![User Login](./Banking%20Simulator/screenshots/login.jpg) | ![User DashBoard](./Banking%20Simulator/screenshots/user_dashboard.jpg) |
| **Customer Onboarding** | **Search Customer** |
| ![Customer Onboarding](./Banking%20Simulator/screenshots/create_customer.jpg) | ![Search Customer](./Banking%20Simulator/screenshots/search_customer.jpg) |
| **Create Account** | **Search Account** |
| ![Account Management](./Banking%20Simulator/screenshots/create_account.jpg) | ![Account Management](./Banking%20Simulator/screenshots/search_account.jpg) |
| **Make Transaction** | **Search Transaction** |
| ![Transaction](./Banking%20Simulator/screenshots/make_transaction.jpg) | ![Transaction](./Banking%20Simulator/screenshots/search_transaction.jpg) |
| **Send Query** | **Admin Login** |
| ![Query](./Banking%20Simulator/screenshots/send_query.jpg) | ![Admin Login](./Banking%20Simulator/screenshots/admin_login.jpg) |
| **Admin Dashboard** |
| ![Admin Dashboard](./Banking%20Simulator/screenshots/admin_dashboard.jpg) | |
-----

## 🧰 How to Run

### 🔹 Backend (Eclipse)

1.  Open Eclipse IDE and import the backend project as a Maven project.
2.  Configure your Apache Tomcat Server (v9.0 or v11.0 is recommended).
3.  Update the database URL, username, and password in `config/DBConfig.java`.
4.  Ensure you have created the `bankSimulation` database in MySQL.
5.  Right-click the project and "Run As \> Run on Server" (select your Tomcat server).
6.  The backend will be running at: `http://localhost:8080/bank-simulator/api`

### 🔹 Frontend (VS Code)

1.  Open the `frontend` folder in VS Code.
2.  Open a new terminal.
3.  Install the necessary dependencies:
    ```bash
    npm install
    ```
4.  Run the application:
    ```bash
    npm start
    ```
5.  The application will open at: `http://localhost:3000`



-----

## 📜 License

This project is open-source and available under the **[MIT License](https://www.google.com/search?q=LICENSE)**.

-----

## ✨ Author

**Shraddhitha**

*This project was developed as part of the Infosys Springboard Internship.*
*📅 2025*

⭐ *If you find this project helpful, please consider giving it a star on GitHub\!*

```
