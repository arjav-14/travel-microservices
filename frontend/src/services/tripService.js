import api from '../config/api';

// Get user's upcoming trips
export const getUpcomingTrips = async () => {
  try {
    const response = await api.get('/bookings/upcoming');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching upcoming trips:', error);
    throw error;
  }
};

// Create a new trip
export const createTrip = async (tripData) => {
  try {
    const response = await api.post('/bookings', tripData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating trip:', error);
    throw error;
  }
};

// Cancel a trip
export const cancelTrip = async (bookingId) => {
  try {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error cancelling trip:', error);
    throw error;
  }
};

// Get trip details
export const getTripDetails = async (bookingId) => {
  try {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching trip details:', error);
    throw error;
  }
};
