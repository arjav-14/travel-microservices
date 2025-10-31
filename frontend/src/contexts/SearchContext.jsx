import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    date: '',
    activities: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      if (searchParams.destination) queryParams.append('destination', searchParams.destination);
      if (searchParams.date) queryParams.append('date', formatDate(searchParams.date));
      if (searchParams.activities) queryParams.append('activities', searchParams.activities);

      // Navigate to search results page with query parameters
      navigate(`/search?${queryParams.toString()}`);
      
      // In a real app, you would fetch search results here
      // const response = await fetch(`/api/search?${queryParams.toString()}`);
      // const data = await response.json();
      // setSearchResults(data);
      
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to perform search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSearchParams = (updates) => {
    setSearchParams(prev => ({
      ...prev,
      ...updates
    }));
  };

  return (
    <SearchContext.Provider
      value={{
        searchParams,
        updateSearchParams,
        searchResults,
        isLoading,
        error,
        handleSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
