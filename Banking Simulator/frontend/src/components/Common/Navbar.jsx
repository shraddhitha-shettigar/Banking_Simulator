import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ userType, userData, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userType');
      localStorage.removeItem('userData');
      navigate('/');
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Banking Simulator</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {userType === 'user' && (
              <Link
                to="/user/dashboard"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Dashboard
              </Link>
            )}
            {userType === 'admin' && (
              <Link
                to="/admin/dashboard"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Admin Dashboard
              </Link>
            )}
            {userData && (
              <span className="text-gray-600">
                Welcome, {userData.full_name || userData.name || 'User'}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

