import { useState, useEffect } from 'react';
import axios from 'axios';

const API_ENDPOINTS = {
  AUTH: 'http://localhost:3001/api/v1/auth/health',
  PACKAGES: 'http://localhost:3002/api/v1/health',
  BOOKINGS: 'http://localhost:3003/api/v1/health',
  DESTINATIONS: 'http://localhost:3005/api/v1/health',
  USERS: 'http://localhost:3006/api/v1/health'
};

const ApiTest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState('AUTH');
  const [endpointUrl, setEndpointUrl] = useState(API_ENDPOINTS.AUTH);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_ENDPOINTS[selectedService], {
        withCredentials: true,
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      setData(response.data);
    } catch (err) {
      setError({
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEndpointUrl(API_ENDPOINTS[selectedService]);
  }, [selectedService]);

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">API Health Check</h2>
      
      <div className="mb-6">
        <label htmlFor="service-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Service
        </label>
        <select
          id="service-select"
          value={selectedService}
          onChange={handleServiceChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          {Object.keys(API_ENDPOINTS).map((service) => (
            <option key={service} value={service}>
              {service} Service
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <button
          onClick={fetchData}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Service'}
        </button>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-medium mb-2">Endpoint:</h3>
        <code className="text-sm bg-gray-100 p-2 rounded block overflow-x-auto">
          {endpointUrl}
        </code>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2">Connecting to {selectedService} service...</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error {error.status ? `(${error.status})` : ''}: {error.message}
              </h3>
              {error.data && (
                <div className="mt-2 text-sm text-red-700">
                  <pre className="whitespace-pre-wrap">{JSON.stringify(error.data, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {data && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-2">Response:</h3>
          <pre className="text-sm bg-white p-3 rounded border border-gray-200 overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;