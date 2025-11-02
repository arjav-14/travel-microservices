import { useState, useEffect } from 'react';
import axios from 'axios';

const ApiTest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/health`);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">API Test</h2>
      <div className="bg-gray-50 p-4 rounded">
        <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>API URL: {import.meta.env.VITE_API_URL}/health</p>
      </div>
    </div>
  );
};

export default ApiTest;