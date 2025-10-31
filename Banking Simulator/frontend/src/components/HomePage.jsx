import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen banking-gradient flex items-center justify-center px-4 py-16"> {/* Added padding */}
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white bg-opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white bg-opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Banking Simulator
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-light max-w-2xl mx-auto">
            Experience modern banking with our comprehensive simulation platform
          </p>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {/* User Login */}
          <Link
            to="/user/login"
            className="group banking-card p-8 text-center hover:scale-105 transform transition-all duration-300"
          >
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-700 transition-colors duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">User Login</h3>
            <p className="text-gray-600 mb-6">Access your banking dashboard and manage your accounts</p>
            <div className="banking-button inline-block">
              Login as User
            </div>
          </Link>

          {/* User Signup */}
          <Link
            to="/user/signup"
            className="group banking-card p-8 text-center hover:scale-105 transform transition-all duration-300"
          >
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-700 transition-colors duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">User Signup</h3>
            <p className="text-gray-600 mb-6">Create a new account to start your banking journey</p>
            <div className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block">
              Sign Up Now
            </div>
          </Link>

          {/* Admin Login */}
          <Link
            to="/admin/login"
            className="group banking-card p-8 text-center hover:scale-105 transform transition-all duration-300"
          >
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-700 transition-colors duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Admin Login</h3>
            <p className="text-gray-600 mb-6">Access administrative controls and system management</p>
            <div className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block">
              Admin Access
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HomePage;