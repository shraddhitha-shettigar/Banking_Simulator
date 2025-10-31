import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'; 
import Swal from 'sweetalert2'; 

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const [data, setData] = useState({
    customers: [],
    accounts: [],
    transactions: [],
    queries: []
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');

    if (!token || userType !== 'admin') {
      navigate('/admin/login');
      return;
    }

    loadData('customers');
  }, [navigate]);

  const loadData = async (type) => {
    setLoading(true);
    try {
      let endpoint = '';
      switch (type) {
        case 'customers':
          endpoint = '/customer/getAll';
          break;
        case 'accounts':
          endpoint = '/account/getAll';
          break;
        case 'transactions':
          endpoint = '/transaction/getAll';
          break;
        case 'queries':
          endpoint = '/admin/queries';
          break;
        default:
          return;
      }

      const response = await axiosInstance.get(endpoint);
      setData(prev => ({
        ...prev,
        [type]: response.data
      }));
    } catch (error) {
      console.error(`Error loading ${type}:`, error);
      Swal.fire({
        icon: 'error',
        title: `Error Loading ${type}`,
        text: 'Failed to fetch data from the server.',
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
    if (!data[tab] || data[tab].length === 0) {
      loadData(tab);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('userData');
        navigate('/');
        Swal.fire({
          icon: 'success',
          title: 'Logged Out',
          text: 'You have been successfully logged out.',
          confirmButtonColor: '#7c3aed',
        });
      }
    });
  };

  const filteredData = data[activeTab].filter(item => {
    if (!searchTerm) return true;
    return Object.values(item).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Combined date/time formatter
  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric',
          hour: 'numeric', minute: '2-digit', hour12: true
      });
    } catch (e) {
      return dateString; 
    }
  };

  const formatDateOnly = (dateString) => {
      if (!dateString) return '-';
      try {
          
          const date = new Date(dateString + 'T00:00:00'); 
          return date.toLocaleDateString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric'
          });
      } catch (e) {
          return dateString; 
      }
  };


  const formatAmount = (amount) => {
    if (amount === null || amount === undefined) return '₹0.00';
    return `₹${parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };


  const renderTable = () => {
    switch (activeTab) {
      case 'customers':
        return (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aadhar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{customer.aadharNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 break-words max-w-xs">{customer.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateOnly(customer.dob)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.status || 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'accounts':
        return (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Holder</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aadhar Number</th> {/* ADDED */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IFSC Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((account, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{account.accountNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.accountName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{account.aadharNumber}</td> {/* ADDED */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{account.accountType?.replace('_', ' ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.bankName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{account.ifscCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{formatAmount(account.balance)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      account.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {account.status || 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'transactions':
        return (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{transaction.senderAccountNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{transaction.receiverAccountNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{formatAmount(transaction.amount)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.description || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateTime(transaction.transactionTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'queries':
        return (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((query, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{query.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{query.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 break-words max-w-lg">{query.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      default:
        return null;
    }
  };

  const tabs = [
    { id: 'customers', name: 'Customers', icon: '👥' },
    { id: 'accounts', name: 'Accounts', icon: '🏦' },
    { id: 'transactions', name: 'Transactions', icon: '💸' },
    { id: 'queries', name: 'Queries', icon: '❓' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">System administration and monitoring</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-shrink-0 py-2 px-3 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-1 sm:mr-2">{tab.icon}</span>
                {tab.name}
                <span className="ml-1 sm:ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                  {data[tab.id]?.length || 0}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Search and Controls */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 max-w-lg">
            <input
              type="text"
              placeholder={`Search ${activeTab}... (by any field)`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="banking-input w-full"
            />
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-4">
            <button
              onClick={() => loadData(activeTab)}
              disabled={loading}
              className="banking-button disabled:opacity-50 flex items-center justify-center w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Refreshing...
                </>
              ) : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="banking-card overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="ml-2 text-gray-600">Loading {activeTab}...</span>
            </div>
          ) : filteredData.length > 0 ? (
            <div className="overflow-x-auto">
              {renderTable()}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No {activeTab} found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'No results match your search criteria.' : `No ${activeTab} available.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;