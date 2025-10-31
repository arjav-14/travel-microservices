// import axios from 'axios';
// import {asyncHandler} from '../../backend/middleware/async';

// const API_URL = 'http://localhost:5001/api/v1';

// // Create axios instance with default config
// const api = axios.create({
//   baseURL: API_URL,
//   timeout: 10000, // 10 seconds
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     // Don't redirect here - let the component handle auth state
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle auth errors
// api.interceptors.response.use(
//   (response) => {
//     // Handle successful responses
//     if (response.data && typeof response.data === 'object') {
//       // If the response has a data property, use that as the main response
//       return response.data.success !== undefined ? response.data : { success: true, data: response.data };
//     }
//     return response;
//   },
//   (error) => {
//     const errorResponse = error.response || {};
//     const errorData = errorResponse.data || {};
//     const errorMessage = errorData.message || errorData.error || error.message || 'An error occurred';
//     const status = errorResponse.status;
    
//     console.error('API Error:', {
//       status,
//       message: errorMessage,
//       url: error.config?.url,
//       method: error.config?.method,
//       response: errorResponse.data
//     });
    
//     // Handle 401 Unauthorized errors
//     if (status === 401) {
//       // Don't clear tokens or redirect for booking access issues
//       if (errorMessage.toLowerCase().includes('not authorized to access this booking') ||
//           error.config?.url?.includes('/bookings/')) {
//         return Promise.reject({
//           message: 'You do not have permission to view this booking',
//           status: 403,
//           data: errorData
//         });
//       }
      
//       // For other 401 errors that are actual authentication issues
//       if (window.location.pathname !== '/login') {
//         console.error('Authentication required, redirecting to login...');
        
//         // Store the current path to redirect back after login
//         const currentPath = window.location.pathname + window.location.search;
//         if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
//           localStorage.setItem('redirectAfterLogin', currentPath);
//         }
        
//         // Clear auth data
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
        
//         // Redirect to login
//         window.location.href = '/login';
//       }
      
//       return Promise.reject({ 
//         message: 'Your session has expired. Please log in again.',
//         status: 401,
//         data: errorData
//       });
//     }
    
//     // For other errors, ensure we have a consistent error format
//     return Promise.reject({
//       message: errorMessage,
//       status: status,
//       data: errorData
//     });
//   }
// );

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export const createBooking = async (bookingData) => {
//   try {
//     const formattedData = {
//       ...bookingData,
//       startDate: new Date(bookingData.startDate).toISOString(),
//       endDate: new Date(bookingData.endDate).toISOString(),
//     };

//     const response = await api.post('/bookings', formattedData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating booking:', {
//       message: error.message,
//       response: error.response?.data,
//       status: error.response?.status
//     });
    
//     let errorMessage = 'Failed to create booking. Please try again.';
    
//     if (error.response) {
//       // Handle specific error messages from the server
//       if (error.response.status === 400) {
//         errorMessage = error.response.data.message || 'Invalid booking data';
//       } else if (error.response.status === 401) {
//         errorMessage = 'Please log in to complete your booking';
//       } else if (error.response.status === 404) {
//         errorMessage = 'Package not found';
//       }
//     } else if (error.request) {
//       errorMessage = 'Unable to connect to the server. Please check your connection.';
//     }
    
//     throw new Error(errorMessage);
//   }
// };

// // @desc    Get all bookings for the logged-in user
// // @route   GET /api/v1/bookings
// // @access  Private
// const getBookings = asyncHandler(async (req, res, next) => {
//   try {
//     // Only find bookings for the logged-in user
//     const bookings = await Booking.find({ user: req.user._id })
//       .populate('package', 'name price duration') // Only include necessary package fields
//       .sort('-createdAt'); // Show most recent bookings first
      
//     res.status(200).json({
//       success: true,
//       count: bookings.length,
//       data: bookings
//     });
//   } catch (err) {
//     console.error('Error in getBookings:', {
//       error: err.message,
//       stack: err.stack,
//       user: req.user ? {
//         id: req.user._id,
//         role: req.user.role,
//         email: req.user.email
//       } : 'No user in request'
//     });
//     next(err);
//   }
// });
// export const getBookingById = async (id) => {
//   try {
//     console.log(`Fetching booking with ID: ${id}`);
//     const response = await api.get(`/bookings/${id}`);
    
//     // Handle case where response might be wrapped in a data property
//     const responseData = response?.data?.data || response?.data;
    
//     if (!responseData) {
//       throw new Error('Invalid response format from server');
//     }
    
//     console.log('Booking data received:', responseData);
//     return responseData;
//   } catch (error) {
//     const errorDetails = {
//       message: error.message,
//       status: error.response?.status,
//       data: error.response?.data,
//       config: {
//         url: error.config?.url,
//         method: error.config?.method
//       }
//     };

//     console.error('Error in getBookingById:', errorDetails);

//     // Handle specific error cases
//     const status = error.response?.status;
//     const serverMessage = error.response?.data?.message || error.response?.data?.error;

//     // Create a new error with proper details
//     const customError = new Error(serverMessage || error.message);
//     customError.status = status;
//     customError.data = error.response?.data;

//     if (status === 403) {
//       customError.message = serverMessage || 'You do not have permission to view this booking. You can only view your own bookings.';
//     } else if (status === 404) {
//       customError.message = 'Booking not found';
//     } else if (status === 401) {
//       // Let the interceptor handle 401 errors
//       throw error;
//     } else {
//       customError.message = serverMessage || 'Failed to fetch booking details. Please try again later.';
//     }

//     throw customError;
//   }
// };


import axios from 'axios';

const API_URL = 'http://localhost:3002/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (token expired/invalid)
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Get all bookings for the logged-in user
export const getBookings = async (userId) => {
  try {
    // If userId is provided, use it as query param (for when auth is disabled)
    const url = userId ? `/bookings/mybookings?userId=${userId}` : '/bookings/mybookings';
    const response = await api.get(url);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
};

// Get single booking by ID
export const getBookingById = async (id) => {
  try {
    const response = await api.get(`/bookings/${id}`);
    
    // Log the full response for debugging
    console.log('Raw booking response:', response.data);
    
    // Handle the response based on its structure
    const bookingData = response.data.data || response.data;
    
    if (!bookingData) {
      throw new Error('No booking data found');
    }
    
    // Ensure we have the package details
    if (!bookingData.package && bookingData.packageId) {
      // If package details aren't populated, you might need to fetch them separately
      console.warn('Package details not included in booking response');
      // You might want to fetch package details here if needed
    }
    
    return bookingData;
  } catch (error) {
    console.error('Error fetching booking:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Update booking status
export const updateBookingStatus = async (id, status) => {
  try {
    const response = await api.patch(`/bookings/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

// In bookingService.js
export const updateBookingPayment = async (bookingId, paymentData) => {
  try {
    const response = await api.put(`/bookings/${bookingId}/pay`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error updating booking payment:', error);
    throw error;
  }
};