// // import { Card, CardContent } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { MapPin, Star } from "lucide-react";
// // import { useNavigate } from "react-router-dom";
// // import { useState } from "react";
// // const destinations = [
// //   {
// //     id: 1,
// //     name: "Bali, Indonesia",
// //     description: "Tropical paradise with stunning beaches and rich culture",
// //     rating: 4.9,
// //     reviews: 2453,
// //     price: "$899",
// //     image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop"
// //   },
// //   {
// //     id: 2,
// //     name: "Santorini, Greece",
// //     description: "Iconic white buildings overlooking the Aegean Sea",
// //     rating: 4.8,
// //     reviews: 1876,
// //     price: "$1,299",
// //     image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&auto=format&fit=crop"
// //   },
// //   {
// //     id: 3,
// //     name: "Maldives",
// //     description: "Luxury overwater villas in crystal clear waters",
// //     rating: 5.0,
// //     reviews: 3124,
// //     price: "$1,899",
// //     image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop"
// //   },
// //   {
// //     id: 4,
// //     name: "Kyoto, Japan",
// //     description: "Ancient temples and stunning cherry blossoms",
// //     rating: 4.7,
// //     reviews: 1654,
// //     price: "$1,099",
// //     image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop"
// //   },
// //   {
// //     id: 5,
// //     name: "Swiss Alps",
// //     description: "Majestic mountains and pristine alpine villages",
// //     rating: 4.9,
// //     reviews: 2198,
// //     price: "$1,499",
// //     image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop"
// //   },
// //   {
// //     id: 6,
// //     name: "Dubai, UAE",
// //     description: "Futuristic cityscape with world-class luxury",
// //     rating: 4.6,
// //     reviews: 2876,
// //     price: "$1,199",
// //     image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop"
// //   }
// // ];

// // export const Destinations = () => {

// //   const [showAll, setShowAll] = useState(false);
// // const displayDestinations = showAll ? destinations : destinations.slice(0, 3);
// //   const navigate = useNavigate();

// //   const handleViewDetails = (destination) => {
// //     // Convert the destination name to a URL-friendly format
// //     const packageId = destination.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
// //     navigate(`/packages/${packageId}`);
// //   };

// //   return (
// //     <section id="destinations" className="py-20 bg-gradient-ocean">
// //     <div className="container mx-auto px-4">
// //       {/* Header section */}
// //       <div className="text-center mb-16">
// //         <h2 className="text-4xl md:text-5xl font-bold mb-4">
// //           Popular Destinations
// //         </h2>
// //         <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
// //           Discover the world's most breathtaking locations
// //         </p>
// //       </div>

// //       {/* Destinations grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //         {displayDestinations.map((destination) => (
// //           <Card 
// //             key={destination.id} 
// //             className="overflow-hidden group hover:shadow-large transition-smooth cursor-pointer border-0"
// //             onClick={() => handleViewDetails(destination)}
// //           >
// //             {/* Card content */}
// //             <div className="relative overflow-hidden h-64">
// //               <img 
// //                 src={destination.image} 
// //                 alt={destination.name}
// //                 className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
// //               />
// //               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-soft">
// //                 <span className="font-bold text-primary">{destination.price}</span>
// //               </div>
// //             </div>
// //             <CardContent className="p-6">
// //               {/* Destination name and location */}
// //               <div className="mb-4">
// //                 <div className="flex items-center gap-2 mb-2">
// //                   <MapPin className="h-5 w-5 text-primary" />
// //                   <h3 className="text-xl font-bold">{destination.name}</h3>
// //                 </div>
// //                 <p className="text-muted-foreground text-sm">
// //                   {destination.description}
// //                 </p>
// //               </div>
              
// //               {/* Rating and reviews */}
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-2">
// //                   <Star className="h-5 w-5 fill-secondary text-secondary" />
// //                   <span className="font-semibold">{destination.rating}</span>
// //                   <span className="text-muted-foreground text-sm">
// //                     ({destination.reviews} reviews)
// //                   </span>
// //                 </div>
// //                 <Button 
// //                   variant="ghost" 
// //                   size="sm" 
// //                   className="text-primary"
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     handleViewDetails(destination);
// //                   }}
// //                 >
// //                   View Details →
// //                 </Button>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         ))}
// //       </div>

// //       {/* View All Button - Outside the grid */}
// //       <div className="text-center mt-12">
// //         <Button 
// //           size="lg" 
// //           variant="default"
// //           onClick={() => setShowAll(!showAll)}
// //         >
// //           {showAll ? 'Show Less' : 'View All Destinations'}
// //         </Button>
// //       </div>
// //     </div>
// //   </section>
// //   );
// // };


// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MapPin, Star, Loader2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const Destinations = () => {
//   const [destinations, setDestinations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDestinations = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/v1/destinations");
//         setDestinations(response.data.data);
//       } catch (err) {
//         console.error("Error fetching destinations:", err);
//         setError("Failed to load destinations. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDestinations();
//   }, []);

//   const handleViewDetails = (id) => {
//     navigate(`/destinations/${id}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-8">
//         <p className="text-red-500">{error}</p>
//         <Button 
//           onClick={() => window.location.reload()} 
//           className="mt-4"
//           variant="outline"
//         >
//           Retry
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {destinations.map((destination) => (
//           <Card key={destination._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
//             <div className="relative h-64">
//               <img
//                 src={destination.photo}
//                 alt={destination.name}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//                 <h3 className="text-xl font-bold text-white">{destination.name}</h3>
//                 <div className="flex items-center text-yellow-400 mt-1">
//                   <Star className="w-4 h-4 fill-current" />
//                   <span className="ml-1 text-sm">
//                     {destination.rating} ({destination.reviews?.toLocaleString() || 0} reviews)
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <CardContent className="p-6">
//               <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center text-sm text-gray-500">
//                   <MapPin className="w-4 h-4 mr-1" />
//                   <span>{destination.location?.city || destination.location?.country || 'N/A'}</span>
//                 </div>
//                 <Button 
//                   onClick={() => handleViewDetails(destination._id)}
//                   variant="outline"
//                 >
//                   View Details
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export { Destinations };


// src/components/Destinations.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/v1/destinations");
        setDestinations(response.data.data);
      } catch (err) {
        console.error("Error fetching destinations:", err);
        setError("Failed to load destinations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const displayDestinations = showAll ? destinations : destinations.slice(0, 3);

  // const handleViewDetails = (id) => {
  //   navigate(`/destinations/${id}`);
  // };
  const handleViewDetails = (id) => {
  console.log('Navigating to destination ID:', id); // Add this for debugging
  navigate(`/destinations/${id}`);
};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <section id="destinations" className="py-20 bg-gradient-ocean">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Popular Destinations</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the world's most breathtaking locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayDestinations.map((destination) => (
            <Card key={destination._id} className="overflow-hidden group hover:shadow-large transition-smooth">
              <div className="relative h-64">
                <img
                  src={destination.photo}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm">
                      {destination.rating} ({destination.reviews?.toLocaleString() || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{destination.location?.city || destination.location?.country || 'N/A'}</span>
                  </div>
                  <Button 
                    onClick={() => handleViewDetails(destination._id)}
                    variant="outline"
                    size="sm"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {destinations.length > 3 && (
          <div className="text-center mt-12">
            <Button 
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              size="lg"
            >
              {showAll ? 'Show Less' : 'View All Destinations'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export { Destinations };