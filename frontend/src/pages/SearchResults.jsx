import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Users, Star, Clock } from 'lucide-react';
import { useSearch } from '@/contexts/SearchContext';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const { searchResults, isLoading, error } = useSearch();
  const [filteredResults, setFilteredResults] = useState([]);

  // Mock data - in a real app, this would come from your API
  const mockDestinations = [
    {
      id: 1,
      title: 'Bali Adventure Package',
      description: 'Experience the beauty of Bali with our exclusive adventure package.',
      location: 'Bali, Indonesia',
      duration: '7 days',
      price: 1299,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000',
      activities: ['Surfing', 'Temples', 'Hiking'],
      startDate: '2023-12-15'
    },
    // Add more mock data as needed
  ];

  useEffect(() => {
    // In a real app, you would fetch search results based on URL params
    // For now, we'll filter our mock data
    const destination = searchParams.get('destination')?.toLowerCase();
    const activities = searchParams.get('activities')?.toLowerCase();
    const date = searchParams.get('date');

    let results = [...mockDestinations];

    if (destination) {
      results = results.filter(dest => 
        dest.title.toLowerCase().includes(destination) ||
        dest.location.toLowerCase().includes(destination)
      );
    }

    if (activities) {
      results = results.filter(dest =>
        dest.activities.some(activity =>
          activity.toLowerCase().includes(activities)
        )
      );
    }

    if (date) {
      // Simple date filtering - in a real app, you'd want more sophisticated date handling
      results = results.filter(dest => {
        const destDate = new Date(dest.startDate);
        const searchDate = new Date(date);
        return destDate >= searchDate;
      });
    }

    setFilteredResults(results);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="container py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-lg">Searching for your perfect destination...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 text-center">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg inline-block">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground">
          {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'} found
          {searchParams.get('destination') && ` for "${searchParams.get('destination')}"`}
        </p>
      </div>

      {filteredResults.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResults.map((destination) => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img 
                  src={destination.image} 
                  alt={destination.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{destination.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {destination.location}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-2">{destination.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.activities.slice(0, 3).map((activity, i) => (
                    <span 
                      key={i}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {destination.duration}
                  </div>
                  <span className="text-lg font-bold">${destination.price}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link to={`/packages/${destination.id}`}>View Details</Link>
                </Button>
                <Button asChild>
                  <Link to={`/book/${destination.id}`}>Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-muted/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No destinations found</h3>
          <p className="text-muted-foreground mb-6">
            We couldn't find any destinations matching your search. Try adjusting your filters.
          </p>
          <Button asChild>
            <Link to="/">Clear search</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
