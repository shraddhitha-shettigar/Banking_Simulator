import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'; 
import Swal from 'sweetalert2'; 

const MakeTransaction = () => {
  const [formData, setFormData] = useState({
    senderAccountNumber: '',
    receiverAccountNumber: '',
    amount: '',
    pin: '',
    description: ''
  });
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
      amount: parseFloat(formData.amount)
    };

    try {
      await axiosInstance.post('/transaction/create', submitData);

      Swal.fire({
        icon: 'success',
        title: 'Transaction Successful!',
        text: `Transaction of ₹${formData.amount} has been processed and email sent to sender account and reciever account successfully.`,
        confirmButtonColor: '#2563eb',
      }).then(() => {
        navigate('/user/dashboard');
      });
    } catch (error) {
      console.error('Transaction error:', error);
    
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
          <h1 className="text-3xl font-bold text-gray-900">Make Transaction</h1>
          <p className="text-gray-600 mt-2">Transfer money between accounts</p>
        </div>

        {/* Form */}
        <div className="banking-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sender Account Number */}
              <div>
                <label htmlFor="senderAccountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Sender Account Number *
                </label>
                <input
                  type="text"
                  id="senderAccountNumber"
                  name="senderAccountNumber"
                  value={formData.senderAccountNumber}
                  onChange={handleChange}
                  required
                  className="banking-input"
                  placeholder="Enter sender account number"
                  maxLength="12"
                />
              </div>

              {/* Receiver Account Number */}
              <div>
                <label htmlFor="receiverAccountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Receiver Account Number *
                </label>
                <input
                  type="text"
                  id="receiverAccountNumber"
                  name="receiverAccountNumber"
                  value={formData.receiverAccountNumber}
                  onChange={handleChange}
                  required
                  className="banking-input"
                  placeholder="Enter receiver account number"
                  maxLength="12" 
                />
              </div>

              {/* Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Amount *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    min="0.01"
                    step="0.01"
                    className="banking-input pl-8"
                    placeholder="Enter amount to transfer"
                  />
                </div>
              </div>

              {/* PIN */}
              <div>
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction PIN *
                </label>
                <input
                  type="password"
                  id="pin"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  required
                  className="banking-input"
                  placeholder="Enter 6-digit PIN"
                  maxLength="6"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="banking-input"
                placeholder="Enter transaction description (optional)"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4"> {/* Added pt-4 for spacing */}
              <Link
                to="/user/dashboard"
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Transaction...
                  </div>
                ) : (
                  'Process Transaction'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeTransaction;