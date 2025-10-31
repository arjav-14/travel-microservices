import api from '../config/api';

export const getPackages = async (filters = {}) => {
  try {
    const response = await api.get('/packages', { params: filters });
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error;
  }
};

export const getPackageById = async (id) => {
  try {
    const response = await api.get(`/packages/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching package ${id}:`, error);
    throw error;
  }
};
