import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AUTH_SERVICE_URL = 'http://localhost:3001/api/v1/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Clear any authentication errors
  const clearError = useCallback(() => setError(null), []);

  const handleLogout = useCallback(() => {
    console.log('Logging out user...');
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    console.log('User logged out, redirecting to login');
    navigate('/login');
  }, [navigate]);

  // Initialize axios defaults
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const checkAuthStatus = useCallback(async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!token || !storedUser) {
      setUser(null);
      setLoading(false);
      return false;
    }

    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const response = await axios.get(`${AUTH_SERVICE_URL}/me`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const userData = response.data.data || response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
      
    } catch (err) {
      console.error('Auth verification failed:', err);
      if (err.response?.status === 401) {
        handleLogout();
      }
      return false;
    } finally {
      setLoading(false);
    }
  }, [handleLogout]);

  // Check for existing user session on initial load only
  useEffect(() => {
    let isMounted = true;
    
    const verifyAuth = async () => {
      console.log('Running initial auth check...');
      await checkAuthStatus();
      if (isMounted) {
        console.log('Initial auth check completed');
      }
    };

    verifyAuth();
    
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add a global error handler for 401 Unauthorized responses
  useEffect(() => {
    console.log('Setting up response interceptor...');
    
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.log('Received 401 Unauthorized, logging out...');
          handleLogout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      console.log('Cleaning up response interceptor');
      axios.interceptors.response.eject(responseInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(
        `${AUTH_SERVICE_URL}/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      const { token, user: userData } = response.data;
      
      if (!token || !userData) {
        throw new Error('Invalid response from server');
      }
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
      navigate('/');
      
      return userData;
    } catch (err) {
      console.error('Login error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (username, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(
        `${AUTH_SERVICE_URL}/register`,
        { username, email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      const { token, user: userData } = response.data;
      
      if (!token || !userData) {
        throw new Error('Registration failed');
      }
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
      navigate('/');
      
      return userData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    loading,
    error,
    login,
    signup,
    logout: handleLogout,
    clearError,
    isAuthenticated: !!user,
  }), [user, loading, error, login, signup, handleLogout, clearError]);

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};