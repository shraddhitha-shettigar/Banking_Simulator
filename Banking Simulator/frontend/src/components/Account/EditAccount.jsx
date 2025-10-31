import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Swal from 'sweetalert2';

const EditAccount = () => {
  const { accountNumber } = useParams();
  const [formData, setFormData] = useState({
    accountNumber: '', 
    aadharNumber: '',
    accountType: '',
    balance: '',
    ifscCode: '',
    accountName: '',
    bankName: '',
    phoneNumberLinked: ''
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  const loadAccountData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/account/get/${accountNumber}`);
      const account = response.data;
      
      setFormData({
        accountNumber: account.accountNumber || '', 
        aadharNumber: account.aadharNumber || '',
        accountType: account.accountType || '',
        balance: account.balance?.toString() || '',
        ifscCode: account.ifscCode || '',
        accountName: account.accountName || '',
        bankName: account.bankName || '',
        phoneNumberLinked: account.phoneNumberLinked || ''
      });
    } catch (error) {
      console.error('Error loading account data:', error);
    } finally {
      setInitialLoading(false);
    }
  }, [accountNumber]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    
    if (!token || userType !== 'user') {
      navigate('/user/login');
      return;
    }

    loadAccountData();
  }, [navigate, accountNumber, loadAccountData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const submitData = {
      ...formData,
      balance: parseFloat(formData.balance)
    };

    try {
      await axiosInstance.put(`/account/update/${accountNumber}`, submitData);
      
      Swal.fire({
        icon: 'success',
        title: 'Account Updated!',
        text: 'Account information has been successfully updated.',
        confirmButtonColor: '#2563eb',
      }).then(() => {
        navigate('/user/account/search');
      });
    } catch (error) {
      console.error('Update account error:', error);
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
          <p className="text-gray-600">Loading account data...</p>
        </div>
      </div>
    );
  }

  const accountTypes = [
    { value: 'savings', label: 'Savings Account' },
    { value: 'current', label: 'Current Account' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              to="/user/account/search"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Search
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Account</h1>
          <p className="text-gray-600 mt-2">Update account information</p>
        </div>

        {/* Form */}
        <div className="banking-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Account Number  */}
              <div>
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  readOnly
                  className="banking-input bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </div>

              {/* Aadhar Number */}
              <div>
                <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Aadhar Number
                </label>
                <input
                  type="text"
                  id="aadharNumber"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  readOnly
                  className="banking-input bg-gray-100 cursor-not-allowed"
                  maxLength="12"
                  disabled
                />
              </div>

              {/* Account Type */}
              <div>
                <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type *
                </label>
                <select
                  id="accountType"
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  required
                  className="banking-input"
                >
                  <option value="">Select account type</option>
                  {accountTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Account Name */}
              <div>
                <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-2">
                  Account Holder Name *
                </label>
                <input
                  type="text"
                  id="accountName"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleChange}
                  required
                  className="banking-input"
                  placeholder="Enter account holder name"
                />
              </div>

              {/* Bank Name */}
              <div>
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name *
                </label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                  className="banking-input"
                  placeholder="Enter bank name"
                />
              </div>

              {/* IFSC Code */}
              <div>
                <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-2">
                  IFSC Code *
                </label>
                <input
                  type="text"
                  id="ifscCode"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  required
                  className="banking-input"
                  placeholder="Enter IFSC code"
                  style={{ textTransform: 'uppercase' }}
                />
              </div>

              {/* Phone Number Linked */}
              <div>
                <label htmlFor="phoneNumberLinked" className="block text-sm font-medium text-gray-700 mb-2">
                  Linked Phone Number *
                </label>
                <input
                  type="tel"
                  id="phoneNumberLinked"
                  name="phoneNumberLinked"
                  value={formData.phoneNumberLinked}
                  onChange={handleChange}
                  required
                  className="banking-input"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Balance */}
              <div className="md:col-span-2">
                <label htmlFor="balance" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Balance *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    id="balance"
                    name="balance"
                    value={formData.balance}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="banking-input pl-8"
                    placeholder="Enter current balance"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link
                to="/user/account/search"
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
                    Updating Account...
                  </div>
                ) : (
                  'Update Account'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;