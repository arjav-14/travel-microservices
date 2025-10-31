// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Search, MapPin, Calendar } from "lucide-react";
// import heroImage from "@/assets/hero-travel.jpg";

// export const Hero = () => {
//   return (
//     <section className="relative pt-16 min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
//       {/* Background Image with Overlay */}
//       <div className="absolute inset-0 z-0">
//         <img 
//           src={heroImage} 
//           alt="Tropical paradise beach with crystal clear water" 
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 container mx-auto px-4  py-32">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-5xl mt-5  md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
//             Discover Your Next
//             <span className="block gradient-sunset bg-clip-text text-transparent">
//               Adventure
//             </span>
//           </h1>
//           <p className="text-xl md:text-2xl text-white/90 mb-12 drop-shadow-md">
//             Explore breathtaking destinations, create unforgettable memories, 
//             and embark on journeys that will change your life forever.
//           </p>

//           {/* Search Box */}
//           <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-large p-6 mb-8">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//               <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
//                 <MapPin className="text-primary h-5 w-5" />
//                 <Input 
//                   placeholder="Where to?" 
//                   className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
//                 />
//               </div>
//               <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
//                 <Calendar className="text-primary h-5 w-5" />
//                 <Input 
//                   type="date"
//                   className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
//                 />
//               </div>
//               <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
//                 <Search className="text-primary h-5 w-5" />
//                 <Input 
//                   placeholder="Activities" 
//                   className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
//                 />
//               </div>
//             </div>
//             <Button size="xl" variant="hero" className="w-full md:w-auto">
//               <Search className="mr-2 h-5 w-5" />
//               Search Destinations
//             </Button>
//           </div>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
//             <Button size="xl" variant="heroSecondary">
//               Plan Custom Trip
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
//         <div className="animate-bounce">
//           <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
//             <div className="w-1 h-3 bg-white/50 rounded-full"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-travel.jpg";

export const Hero = () => {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    date: '',
    activities: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to packages page with search query
    const query = new URLSearchParams({
      q: searchParams.destination,
      date: searchParams.date,
      activities: searchParams.activities
    }).toString();
    navigate(`/packages?${query}`);
  };

  return (
    <section className="relative pt-16 min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Tropical paradise beach with crystal clear water" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Discover Your Perfect Getaway
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Find and book amazing travel experiences at the best prices
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-large p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <MapPin className="text-primary h-5 w-5" />
                <Input 
                  name="destination"
                  value={searchParams.destination}
                  onChange={handleInputChange}
                  placeholder="Where to?" 
                  className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                  required
                />
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="text-primary h-5 w-5" />
                <Input 
                  name="date"
                  type="date"
                  value={searchParams.date}
                  onChange={handleInputChange}
                  className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Search className="text-primary h-5 w-5" />
                <Input 
                  name="activities"
                  value={searchParams.activities}
                  onChange={handleInputChange}
                  placeholder="Activities" 
                  className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              size="xl" 
              variant="hero" 
              className="w-full md:w-auto"
            >
              <Search className="mr-2 h-5 w-5" />
              Search Destinations
            </Button>
          </form>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl" 
              variant="heroSecondary"
              onClick={() => navigate('/packages')}
            >
              View All Packages
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};