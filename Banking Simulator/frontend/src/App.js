import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserLogin from './components/Auth/UserLogin';
import UserSignup from './components/Auth/UserSignup';
import AdminLogin from './components/Auth/AdminLogin';
import UserDashboard from './components/Dashboard/UserDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import CreateCustomer from './components/Customer/CreateCustomer';
import SearchCustomer from './components/Customer/SearchCustomer';
import EditCustomer from './components/Customer/EditCustomer';
import CreateAccount from './components/Account/CreateAccount';
import SearchAccount from './components/Account/SearchAccount';
import EditAccount from './components/Account/EditAccount';
import MakeTransaction from './components/Transaction/MakeTransaction';
import SearchTransaction from './components/Transaction/SearchTransaction';
import QueryForm from './components/Query/QueryForm';
import ApiTest from './components/Common/ApiTest';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* User Dashboard Routes */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/customer/create" element={<CreateCustomer />} />
          <Route path="/user/customer/search" element={<SearchCustomer />} />
          <Route path="/user/customer/edit/:aadhar" element={<EditCustomer />} />
          <Route path="/user/account/create" element={<CreateAccount />} />
          <Route path="/user/account/search" element={<SearchAccount />} />
          <Route path="/user/account/edit/:accountNumber" element={<EditAccount />} />
          <Route path="/user/transaction/make" element={<MakeTransaction />} />
          <Route path="/user/transaction/search" element={<SearchTransaction />} />
          <Route path="/user/query" element={<QueryForm />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* API Test Route */}
          <Route path="/api-test" element={<ApiTest />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
