import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getBookings } from '@/services/bookingService';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Pass user ID to filter bookings (use _id from MongoDB)
      const userId = user?._id || user?.id;
      console.log('Fetching bookings for user:', userId);
      const data = await getBookings(userId);
      console.log('Fetched bookings:', data);
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error in fetchBookings:', err);
      setError('Failed to load bookings. Please try again later.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    } else {
      navigate('/login');
    }
  }, [user, navigate, fetchBookings]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
          <div className="h-24 bg-gray-100 rounded-lg w-full max-w-2xl mx-auto"></div>
          <div className="h-24 bg-gray-100 rounded-lg w-full max-w-2xl mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button 
            onClick={fetchBookings}
            className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-1 px-3 rounded text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const safeBookings = Array.isArray(bookings) ? bookings : [];

  return (
    <div className="container mx-auto py-12 px-4">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      {safeBookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You don't have any bookings yet.</p>
          <Button onClick={() => navigate('/packages')}>
            Explore Packages
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {safeBookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    {booking.package?.name || 'Package Name Not Available'}
                  </h3>
                  <p className="text-gray-600">
                    {booking.startDate && booking.endDate ? (
                      <>
                        {new Date(booking.startDate).toLocaleDateString()} -{' '}
                        {new Date(booking.endDate).toLocaleDateString()}
                      </>
                    ) : 'Date not specified'}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Status:</span>{' '}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        booking.paymentStatus === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {booking.paymentStatus || 'pending'}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    ${booking.totalPrice?.toFixed(2) || '0.00'}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => booking._id && navigate(`/bookings/${booking._id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
