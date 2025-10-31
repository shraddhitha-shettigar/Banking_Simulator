import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Swal from 'sweetalert2';

const SearchTransaction = () => {
  const [searchAccountNumber, setSearchAccountNumber] = useState('');
  const [transactions, setTransactions] = useState([]);
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
      const response = await axiosInstance.get(`/transaction/get/${searchAccountNumber}`);
      setTransactions(response.data);
      
      Swal.fire({
        icon: 'success',
        title: 'Transactions Found!',
        text: `Found ${response.data.length} transaction(s) for this account.`,
        confirmButtonColor: '#2563eb',
      });
    } catch (error) {
      setTransactions([]);
      console.error('Search transactions error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadExcel = async (accountNumber) => {
    try {
      const response = await axiosInstance.get(`/transaction/${accountNumber}/download`, {
        responseType: 'blob'
      });
      
    
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transactions_${accountNumber}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      Swal.fire({
        icon: 'success',
        title: 'Download Successful!',
        text: 'Transaction report is downloaded.',
        confirmButtonColor: '#2563eb',
      });
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatAmount = (amount) => {
    return `₹${parseFloat(amount).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h1 className="text-3xl font-bold text-gray-900">Search Transactions</h1>
          <p className="text-gray-600 mt-2">View transaction history for an account</p>
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

        {/* Transactions Table */}
        {transactions.length > 0 && (
          <div className="banking-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
              <button
                onClick={() => handleDownloadExcel(searchAccountNumber)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Excel
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Receiver
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {transaction.senderAccountNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {transaction.receiverAccountNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                        {formatAmount(transaction.amount)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {transaction.description || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(transaction.transactionTime)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {transactions.length === 0 && (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions found</h3>
                <p className="mt-1 text-sm text-gray-500">No transactions found for this account number.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTransaction;