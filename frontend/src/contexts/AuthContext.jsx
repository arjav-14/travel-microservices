import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    console.log('Checking authentication status...');
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    console.log('Token from localStorage:', token ? 'exists' : 'not found');
    
    if (!token || !storedUser) {
      console.log('No token or user data found, user is not authenticated');
      setUser(null);
      setLoading(false);
      return false;
    }

    try {
      // Set auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Verify token with server
      console.log('Verifying token with server...');
      const response = await axios.get('http://localhost:3001/api/v1/auth/me');
      
      if (response.data.success) {
        const userData = response.data.data;
        console.log('Auth verification successful, user:', userData);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      
      throw new Error('Invalid response format from server');
      
    } catch (err) {
      console.error('Auth verification failed:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      
      // If token is invalid, clear stored data
      if (err.response?.status === 401) {
        console.log('Token is invalid or expired, logging out...');
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
    console.log('Login attempt with email:', email);
    try {
      clearError();
      setLoading(true);
      
      console.log('Sending login request...');
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      });

      console.log('Login response:', response.data);
      
      const token = response.data.token || response.data.data?.token;
      
      if (!token) {
        throw new Error('No authentication token received');
      }

      // Store token
      localStorage.setItem('token', token);
      
      // Set default auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Get user data from /me endpoint
      const userResponse = await axios.get('http://localhost:3001/api/v1/auth/me');
      const userData = userResponse.data.data || userResponse.data;
      
      if (!userData) {
        throw new Error('Failed to fetch user data');
      }
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update state
      setUser(userData);
      setLoading(false);
      
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
  // const signup = async (name, email, password) => {
  //   try {
  //     clearError();
  //     setLoading(true);
  //     console.log('Sending signup request with:', { name, email });
      
  //     const response = await axios.post('http://localhost:5001/api/v1/auth/register', {
  //       name,
  //       email,
  //       password,
  //       role: 'user'
  //     });

  //     console.log('Signup response:', response.data);
  //     const { token, user: userData } = response.data.data;
      
  //     // Store token and user data
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('user', JSON.stringify(userData));
      
  //     // Set default auth header
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
  //     // Update state
  //     setUser(userData);
  //     setLoading(false);
      
  //     return userData;
  //   } catch (err) {
  //     console.error('Signup error:', {
  //       message: err.message,
  //       response: err.response?.data,
  //     });
      
  //     const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
  //     setError(errorMessage);
  //     throw new Error(errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const signup = async (name, email, password) => {
  try {
    clearError();
    setLoading(true);
    console.log('Sending signup request with:', { name, email });
    
    const response = await axios.post('http://localhost:3001/api/v1/auth/register', {
      username: name,
      email,
      password,
      role: 'user'
    });

    console.log('Signup response:', response.data);
    
    // Update this part to match your actual response structure
    const { token, user: userData } = response.data; // Removed .data from response.data.data
    
    // Store token and user data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Set default auth header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Update state
    setUser(userData);
    setLoading(false);
    
    return userData;
  } catch (err) {
    console.error('Signup error:', {
      message: err.message,
      response: err.response?.data,
    });
    
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