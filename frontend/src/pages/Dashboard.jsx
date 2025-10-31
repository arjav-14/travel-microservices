import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleExploreDestinations = () => {
    navigate('/destinations');
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Explorer'}!</h1>
        <p className="text-muted-foreground">Start planning your next adventure</p>
      </div>

      <div className="grid gap-6">
        {/* Get Started */}
        <Card className="border-2 border-dashed">
          <CardContent className="p-12 text-center">
            <MapPin className="mx-auto h-16 w-16 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ready to explore?</h2>
            <p className="text-muted-foreground mb-6">Discover amazing destinations and plan your perfect trip</p>
            <Button size="lg" onClick={handleExploreDestinations}>
              Browse Destinations
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Plan a New Trip</h3>
              <p className="text-sm text-muted-foreground">Start planning your next adventure</p>
            </CardContent>
          </Card>
          
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-blue-500/10 rounded-full mb-3">
                <MapPin className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-medium">Saved Destinations</h3>
              <p className="text-sm text-muted-foreground">View your saved places</p>
            </CardContent>
          </Card>
          
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-green-500/10 rounded-full mb-3">
                <Clock className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-medium">Past Trips</h3>
              <p className="text-sm text-muted-foreground">Relive your travel memories</p>
            </CardContent>
          </Card>
          
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-purple-500/10 rounded-full mb-3">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-medium">Travel Buddies</h3>
              <p className="text-sm text-muted-foreground">Connect with fellow travelers</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
