import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'; 
import Swal from 'sweetalert2'; 

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    customerPin: '',   
    aadharNumber: '', 
    dob: '',
    userId: null      
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    const storedUserData = localStorage.getItem('userData'); 

    if (!token || userType !== 'user') {
      navigate('/user/login');
      return;
    }

    
    if (storedUserData) {
        try {
            const user = JSON.parse(storedUserData);
            if (user && user.userId) {
                setFormData(prev => ({ ...prev, userId: user.userId }));
            } else {
                console.error("User data in localStorage is missing userId property.");
                Swal.fire({
                    icon: 'error', title: 'Session Error',
                    text: 'Could not find your user ID in the session data. Please log in again.',
                    confirmButtonColor: '#dc2626',
                }).then(() => navigate('/user/login'));
                return; 
            }
        } catch (e) {
            console.error("Error parsing user data from localStorage:", e);
             Swal.fire({
                icon: 'error', title: 'Session Error',
                text: 'There was an error reading your session data. Please log in again.',
                confirmButtonColor: '#dc2626',
            }).then(() => navigate('/user/login'));
            return; 
        }
    } else {
        console.error("User data not found in localStorage.");
         Swal.fire({
            icon: 'error', title: 'Session Error',
            text: 'Your session data was not found. Please log in again.',
            confirmButtonColor: '#dc2626',
        }).then(() => navigate('/user/login'));
        return; 
    }
    

    
  }, [navigate]);



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userId) {
         Swal.fire({
            icon: 'warning', title: 'Missing Information',
            text: 'User ID is missing. Cannot create customer record. Please try logging in again.',
            confirmButtonColor: '#f59e0b', 
        });
        return; 
    }
   

    setLoading(true);

    try {
      await axiosInstance.post('/customer/create', formData);

      Swal.fire({
        icon: 'success',
        title: 'Customer Created!',
        text: 'Customer has been successfully added to the system.',
        confirmButtonColor: '#2563eb',
      }).then(() => {
        navigate('/user/dashboard'); 
      });
    } catch (error) {
      console.error('Create customer error:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              to="/user/dashboard"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Customer</h1>
          <p className="text-gray-600 mt-2">Create a new customer record in the system</p>
        </div>

        {/* Form */}
        <div className="banking-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="banking-input"
                  placeholder="Enter customer's full name"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="banking-input"
                  placeholder="Enter phone number"
                  maxLength="10"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="banking-input"
                  placeholder="Enter email address"
                />
              </div>

              {/* Aadhar Number */}
              <div>
                <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700 mb-2"> {/* Corrected htmlFor */}
                  Aadhar Number *
                </label>
                <input
                  type="text"
                  id="aadharNumber"
                  name="aadharNumber" 
                  value={formData.aadharNumber} 
                  onChange={handleChange}
                  required
                  className="banking-input"
                  placeholder="Enter 12-digit Aadhar number"
                  maxLength="12"
                />
              </div>

              {/* Date of Birth */}
              <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="text" 
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="banking-input"
                    placeholder="YYYY-MM-DD" 
                    onFocus={(e) => (e.target.type = 'date')} 
                    onBlur={(e) => { 
                      if (!e.target.value) {
                        e.target.type = 'text';
                      }
                    }}
                  />
                </div>

              {/* Customer PIN */}
              <div>
                <label htmlFor="customerPin" className="block text-sm font-medium text-gray-700 mb-2"> {/* Corrected htmlFor */}
                  Customer PIN *
                </label>
                <input
                  type="password"
                  id="customerPin"
                  name="customerPin" 
                  value={formData.customerPin} 
                  onChange={handleChange}
                  required
                  className="banking-input"
                  placeholder="Enter 6-digit PIN"
                  maxLength="6"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="banking-input"
                placeholder="Enter complete address"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link
                to="/user/dashboard"
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="banking-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Customer...
                  </div>
                ) : (
                  'Create Customer'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;