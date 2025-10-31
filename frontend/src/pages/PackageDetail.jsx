import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, MapPin, Star, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import BookingForm from '@/components/booking/BookingForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch package details
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/packages/${id}`);
        // const data = await response.json();
        // setPackage(data);
        
        // Mock data for now
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockPackage = {
          id,
          title: 'Bali Paradise',
          location: 'Bali, Indonesia',
          description: 'Experience the tropical paradise with stunning beaches and rich culture. This package includes luxury accommodation, guided tours, and authentic cultural experiences.',
          duration: '7 Days / 6 Nights',
          price: 1299,
          rating: 4.9,
          reviews: 2453,
          image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop',
          highlights: [
            'Private villa with ocean view',
            'Daily breakfast included',
            'Airport transfers',
            'Guided tours to Uluwatu Temple',
            'Snorkeling at Nusa Penida'
          ],
          itinerary: [
            { day: 1, title: 'Arrival in Bali', description: 'Airport pickup and check-in at your luxury villa' },
            { day: 2, title: 'Ubud Tour', description: 'Visit the Sacred Monkey Forest and Tegalalang Rice Terrace' },
            // Add more days as needed
          ]
        };
        setPackage(mockPackage);
      } catch (error) {
        console.error('Error fetching package:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  const handleBookNow = () => {
    navigate(`/book/package/${id}`, {
      state: {
        packageDetails: pkg
      }
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 text-center">
        <div className="animate-pulse">Loading package details...</div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Package not found</h2>
        <Button onClick={() => navigate('/packages')}>
          Back to Packages
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Packages
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{pkg.title}</h1>
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{pkg.location}</span>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                <span>{pkg.rating} ({pkg.reviews} reviews)</span>
              </div>
            </div>
            <p className="text-muted-foreground">{pkg.description}</p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                      <Clock className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{pkg.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                      <Users className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Group Size</p>
                        <p className="font-medium">Up to 20 people</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Highlights</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {pkg.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="itinerary" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {pkg.itinerary.map((day) => (
                      <div key={day.day} className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-medium">{day.day}</span>
                          </div>
                          {day.day < pkg.itinerary.length && (
                            <div className="w-px h-full bg-border my-2"></div>
                          )}
                        </div>
                        <div className="pb-6">
                          <h3 className="font-medium">{day.title}</h3>
                          <p className="text-muted-foreground text-sm">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Reviews</h3>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-medium">{pkg.rating}</span>
                        <span className="text-muted-foreground ml-1">({pkg.reviews} reviews)</span>
                      </div>
                    </div>
                    <Button variant="outline">Write a Review</Button>
                  </div>
                  
                  <div className="space-y-6 mt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">John Doe</h4>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star}
                                  className={`h-4 w-4 ${star <= 5 ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">2 weeks ago</span>
                        </div>
                        <p className="mt-2 text-sm">Amazing experience! The tour guides were knowledgeable and the locations were breathtaking.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:sticky lg:top-24 self-start">
          <BookingForm 
            package={pkg} 
            destination={{ 
              _id: 'bali', 
              name: pkg.location,
              location: pkg.location
            }} 
          />
        </div>
      </div>
    </div>
  );
}
