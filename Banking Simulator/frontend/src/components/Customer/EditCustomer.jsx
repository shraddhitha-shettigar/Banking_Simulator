import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Swal from 'sweetalert2';

const EditCustomer = () => {
  const { aadhar } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    customerPin: '',
    aadharNumber: '',
    dob: ''
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  const loadCustomerData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/customer/get/${aadhar}`);
      const customer = response.data;
      
      setFormData({
        name: customer.name || '',
        phoneNumber: customer.phoneNumber || '',
        email: customer.email || '',
        address: customer.address || '',
        customerPin: customer.customerPin || '',
        aadharNumber: customer.aadharNumber || '',
        dob: customer.dob ? customer.dob.split('T')[0] : ''
      });
    } catch (error) {
      console.error('Error loading customer data:', error);
    } finally {
      setInitialLoading(false);
    }
  }, [aadhar]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    
    if (!token || userType !== 'user') {
      navigate('/user/login');
      return;
    }

    
    loadCustomerData();
  }, [navigate, aadhar, loadCustomerData]);

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
      await axiosInstance.put(`/customer/update/${aadhar}`, formData);
      
      Swal.fire({
        icon: 'success',
        title: 'Customer Updated!',
        text: 'Customer information has been successfully updated.',
        confirmButtonColor: '#2563eb',
      }).then(() => {
        navigate('/user/customer/search');
      });
    } catch (error) {
      console.error('Update customer error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading customer data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              to="/user/customer/search"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Search
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Customer</h1>
          <p className="text-gray-600 mt-2">Update customer information</p>
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
                <label htmlFor="aadhar_number" className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhar Number *
                </label>
                <input
                  type="text"
                  id="aadharNumber"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  required
                  className="banking-input bg-gray-100 cursor-not-allowed"
                  placeholder="Enter 12-digit Aadhar number"
                  maxLength="12"
                  disabled
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
                <label htmlFor="customer_pin" className="block text-sm font-medium text-gray-700 mb-2">
                  Customer PIN *
                </label>
                <input  
                  type="password"
                  id="customerPin"
                  name="customerPin"
                  value={formData.customerPin}
                  onChange={handleChange}
                  required
                  className="banking-input bg-gray-100 cursor-not-allowed"
                  placeholder="Enter 6-digit PIN"
                  maxLength="6"
                  disabled
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
                to="/user/customer/search"
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
                    Updating Customer...
                  </div>
                ) : (
                  'Update Customer'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
