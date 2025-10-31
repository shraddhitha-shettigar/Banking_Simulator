import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'; // Assuming this path is correct
import Swal from 'sweetalert2'; // Assuming sweetalert2 is installed

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('/admin/login', formData);

      localStorage.setItem('authToken', response.data.token || 'admin-token'); 
      localStorage.setItem('userType', 'admin');
      localStorage.setItem('userData', JSON.stringify(response.data.admin || response.data));

      
      Swal.fire({
        icon: 'success',
        title: 'Admin Login Successful!',
        text: 'Welcome to the Admin Dashboard',
        confirmButtonColor: '#7c3aed', 
      }).then(() => {
        navigate('/admin/dashboard');
      });
    } catch (error) {
      console.error('Admin login error:', error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen banking-gradient flex items-center justify-center px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white bg-opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="banking-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
            <p className="text-gray-600">Access administrative controls</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="banking-input"
                placeholder="Enter admin username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="banking-input"
                placeholder="Enter admin password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </div>
              ) : (
                'Admin Sign In'
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-gray-600">
              <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
                ← Back to Home
              </Link>
            </p>
            <p className="text-gray-600">
              <Link to="/user/login" className="text-blue-600 hover:text-blue-700 font-medium">
                User Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;