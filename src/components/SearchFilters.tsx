
"use client";

import { useState, type Dispatch, type SetStateAction } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, Search, Home, Users, Bed } from 'lucide-react';

export interface SearchCriteria {
  location: string;
  propertyType: string;
  priceRange: [number, number];
  amenities: string[];
  guests: number;
  bedrooms: string; // "Any", "Studio", "1", "2", "3", "4+"
}

interface SearchFiltersProps {
  onSearch: (criteria: SearchCriteria) => void;
  initialCriteria?: Partial<SearchCriteria>;
}

const allAmenities = ['WiFi', 'Pool', 'Air Conditioning', 'Kitchen', 'Parking', 'Gym', 'Pet Friendly', 'Workspace'];
const propertyTypes = ['Any', 'Apartment', 'House', 'Villa', 'Penthouse'];
const bedroomOptions = [
  { value: "Any", label: "Any Bedrooms" },
  { value: "Studio", label: "Studio (0 Beds)" },
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4+", label: "4+ Bedrooms" },
];

export default function SearchFilters({ onSearch, initialCriteria }: SearchFiltersProps) {
  const [location, setLocation] = useState(initialCriteria?.location || '');
  const [propertyType, setPropertyType] = useState(initialCriteria?.propertyType || 'Any');
  const [priceRange, setPriceRange] = useState<[number, number]>(initialCriteria?.priceRange || [0, 500000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(initialCriteria?.amenities || []);
  const [guests, setGuests] = useState<number>(initialCriteria?.guests || 1);
  const [bedrooms, setBedrooms] = useState<string>(initialCriteria?.bedrooms || 'Any');

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ location, propertyType, priceRange, amenities: selectedAmenities, guests, bedrooms });
  };

  return (
    <Card className="mb-8 shadow-lg rounded-lg border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center text-primary">
          <Filter size={28} className="mr-2" /> Find Your Perfect Stay
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="location" className="text-sm font-medium mb-1 block">Location</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="location"
                  type="text"
                  placeholder="e.g., Asokoro, Wuse II"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="propertyType" className="text-sm font-medium mb-1 block">Property Type</Label>
               <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger id="propertyType" className="w-full">
                  <Home className="h-5 w-5 text-muted-foreground mr-2" />
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="guests" className="text-sm font-medium mb-1 block">Guests</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    id="guests"
                    type="number"
                    min="1"
                    value={guests}
                    onChange={e => setGuests(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="pl-10"
                  />
              </div>
            </div>
            <div>
              <Label htmlFor="bedrooms" className="text-sm font-medium mb-1 block">Number of Bedrooms</Label>
               <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger id="bedrooms" className="w-full">
                  <Bed className="h-5 w-5 text-muted-foreground mr-2" />
                  <SelectValue placeholder="Select bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  {bedroomOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>


          <div>
            <Label htmlFor="priceRange" className="text-sm font-medium mb-1 block">
              Price Range: ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}{priceRange[1] === 500000 ? '+' : ''}
            </Label>
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2 font-semibold">₦</span>
              <Slider
                id="priceRange"
                min={0}
                max={500000}
                step={10000}
                value={[priceRange[0]]} 
                onValueChange={(value) => setPriceRange([value[0], priceRange[1]])} 
                className="w-full"
              />
            </div>
             <p className="text-xs text-muted-foreground mt-1">Adjust the minimum price. Max price can be refined after search.</p>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Amenities</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {allAmenities.map(amenity => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityChange(amenity)}
                  />
                  <Label htmlFor={amenity} className="font-normal text-sm">{amenity}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3 px-6 rounded-md">
            <Search size={20} className="mr-2" /> Search Properties
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

