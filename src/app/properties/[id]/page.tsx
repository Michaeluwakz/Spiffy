"use client";

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { properties as allProperties, type Property } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import PropertyImageGallery from '@/components/PropertyImageGallery';
import AmenityIcon from '@/components/AmenityIcon';
import { BedDouble, Bath, Users, MapPin, CalendarDays, Star, MessageSquare, ShieldCheck } from 'lucide-react';

export default function PropertyDetailsPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (propertyId) {
      const foundProperty = allProperties.find(p => p.id === propertyId);
      if (foundProperty) {
        setProperty(foundProperty);
      } else {
        // In a real app, you might redirect or show a specific not found component
        // For now, we rely on notFound() from Next.js if data isn't available server-side initially
        // Since this is client-side fetching for now, we'll handle it here
        console.error("Property not found"); 
      }
    }
  }, [propertyId]);

  if (!property) {
     // Handle loading state or if property is definitively not found after attempting to load
    // If this were a server component fetching data, notFound() would be called if data isn't there
    // For client-side, you might show a loading spinner or a message.
    // For simplicity of this example, if it's still null after useEffect, it means not found.
    // A better approach might be to use a loading state.
    if (propertyId && !allProperties.find(p => p.id === propertyId)) {
        notFound(); // This will render the nearest not-found.js or Next.js default 404 page
    }
    return <div className="text-center py-10">Loading property details...</div>;
  }

  return (
    <div className="space-y-8">
      <PropertyImageGallery images={property.images} altText={property.name} />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-headline text-primary">{property.name}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground flex items-center pt-1">
                <MapPin size={20} className="mr-2 text-primary" /> {property.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6 mb-4 text-muted-foreground">
                <span className="flex items-center"><Users size={20} className="mr-1 text-primary" /> Up to {property.guests} guests</span>
                <span className="flex items-center"><BedDouble size={20} className="mr-1 text-primary" /> {property.bedrooms} bedrooms</span>
                <span className="flex items-center"><Bath size={20} className="mr-1 text-primary" /> {property.bathrooms} bathrooms</span>
              </div>
              <p className="text-foreground leading-relaxed font-body">{property.description}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.amenities.map(amenity => (
                  <li key={amenity} className="flex items-center text-foreground">
                    <AmenityIcon amenity={amenity} size={20} className="mr-3 text-primary" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">House Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-foreground font-body">
                {property.houseRules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Meet Your Host</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              <Image 
                src={property.host.avatar} 
                alt={property.host.name} 
                width={80} 
                height={80} 
                className="rounded-full"
                data-ai-hint="person avatar" 
              />
              <div>
                <p className="text-xl font-semibold text-foreground">{property.host.name}</p>
                <Button variant="outline" size="sm" className="mt-1">
                  <MessageSquare size={16} className="mr-2" /> Contact Host
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>

        <div className="md:col-span-1 space-y-6">
          <Card className="shadow-xl rounded-lg sticky top-24 border-2 border-primary/50">
            <CardHeader className="text-center">
              <p className="text-3xl font-bold text-primary font-headline">
                ₦{property.pricePerNight.toLocaleString()}
                <span className="text-base text-muted-foreground font-body"> / night</span>
              </p>
              <div className="flex items-center justify-center text-sm text-muted-foreground mt-1">
                <Star size={16} className="text-accent fill-accent mr-1" />
                {property.rating.toFixed(1)} ({property.reviewsCount} reviews)
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
               {/* Date pickers and guest selection would go here in a real booking form */}
              <div className="p-3 bg-muted/50 rounded-md text-center">
                <p className="text-sm text-muted-foreground">Booking functionality coming soon!</p>
                <p className="text-xs text-muted-foreground">(Select dates and guests on booking page)</p>
              </div>
              <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3">
                <Link href={`/book/${property.id}`}>
                  <CalendarDays size={20} className="mr-2" /> Check Availability & Book
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground text-center flex items-center justify-center">
                <ShieldCheck size={14} className="mr-1 text-primary" /> Secure booking process
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
