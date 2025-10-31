import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'; 
import Swal from 'sweetalert2'; 

const UserSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '', 
    email: '',
    password: '',
    confirmPassword: ''
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

    
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match. Please try again.',
        confirmButtonColor: '#dc2626',
      });
      setLoading(false);
      return;
    }

   
    if (formData.password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text: 'Password must be at least 6 characters long.',
        confirmButtonColor: '#dc2626',
      });
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...signupData } = formData;
      await axiosInstance.post('/user/signup', signupData);

      
      Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        text: 'Your account has been created successfully. Please login to continue.',
        confirmButtonColor: '#2563eb',
      }).then(() => {
        navigate('/user/login');
      });
    } catch (error) {
      console.error('Signup error:', error);
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
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">User Signup</h1>
            <p className="text-gray-600">Create your banking account</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2"> {/* <-- FIX */}
                Full Name
              </label>
              <input
                type="text"
                id="fullName"   // <-- FIX
                name="fullName" // <-- FIX
                value={formData.fullName} // <-- FIX
                onChange={handleChange}
                required
                className="banking-input"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="banking-input"
                placeholder="Enter your email"
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
                placeholder="Create a password (min 6 characters)"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="banking-input"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/user/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in here
              </Link>
            </p>
            <p className="text-gray-600">
              <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
                ← Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;