import { useState } from 'react';
import { Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { createBooking } from '@/services/bookingService';

export default function BookingForm({ packageDetails, onSuccess }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    guests: 1,
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bookingData = {
        user: user?._id || user?.id, // Include user ID for backend
        package: packageDetails.id || packageDetails._id,
        startDate: formData.startDate,
        endDate: formData.endDate,
        guests: formData.guests,
        specialRequests: formData.specialRequests,
        totalPrice: calculateTotalPrice()
      };

      console.log('Creating booking with data:', bookingData);
      await createBooking(bookingData);
      toast({
        title: 'Booking successful!',
        description: 'Your booking has been confirmed.',
        variant: 'default'
      });
      onSuccess?.();
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: 'Booking failed',
        description: error.response?.data?.message || 'Failed to create booking',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotalPrice = () => {
    if (!formData.startDate || !formData.endDate) return packageDetails.price;
    const nights = (new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24);
    return packageDetails.price * (nights || 1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Check-in</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                id="startDate"
                name="startDate"
                type="date"
                className="pl-10"
                min={new Date().toISOString().split('T')[0]}
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">Check-out</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                id="endDate"
                name="endDate"
                type="date"
                className="pl-10"
                min={formData.startDate || new Date().toISOString().split('T')[0]}
                value={formData.endDate}
                onChange={handleChange}
                disabled={!formData.startDate}
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests">Guests</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <select
              id="guests"
              name="guests"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.guests}
              onChange={handleChange}
              required
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows="3"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.specialRequests}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between border-t border-gray-200 pt-4">
          <span>Total:</span>
          <span className="font-semibold">${calculateTotalPrice().toFixed(2)}</span>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </div>
    </form>
  );
}
