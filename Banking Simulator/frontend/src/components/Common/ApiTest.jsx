import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

const ApiTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const testEndpoints = [
    { name: 'Root', path: '/' },
    { name: 'API Root', path: '/api' },
    { name: 'Bank Simulator', path: '/bank-simulator' },
    { name: 'Bank Simulator API', path: '/bank-simulator/api' },
    { name: 'User Login', path: '/api/user/login' },
    { name: 'User Signup', path: '/api/user/signup' },
    { name: 'Admin Login', path: '/api/admin/login' },
    { name: 'Health Check', path: '/actuator/health' },
  ];

  const testEndpoint = async (endpoint) => {
    try {
      const response = await axiosInstance.get(endpoint.path);
      return {
        endpoint: endpoint.name,
        path: endpoint.path,
        status: 'SUCCESS',
        statusCode: response.status,
        data: response.data
      };
    } catch (error) {
      return {
        endpoint: endpoint.name,
        path: endpoint.path,
        status: 'ERROR',
        statusCode: error.response?.status || 'Network Error',
        error: error.message
      };
    }
  };

  const runAllTests = async () => {
    setLoading(true);
    setTestResults([]);
    
    const results = [];
    for (const endpoint of testEndpoints) {
      const result = await testEndpoint(endpoint);
      results.push(result);
      setTestResults([...results]);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="banking-card p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">API Connection Test</h1>
          <p className="text-gray-600 mb-8">
            This tool will test various API endpoints to help identify the correct backend URL.
          </p>
          
          <button
            onClick={runAllTests}
            disabled={loading}
            className="banking-button mb-8 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Run All Tests'}
          </button>

          {testResults.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Test Results:</h2>
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    result.status === 'SUCCESS'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{result.endpoint}</h3>
                      <p className="text-sm text-gray-600">Path: {result.path}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          result.status === 'SUCCESS'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {result.status}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        Status: {result.statusCode}
                      </p>
                    </div>
                  </div>
                  {result.status === 'SUCCESS' && result.data && (
                    <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                      <strong>Response:</strong> {JSON.stringify(result.data, null, 2)}
                    </div>
                  )}
                  {result.status === 'ERROR' && result.error && (
                    <div className="mt-2 p-2 bg-red-100 rounded text-sm text-red-800">
                      <strong>Error:</strong> {result.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside text-blue-800 space-y-1">
              <li>Click "Run All Tests" to test various API endpoints</li>
              <li>Look for any endpoint that returns "SUCCESS"</li>
              <li>If you find a working endpoint, update the baseURL in src/api/axiosInstance.js</li>
              <li>Make sure your backend is running and accessible</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTest;


