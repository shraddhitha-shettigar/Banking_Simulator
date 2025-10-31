import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Swal from 'sweetalert2';

const SearchAccount = () => {
  const [searchAccountNumber, setSearchAccountNumber] = useState('');
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    
    if (!token || userType !== 'user') {
      navigate('/user/login');
      return;
    }
  }, [navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchAccountNumber.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Account Number Required',
        text: 'Please enter an account number to search.',
        confirmButtonColor: '#f59e0b',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.get(`/account/get/${searchAccountNumber}`);
      setAccountData(response.data);
      
      Swal.fire({
        icon: 'success',
        title: 'Account Found!',
        text: 'Account details retrieved successfully.',
        confirmButtonColor: '#2563eb',
      });
    } catch (error) {
      setAccountData(null);
      if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Not Found',
          text: 'No account found with that number.',
          confirmButtonColor: '#dc2626',
        });
      } else {
        console.error('Search account error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (accountNumber) => {
    const result = await Swal.fire({
      title: 'Delete Account',
      text: 'Are you sure you want to delete this account? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/account/delete/${accountNumber}`);
        
        Swal.fire({
          icon: 'success',
          title: 'Account Deleted!',
          text: 'Account has been successfully removed from the system.',
          confirmButtonColor: '#2563eb',
        }).then(() => {
          setAccountData(null);
          setSearchAccountNumber('');
        });
      } catch (error) {
        console.error('Delete account error:', error);
      }
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
          <h1 className="text-3xl font-bold text-gray-900">Search Account</h1>
          <p className="text-gray-600 mt-2">Find account details using account number</p>
        </div>

        {/* Search Form */}
        <div className="banking-card p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  id="accountNumber"
                  value={searchAccountNumber}
                  onChange={(e) => setSearchAccountNumber(e.target.value)}
                  className="banking-input flex-1"
                  placeholder="Enter account number"
                  maxLength="12"
                />
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
                      Searching...
                    </div>
                  ) : (
                    'Search'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Account Details */}
        {accountData && (
          <div className="banking-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Account Details</h2>
              <div className="flex space-x-4">
                <Link
                  to={`/user/account/edit/${accountData.accountNumber}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(accountData.accountNumber)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                <p className="text-lg text-gray-900 font-mono">{accountData.accountNumber}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder</label>
                <p className="text-lg text-gray-900">{accountData.accountName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                <p className="text-lg text-gray-900 capitalize">{accountData.accountType?.replace('_', ' ')}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                <p className="text-lg text-gray-900">{accountData.bankName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                <p className="text-lg text-gray-900 font-mono">{accountData.ifscCode}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Linked Phone</label>
                <p className="text-lg text-gray-900">{accountData.phoneNumberLinked}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                <p className="text-lg text-gray-900">{accountData.aadharNumber}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  accountData.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {accountData.status || 'Active'}
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Balance</label>
              <p className="text-2xl font-bold text-green-600">₹{accountData.balance?.toLocaleString() || '0.00'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAccount;

