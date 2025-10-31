


import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Filter, X, Star, MapPin, Calendar, Clock, Users } from 'lucide-react';

// Sample data - replace with your actual data fetching logic
const samplePackages = [
  {
    id: 'bali-paradise',
    title: 'Bali Paradise',
    location: 'Bali, Indonesia',
    description: 'Experience the tropical paradise with stunning beaches and rich culture',
    duration: '7 Days / 6 Nights',
    price: 1299,
    rating: 4.9,
    reviews: 2453,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop',
    availableDates: ['2025-11-15', '2025-12-01', '2025-12-15'],
    activities: ['beach', 'culture', 'sightseeing']
  },
  // Add more sample packages as needed
];

// This is the list view of packages
export default function Packages() {
  const [searchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    duration: '',
    rating: 0
  });

  // Get search parameters from URL
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';
  const dateFilter = searchParams.get('date') || '';
  const activitiesFilter = searchParams.get('activities')?.toLowerCase() || '';

  // Fetch packages (in a real app, this would be an API call)
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setPackages(samplePackages);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching packages:', error);
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Filter packages based on search and filters
  useEffect(() => {
    if (packages.length === 0) return;

    const filtered = packages.filter(pkg => {
      // Filter by search query
      const matchesSearch = searchQuery === '' || 
        pkg.title.toLowerCase().includes(searchQuery) ||
        pkg.location.toLowerCase().includes(searchQuery) ||
        pkg.description.toLowerCase().includes(searchQuery);
      
      // Filter by date (if provided)
      const matchesDate = dateFilter === '' || 
        (pkg.availableDates && pkg.availableDates.includes(dateFilter));
      
      // Filter by activities (if provided)
      const matchesActivities = activitiesFilter === '' || 
        (pkg.activities && pkg.activities.some(activity => 
          activity.toLowerCase().includes(activitiesFilter)
        ));

      // Apply additional filters
      const matchesPrice = pkg.price >= filters.priceRange[0] && 
                         pkg.price <= filters.priceRange[1];
      const matchesRating = pkg.rating >= filters.rating;

      return matchesSearch && matchesDate && matchesActivities && 
             matchesPrice && matchesRating;
    });

    setFilteredPackages(filtered);
  }, [searchQuery, dateFilter, activitiesFilter, packages, filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Loading packages...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {searchQuery ? `Search results for "${searchQuery}"` : 'All Travel Packages'}
          </h1>
          <p className="text-muted-foreground">
            {filteredPackages.length} packages found
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          {showFilters ? <X size={16} /> : <Filter size={16} />}
          {showFilters ? 'Hide Filters' : 'Filters'}
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-muted/50 p-6 rounded-lg mb-8">
          <h3 className="font-semibold mb-4">Filter by:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Price Range</label>
              <div className="flex items-center gap-2">
                <span>${filters.priceRange[0]}</span>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <span>${filters.priceRange[1]}+</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Minimum Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleFilterChange('rating', star)}
                    className={`text-2xl ${star <= filters.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Package Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-soft">
                  <span className="font-bold text-primary">${pkg.price}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{pkg.title}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span>{pkg.rating}</span>
                    <span className="text-muted-foreground text-sm">({pkg.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{pkg.location}</span>
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-2">{pkg.description}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Group Tour</span>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link to={`/packages/${pkg.id}`}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-600">
            No packages found matching your search criteria.
          </h2>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or view all packages.
          </p>
        </div>
      )}
    </div>
  );
}