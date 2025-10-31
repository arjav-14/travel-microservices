import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Users } from "lucide-react";

const packages = [
  {
    id: 1,
    name: "Beach Paradise",
    duration: "7 Days",
    travelers: "2-6 People",
    price: "$1,499",
    featured: false,
    includes: [
      "Round-trip flights",
      "5-star beachfront resort",
      "Daily breakfast",
      "Water sports activities",
      "City tours"
    ]
  },
  {
    id: 2,
    name: "Adventure Seeker",
    duration: "10 Days",
    travelers: "2-8 People",
    price: "$2,299",
    featured: true,
    includes: [
      "All flights included",
      "Luxury mountain lodge",
      "All meals included",
      "Hiking & adventure sports",
      "Professional guide",
      "Photography package"
    ]
  },
  {
    id: 3,
    name: "Cultural Explorer",
    duration: "5 Days",
    travelers: "2-4 People",
    price: "$999",
    featured: false,
    includes: [
      "Round-trip flights",
      "Boutique hotel",
      "Daily breakfast",
      "Museum passes",
      "Local guide tours"
    ]
  }
];

export const Packages = () => {
  return (
    <section id="packages" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Travel Packages
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Curated experiences designed to give you the perfect getaway
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`relative overflow-hidden transition-smooth hover:shadow-large ${
                pkg.featured ? 'border-primary border-2' : ''
              }`}
            >
              {pkg.featured && (
                <div className="absolute top-0 right-0">
                  <Badge className="gradient-sunset rounded-tl-none rounded-br-none px-4 py-2">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl mb-4">{pkg.name}</CardTitle>
                <div className="flex items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{pkg.travelers}</span>
                  </div>
                </div>
                <div className="text-4xl font-bold text-primary">
                  {pkg.price}
                  <span className="text-base text-muted-foreground font-normal"> / person</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 mb-6">
                  {pkg.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full" 
                  variant={pkg.featured ? "default" : "outline"}
                  size="lg"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
