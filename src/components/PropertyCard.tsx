import type { Property } from '@/lib/placeholder-data';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BedDouble, Bath, Users, MapPin, HomeIcon as PropertyTypeIcon, Star } from 'lucide-react';
import AmenityIcon from './AmenityIcon';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg">
      <CardHeader className="p-0 relative">
        <Link href={`/properties/${property.id}`} className="block">
          <Image
            src={property.mainImage}
            alt={property.name}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint={`${property.propertyType.toLowerCase()} exterior`}
          />
        </Link>
        <Badge variant="secondary" className="absolute top-2 right-2 bg-accent text-accent-foreground">
          {property.propertyType}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/properties/${property.id}`}>
          <CardTitle className="text-xl mb-2 font-headline hover:text-primary transition-colors">{property.name}</CardTitle>
        </Link>
        <div className="text-sm text-muted-foreground mb-3 flex items-center">
          <MapPin size={16} className="mr-1 text-primary" />
          {property.location}
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm mb-3">
          <div className="flex items-center text-muted-foreground"><BedDouble size={16} className="mr-1 text-primary" /> {property.bedrooms} Beds</div>
          <div className="flex items-center text-muted-foreground"><Bath size={16} className="mr-1 text-primary" /> {property.bathrooms} Baths</div>
          <div className="flex items-center text-muted-foreground"><Users size={16} className="mr-1 text-primary" /> {property.guests} Guests</div>
        </div>
        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-1">Key Amenities:</p>
          <div className="flex flex-wrap gap-2">
            {property.amenities.slice(0, 3).map(amenity => (
              <AmenityIcon key={amenity} amenity={amenity} size={18} showTooltip={true} />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <div>
          <p className="text-lg font-bold text-primary font-headline">
            ₦{property.pricePerNight.toLocaleString()}
            <span className="text-xs text-muted-foreground font-body">/night</span>
          </p>
          <div className="flex items-center text-xs text-muted-foreground">
            <Star size={14} className="text-accent fill-accent mr-1" />
            {property.rating.toFixed(1)} ({property.reviewsCount} reviews)
          </div>
        </div>
        <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
          <Link href={`/properties/${property.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
