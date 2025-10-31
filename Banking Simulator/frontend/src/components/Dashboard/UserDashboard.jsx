import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasCustomer, setHasCustomer] = useState(false);
  const [stats, setStats] = useState({ customers: 0, accounts: 0, transactions: 0 }); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    const storedUserData = localStorage.getItem('userData');

    if (!token || userType !== 'user') {
      navigate('/user/login');
      return;
    }

    //let currentUserId = null; 

    if (storedUserData) {
      try {
        const parsed = JSON.parse(storedUserData);
        setUserData(parsed);
        //currentUserId = parsed.userId; 

        axios
          .get(`http://localhost:8080/bank-simulator/api/customer/user/${parsed.userId}`)
          .then(() => {
            setHasCustomer(true);
          })
          .catch((err) => {
            if (err.response && err.response.status === 404) {
              setHasCustomer(false);
            } else {
              console.error("Error checking customer:", err);
            }
          })
          .finally(() => setLoading(false)); 
      } catch (e) {
         console.error("Error parsing user data:", e);
         setLoading(false);
         navigate('/user/login'); 
      }
    } else {
      setLoading(false);
      navigate('/user/login'); 
      return;
    }

    const fetchStats = async () => {
      try {
        const [custRes, accRes, transRes] = await Promise.all([
          axios.get('http://localhost:8080/bank-simulator/api/customer/getAll'),
          axios.get('http://localhost:8080/bank-simulator/api/account/getAll'),
          axios.get('http://localhost:8080/bank-simulator/api/transaction/getAll'),
        ]);

        setStats({
          customers: custRes.data.length,
          accounts: accRes.data.length,
          transactions: transRes.data.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats(); 

  }, [navigate]);


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
          confirmButtonColor: '#2563eb',
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      title: 'Customer Management',
      description: 'Add, search, edit, and delete customer records',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      color: 'blue',
      links: [
        {
          name: hasCustomer ? 'Customer Already Onboarded' : 'Add New Customer',
          path: hasCustomer ? '#' : '/user/customer/create',
          color: hasCustomer ? 'gray' : 'green',
          disabled: hasCustomer
        },
        { name: 'Search Customer', path: '/user/customer/search', color: 'blue' }
      ]
    },
    {
      title: 'Account Management',
      description: 'Create and manage bank accounts',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      color: 'green',
      links: [
        { name: 'Create Account', path: '/user/account/create', color: 'green' },
        { name: 'Search Account', path: '/user/account/search', color: 'blue' }
      ]
    },
    {
      title: 'Transactions',
      description: 'Make transfers and view transaction history',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      color: 'purple',
      links: [
        { name: 'Make Transaction', path: '/user/transaction/make', color: 'green' },
        { name: 'Search Transactions', path: '/user/transaction/search', color: 'blue' }
      ]
    },
    {
      title: 'Query',
      description: 'Send queries and get support',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'orange',
      links: [
        { name: 'Send Query', path: '/user/query', color: 'orange' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        {/* App Title */}
        <div className="text-center py-4 bg-gray-50 border-b">
            <h1 className="text-3xl font-bold text-blue-600">Banking Simulator</h1>
        </div>
        {/* User Info Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Left side: User Info */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">User Dashboard</h2>
                <p className="text-gray-600 text-sm">Welcome back, {userData?.fullName || userData?.full_name || 'User'}!</p>
              </div>
            </div>
            {/* Right side: Logout Button */}
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

      {/* Dashboard Overview Section (Using system-wide stats) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-gray-500 text-sm uppercase mb-2">Total Customers</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.customers}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-gray-500 text-sm uppercase mb-2">Total Accounts</h3>
            <p className="text-3xl font-bold text-green-600">{stats.accounts}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-gray-500 text-sm uppercase mb-2">Total Transactions</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.transactions}</p>
          </div>
        </div>
      </div>

      {/* Main Content (Menu Items) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="banking-card p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center mr-4 text-${item.color}-600`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {item.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    to={link.disabled ? '#' : link.path}
                    className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                      link.disabled
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : link.color === 'green'
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : link.color === 'blue'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : link.color === 'orange'
                        ? 'bg-orange-600 hover:bg-orange-700 text-white'
                        : 'bg-gray-600 hover:bg-gray-700 text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;