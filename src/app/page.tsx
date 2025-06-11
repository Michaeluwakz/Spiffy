
"use client";

import { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import SearchFilters, { type SearchCriteria } from '@/components/SearchFilters';
import { properties as allProperties, type Property } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties.slice(0, 6)); // Initially show some properties
  const [displayedCount, setDisplayedCount] = useState(6);
  const propertiesPerPage = 6;
  const [lastSearchCriteria, setLastSearchCriteria] = useState<SearchCriteria | null>(null);


  const initialSearchCriteria: SearchCriteria = {
    location: '',
    propertyType: 'Any',
    priceRange: [0, 500000],
    amenities: [],
    guests: 1,
    bedrooms: 'Any',
  };

  useEffect(() => {
    // Initialize lastSearchCriteria with initialSearchCriteria on mount
    setLastSearchCriteria(initialSearchCriteria);
  }, []);


  const handleSearch = (criteria: SearchCriteria) => {
    console.log('Search Criteria:', criteria);
    setLastSearchCriteria(criteria); // Store the latest criteria
    let tempProperties = allProperties;

    if (criteria.location) {
      tempProperties = tempProperties.filter(p => p.location.toLowerCase().includes(criteria.location.toLowerCase()));
    }
    if (criteria.propertyType && criteria.propertyType !== 'Any') {
      tempProperties = tempProperties.filter(p => p.propertyType === criteria.propertyType);
    }
    tempProperties = tempProperties.filter(p => p.pricePerNight >= criteria.priceRange[0] && p.pricePerNight <= criteria.priceRange[1]);
    
    if (criteria.amenities.length > 0) {
      tempProperties = tempProperties.filter(p => criteria.amenities.every(am => p.amenities.includes(am)));
    }
    if (criteria.guests > 0) {
        tempProperties = tempProperties.filter(p => p.guests >= criteria.guests);
    }

    if (criteria.bedrooms && criteria.bedrooms !== 'Any') {
      const numBedrooms = criteria.bedrooms;
      if (numBedrooms === 'Studio') {
        tempProperties = tempProperties.filter(p => p.bedrooms === 0);
      } else if (numBedrooms === '4+') {
        tempProperties = tempProperties.filter(p => p.bedrooms >= 4);
      } else {
        const bedCount = parseInt(numBedrooms, 10);
        if (!isNaN(bedCount)) {
          tempProperties = tempProperties.filter(p => p.bedrooms === bedCount);
        }
      }
    }

    setFilteredProperties(tempProperties.slice(0, propertiesPerPage));
    setDisplayedCount(propertiesPerPage);
  };

  const loadMoreProperties = () => {
    const newCount = displayedCount + propertiesPerPage;
    
    // Use the stored lastSearchCriteria for filtering
    const criteriaToUse = lastSearchCriteria || initialSearchCriteria;
    let currentBaseProperties = allProperties;

    if (criteriaToUse.location) {
        currentBaseProperties = currentBaseProperties.filter(p => p.location.toLowerCase().includes(criteriaToUse.location.toLowerCase()));
    }
    if (criteriaToUse.propertyType && criteriaToUse.propertyType !== 'Any') {
        currentBaseProperties = currentBaseProperties.filter(p => p.propertyType === criteriaToUse.propertyType);
    }
    currentBaseProperties = currentBaseProperties.filter(p => p.pricePerNight >= criteriaToUse.priceRange[0] && p.pricePerNight <= criteriaToUse.priceRange[1]);
    if (criteriaToUse.amenities.length > 0) {
        currentBaseProperties = currentBaseProperties.filter(p => criteriaToUse.amenities.every((am: string) => p.amenities.includes(am)));
    }
    if (criteriaToUse.guests > 0) {
        currentBaseProperties = currentBaseProperties.filter(p => p.guests >= criteriaToUse.guests);
    }
    if (criteriaToUse.bedrooms && criteriaToUse.bedrooms !== 'Any') {
        const numBedrooms = criteriaToUse.bedrooms;
        if (numBedrooms === 'Studio') currentBaseProperties = currentBaseProperties.filter(p => p.bedrooms === 0);
        else if (numBedrooms === '4+') currentBaseProperties = currentBaseProperties.filter(p => p.bedrooms >= 4);
        else {
            const bedCount = parseInt(numBedrooms, 10);
            if (!isNaN(bedCount)) currentBaseProperties = currentBaseProperties.filter(p => p.bedrooms === bedCount);
        }
    }
    
    setFilteredProperties(currentBaseProperties.slice(0, newCount));
    setDisplayedCount(newCount);
  };
  
  const canLoadMore = () => {
    if (!lastSearchCriteria) return false;

    const criteriaToUse = lastSearchCriteria;
    let potentiallyLoadableProperties = allProperties;

    if (criteriaToUse.location) {
      potentiallyLoadableProperties = potentiallyLoadableProperties.filter(p => p.location.toLowerCase().includes(criteriaToUse.location.toLowerCase()));
    }
    if (criteriaToUse.propertyType && criteriaToUse.propertyType !== 'Any') {
      potentiallyLoadableProperties = potentiallyLoadableProperties.filter(p => p.propertyType === criteriaToUse.propertyType);
    }
    potentiallyLoadableProperties = potentiallyLoadableProperties.filter(p => p.pricePerNight >= criteriaToUse.priceRange[0] && p.pricePerNight <= criteriaToUse.priceRange[1]);
    if (criteriaToUse.amenities.length > 0) {
      potentiallyLoadableProperties = potentiallyLoadableProperties.filter(p => criteriaToUse.amenities.every((am: string) => p.amenities.includes(am)));
    }
    if (criteriaToUse.guests > 0) {
      potentiallyLoadableProperties = potentiallyLoadableProperties.filter(p => p.guests >= criteriaToUse.guests);
    }
    if (criteriaToUse.bedrooms && criteriaToUse.bedrooms !== 'Any') {
      const numBedrooms = criteriaToUse.bedrooms;
      if (numBedrooms === 'Studio') potentiallyLoadableProperties = potentiallyLoadableProperties.filter(p => p.bedrooms === 0);
      else if (numBedrooms === '4+') potentiallyLoadableProperties = potentiallyLoadableProperties.filter(p => p.bedrooms >= 4);
      else {
          const bedCount = parseInt(numBedrooms, 10);
          if (!isNaN(bedCount)) potentiallyLoadableProperties = potentiallyLoadableProperties.filter(p => p.bedrooms === bedCount);
      }
    }
    return potentiallyLoadableProperties.length > displayedCount && filteredProperties.length > 0;
  };


  return (
    <div className="space-y-12">
      <section className="relative text-center py-16 md:py-24 rounded-lg overflow-hidden bg-gradient-to-r from-primary/80 to-accent/80 shadow-xl">
        <Image
          src="https://i.ibb.co/9krz4mRj/image.png"
          alt="Abuja Skyline"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-30"
          data-ai-hint="city skyline building"
          priority
        />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary-foreground mb-4">
            Enjoy your Spiffy Stay
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto font-body">
            Find unique places to stay for any trip, from luxury villas to cozy apartments.
          </p>
          <Button size="lg" className="bg-background text-foreground hover:bg-background/90 py-3 px-8 text-lg rounded-md" asChild>
            <Link href="#search-section">Start Exploring</Link>
          </Button>
        </div>
      </section>

      <section id="search-section">
        <SearchFilters 
          onSearch={handleSearch} 
          initialCriteria={initialSearchCriteria} 
        />
      </section>

      <section>
        <h2 className="text-3xl font-headline font-semibold mb-8 text-center">Featured Stays in Abuja</h2>
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">No properties match your current criteria. Try adjusting your filters!</p>
        )}
        { canLoadMore() && (
           <div className="text-center mt-12">
            <Button onClick={loadMoreProperties} variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              Load More Properties
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
