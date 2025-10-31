import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="text-xl font-bold">Banking Simulator</span>
            </div>
            <p className="text-gray-300">
              A comprehensive banking simulation platform for learning and testing financial operations.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/user/login" className="text-gray-300 hover:text-white transition-colors">
                  User Login
                </a>
              </li>
              <li>
                <a href="/user/signup" className="text-gray-300 hover:text-white transition-colors">
                  User Signup
                </a>
              </li>
              <li>
                <a href="/admin/login" className="text-gray-300 hover:text-white transition-colors">
                  Admin Login
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Customer Management</li>
              <li>Account Management</li>
              <li>Transaction Processing</li>
              <li>Admin Dashboard</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Banking Simulator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

