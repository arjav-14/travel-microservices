// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { ArrowRight, Filter, X, Search , ChevronDown} from 'lucide-react';

// const packageData = [
//   {
//     id: 'paris-getaway',
//     title: 'Paris Getaway',
//     location: 'Paris, France',
//     duration: '5 Days / 4 Nights',
//     price: 1299,
//     rating: 4.8,
//     reviews: 124,
//     image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1000',
//     type: 'popular'
//   },
//   {
//     id: 'tokyo-adventure',
//     title: 'Tokyo Adventure',
//     location: 'Tokyo, Japan',
//     duration: '7 Days / 6 Nights',
//     price: 1599,
//     rating: 4.9,
//     reviews: 87,
//     image: 'https://images.unsplash.com/photo-1492571350019-22cd083bbd7b?q=80&w=1000',
//     type: 'adventure'
//   },
//   {
//     id: 'bali-paradise',
//     title: 'Bali Paradise',
//     location: 'Bali, Indonesia',
//     duration: '8 Days / 7 Nights',
//     price: 1499,
//     rating: 4.9,
//     reviews: 215,
//     image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000',
//     type: 'beach'
//   },
//   {
//     id: 'rome-historical',
//     title: 'Rome Historical Tour',
//     location: 'Rome, Italy',
//     duration: '6 Days / 5 Nights',
//     price: 1399,
//     rating: 4.7,
//     reviews: 178,
//     image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=1000',
//     type: 'cultural'
//   },
//   {
//     id: 'maldives-luxury',
//     title: 'Maldives Luxury Escape',
//     location: 'Maldives',
//     duration: '7 Days / 6 Nights',
//     price: 2999,
//     rating: 4.9,
//     reviews: 342,
//     image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1000',
//     type: 'luxury'
//   },
//   {
//     id: 'new-york-city',
//     title: 'New York City Explorer',
//     location: 'New York, USA',
//     duration: '5 Days / 4 Nights',
//     price: 1899,
//     rating: 4.6,
//     reviews: 198,
//     image: 'https://images.unsplash.com/photo-1499092346589-2e6f9f5a3b3e?q=80&w=1000',
//     type: 'city'
//   },
//   {
//     id: 'safari-kenya',
//     title: 'Kenyan Safari Adventure',
//     location: 'Nairobi, Kenya',
//     duration: '10 Days / 9 Nights',
//     price: 3499,
//     rating: 4.9,
//     reviews: 156,
//     image: 'https://images.unsplash.com/photo-1523805009345-7448405a9f53?q=80&w=1000',
//     type: 'adventure'
//   },
//   {
//     id: 'kyoto-temple',
//     title: 'Kyoto Temple Tour',
//     location: 'Kyoto, Japan',
//     duration: '6 Days / 5 Nights',
//     price: 2199,
//     rating: 4.8,
//     reviews: 132,
//     image: 'https://images.unsplash.com/photo-1492571350019-22cd083bbd7b?q=80&w=1000',
//     type: 'cultural'
//   }
// ];

// export default function Packages() {
//   const [filters, setFilters] = useState({
//     search: '',
//     type: '',
//     minPrice: '',
//     maxPrice: '',
//     sortBy: 'popular'
//   });
//   const [showFilters, setShowFilters] = useState(false);
  
//   const filteredPackages = packageData.filter(pkg => {
//     const matchesSearch = pkg.title.toLowerCase().includes(filters.search.toLowerCase()) ||
//                          pkg.location.toLowerCase().includes(filters.search.toLowerCase());
//     const matchesType = !filters.type || pkg.type === filters.type;
//     const matchesPrice = (!filters.minPrice || pkg.price >= Number(filters.minPrice)) &&
//                         (!filters.maxPrice || pkg.price <= Number(filters.maxPrice));
    
//     return matchesSearch && matchesType && matchesPrice;
//   });

//   const sortedPackages = [...filteredPackages].sort((a, b) => {
//     if (filters.sortBy === 'price-low') return a.price - b.price;
//     if (filters.sortBy === 'price-high') return b.price - a.price;
//     return b.rating - a.rating; // Default sort by rating
//   });

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       search: '',
//       type: '',
//       minPrice: '',
//       maxPrice: '',
//       sortBy: 'popular'
//     });
//   };

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Explore Packages</h1>
//           <p className="text-gray-600 mt-2">Find your perfect travel experience</p>
//         </div>
//         <div className="flex gap-4 mt-4 md:mt-0">
//           <Button 
//             variant="outline" 
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-2"
//           >
//             {showFilters ? <X size={16} /> : <Filter size={16} />}
//             {showFilters ? 'Hide Filters' : 'Filters'}
//           </Button>
//           <div className="relative">
//             <select
//               name="sortBy"
//               value={filters.sortBy}
//               onChange={handleFilterChange}
//               className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="popular">Sort by: Popular</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//             </select>
//             <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//               <ChevronDown className="h-4 w-4 text-gray-500" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {showFilters && (
//         <div className="bg-gray-50 p-6 rounded-lg mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <input
//                   type="text"
//                   name="search"
//                   value={filters.search}
//                   onChange={handleFilterChange}
//                   placeholder="Search packages..."
//                   className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Package Type</label>
//               <select
//                 name="type"
//                 value={filters.type}
//                 onChange={handleFilterChange}
//                 className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               >
//                 <option value="">All Types</option>
//                 <option value="popular">Popular</option>
//                 <option value="adventure">Adventure</option>
//                 <option value="beach">Beach</option>
//                 <option value="cultural">Cultural</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
//               <input
//                 type="number"
//                 name="minPrice"
//                 value={filters.minPrice}
//                 onChange={handleFilterChange}
//                 placeholder="Min price"
//                 className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
//               <input
//                 type="number"
//                 name="maxPrice"
//                 value={filters.maxPrice}
//                 onChange={handleFilterChange}
//                 placeholder="Max price"
//                 className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//           <div className="mt-4 flex justify-end">
//             <Button variant="ghost" onClick={resetFilters}>
//               Reset Filters
//             </Button>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {sortedPackages.map((pkg) => (
//           <div key={pkg.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//             <div className="relative h-48">
//               <img
//                 src={pkg.image}
//                 alt={pkg.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//               <div className="absolute bottom-4 left-4 right-4">
//                 <div className="flex justify-between items-end">
//                   <div>
//                     <h3 className="text-white text-xl font-bold">{pkg.title}</h3>
//                     <p className="text-gray-200 text-sm">{pkg.location}</p>
//                   </div>
//                   <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
//                     ${pkg.price}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center">
//                   <div className="flex text-yellow-400">
//                     {'★'.repeat(Math.floor(pkg.rating))}
//                     {'☆'.repeat(5 - Math.floor(pkg.rating))}
//                   </div>
//                   <span className="ml-2 text-sm text-gray-600">
//                     {pkg.rating} ({pkg.reviews} reviews)
//                   </span>
//                 </div>
//                 <span className="text-sm text-gray-500">{pkg.duration}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <Button asChild className="w-full">
//                   <Link to={`/packages/${pkg.id}`}>
//                     View Details <ArrowRight className="ml-2 h-4 w-4" />
//                   </Link>
//                 </Button>
//                 <Button asChild>
//                   <Link to={`/book/${pkg.id}`} className="flex items-center">
//                     Book Now
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {sortedPackages.length === 0 && (
//         <div className="text-center py-12">
//           <h3 className="text-lg font-medium text-gray-900">No packages found</h3>
//           <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
//           <Button variant="outline" onClick={resetFilters} className="mt-4">
//             Clear all filters
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Filter, X, Search, ChevronDown } from "lucide-react";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "popular",
  });

  const [showFilters, setShowFilters] = useState(false);

  // ✅ Fetch packages from backend API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("http://localhost:3004/api/v1/packages");
        if (!res.ok) throw new Error("Failed to fetch packages");
        const response = await res.json();
        console.log("API Response:", response);
        
        if (response.success && Array.isArray(response.data)) {
          console.log("Packages data:", response.data);
          setPackages(response.data);
        } else {
          throw new Error("Invalid data format from server");
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const filteredPackages = packages.filter((pkg) => {
  // If no filters are active, show all packages
  if (!filters.search?.trim() && !filters.type && !filters.minPrice && !filters.maxPrice) {
    return true;
  }

  // Search term matching (case-insensitive)
  const searchTerm = (filters.search || '').toLowerCase().trim();
  if (searchTerm) {
    const title = (pkg.name || '').toLowerCase();
    const description = (pkg.description || '').toLowerCase();
    
    // If search term doesn't match either title or description, filter out
    if (!title.includes(searchTerm) && !description.includes(searchTerm)) {
      return false;
    }
  }
  
  // Type filter
  if (filters.type && pkg.type?.toLowerCase() !== filters.type.toLowerCase()) {
    return false;
  }
  
  // Price range filter
  const price = Number(pkg.price) || 0;
  const minPrice = Number(filters.minPrice) || 0;
  const maxPrice = Number(filters.maxPrice) || Infinity;
  
  if (price < minPrice || price > maxPrice) {
    return false;
  }
  
  return true;
});

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    const priceA = Number(a.price) || 0;
    const priceB = Number(b.price) || 0;
    const ratingA = Number(a.rating) || 0;
    const ratingB = Number(b.rating) || 0;
    
    if (filters.sortBy === "price-low") return priceA - priceB;
    if (filters.sortBy === "price-high") return priceB - priceA;
    return ratingB - ratingA; // default sort by rating
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      type: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "popular",
    });
  };

  // Function to get the first image URL from the package
  const getFirstImage = (images) => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      return '/images/placeholder.jpg';
    }
    return images[0].url || '/images/placeholder.jpg';
  };

  if (loading)
    return <div className="text-center py-20 text-lg">Loading packages...</div>;

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        Error: {error}
      </div>
    );
  }

  // If no packages after filtering
  if (sortedPackages.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No packages found</h2>
        <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
        <Button onClick={resetFilters} variant="outline">
          Clear all filters
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explore Packages</h1>
          <p className="text-gray-600 mt-2">Find your perfect travel experience</p>
        </div>

        <div className="flex gap-4 mt-4 md:mt-0">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            {showFilters ? <X size={16} /> : <Filter size={16} />}
            {showFilters ? "Hide Filters" : "Filters"}
          </Button>

          <div className="relative">
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="popular">Sort by: Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search packages..."
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Package Type
              </label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="popular">Popular</option>
                <option value="adventure">Adventure</option>
                <option value="beach">Beach</option>
                <option value="cultural">Cultural</option>
                <option value="luxury">Luxury</option>
                <option value="city">City</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Price
              </label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min price"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Price
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max price"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="ghost" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
      )}

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPackages.map((pkg) => {
          const price = Number(pkg.price || 0).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          });

          return (
            <div
              key={pkg._id}
              data-testid="package-card"
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="relative h-48 flex-shrink-0">
                <img
                  src={getFirstImage(pkg.images)}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 data-testid="package-title" className="text-white text-xl font-bold">
                    {pkg.name}
                  </h3>
                      <p data-testid="package-location" className="text-gray-200 text-sm">
                    {pkg.destination}
                  </p>
                    </div>
                    <span 
                      data-testid="package-price"
                      className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {price}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {pkg.description || 'No description available'}
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {"★".repeat(Math.floor(pkg.rating || 0))}
                      {"☆".repeat(5 - Math.floor(pkg.rating || 0))}
                    </div>
                    {pkg.reviews > 0 && (
                      <span className="ml-2 text-sm text-gray-600">
                        ({pkg.reviews} reviews)
                      </span>
                    )}
                  </div>
                  {pkg.duration && (
                    <span className="text-sm text-gray-500">{pkg.duration} days</span>
                  )}
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <Button asChild variant="outline" className="flex-1">
                    <Link to={`/packages/${pkg._id}`} className="text-center">
                      View Details
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 ml-2">
                    <Link 
                      to={{
                        pathname: `/book/package/${pkg._id}`,
                        state: { package: pkg }
                      }} 
                      className="flex items-center justify-center"
                    >
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

