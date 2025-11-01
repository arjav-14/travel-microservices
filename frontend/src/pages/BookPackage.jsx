import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import BookingForm from '@/components/booking/BookingForm';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';

export default function BookPackage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [packageDetails, setPackageDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackageDetails = async (packageId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3002/api/v1/packages/${packageId}`);
      
      if (response.data.success) {
        setPackageDetails(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch package details');
      }
    } catch (err) {
      console.error('Error fetching package:', err);
      setError(err.response?.data?.message || 'Failed to load package details');
      toast.error('Failed to load package details');
      navigate('/packages');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // First try to get from location state (for faster loading if coming from packages list)
    if (location.state?.package) {
      setPackageDetails(location.state.package);
      setIsLoading(false);
      return;
    }

    // If no package in state but we have an ID, fetch from API
    if (id) {
      fetchPackageDetails(id);
    } else {
      setError('No package ID provided');
      setIsLoading(false);
      navigate('/packages');
    }
  }, [id, location.state, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p>Loading package details...</p>
        </div>
      </div>
    );
  }

  if (error || !packageDetails) {
    return (
      <div className="container mx-auto py-12 text-center">
        <div className="text-red-600">{error || 'Package not found'}</div>
        <Button onClick={() => navigate('/packages')} className="mt-4">
          Back to Packages
        </Button>
      </div>
    );
  }

  const handleBookingSuccess = () => {
    navigate('/my-bookings');
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Package
      </Button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
            <p className="text-muted-foreground mb-8">
              Please fill in your details to confirm your booking for {packageDetails.title}.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Your Package</h2>
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={packageDetails.image || `https://placehold.co/400x300?text=${encodeURIComponent(packageDetails.name || 'No+Image')}`}
                        alt={packageDetails.name || 'Package'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://placehold.co/400x300?text=${encodeURIComponent(packageDetails.name || 'No+Image')}`;
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{packageDetails.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {packageDetails.location}
                      </p>
                      <p className="mt-2 font-medium">
                        ${packageDetails.price} <span className="text-sm font-normal text-muted-foreground">per night</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Guest Information</h2>
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium">{user?.name || 'Guest'}</p>
                        <p className="text-sm text-muted-foreground">
                          {user?.email || 'Please log in to see your details'}
                        </p>
                      </div>
                      {!user && (
                        <p className="text-sm text-amber-600">
                          Please log in to continue with your booking
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-muted/50 p-6 rounded-lg sticky top-8">
                  <h2 className="text-xl font-semibold mb-4">Your Booking</h2>
                  <BookingForm 
                    packageDetails={packageDetails} 
                    onSuccess={handleBookingSuccess}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
