import axios from 'axios';

const API_BASE_URL = 'http://localhost:3003/api/v1';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
};

// Get all bookings for the logged-in user
export const getBookings = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/user/${userId}`, {
      withCredentials: true,
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// Get single booking by ID
export const getBookingById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/${id}`, {
      withCredentials: true,
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching booking ${id}:`, error);
    throw error;
  }
};

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData, {
      withCredentials: true,
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Update booking status
export const updateBookingStatus = async (id, status) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/bookings/${id}/status`, 
      { status },
      { 
        withCredentials: true,
        headers: getAuthHeaders() 
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating booking status for ${id}:`, error);
    throw error;
  }
};

// Update booking payment
export const updateBookingPayment = async (bookingId, paymentData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/bookings/${bookingId}/pay`, 
      paymentData,
      { 
        withCredentials: true,
        headers: getAuthHeaders() 
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating payment for booking ${bookingId}:`, error);
    throw error;
  }
};