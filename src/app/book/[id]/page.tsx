
"use client";

import { useEffect, useState } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { properties as allProperties, type Property } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Users, CreditCard, ArrowLeft, Landmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const propertyId = params.id as string;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer'>('card');

  useEffect(() => {
    if (propertyId) {
      const foundProperty = allProperties.find(p => p.id === propertyId);
      if (foundProperty) {
        setProperty(foundProperty);
        setNumberOfGuests(Math.min(1, foundProperty.guests)); // Default to 1 or max guests if less
      } else {
        notFound();
      }
    }
  }, [propertyId]);

  useEffect(() => {
    if (property && checkInDate && checkOutDate && checkOutDate > checkInDate) {
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalPrice(diffDays * property.pricePerNight);
    } else {
      setTotalPrice(0);
    }
  }, [property, checkInDate, checkOutDate]);

  if (!property) {
    return <div className="text-center py-10">Loading property details...</div>;
  }

  const handleBooking = () => {
    // Validate inputs
    if (!checkInDate || !checkOutDate || checkOutDate <= checkInDate) {
      toast({ title: "Invalid Dates", description: "Please select valid check-in and check-out dates.", variant: "destructive" });
      return;
    }
    if (numberOfGuests <= 0 || numberOfGuests > property.guests) {
      toast({ title: "Invalid Guests", description: `Number of guests must be between 1 and ${property.guests}.`, variant: "destructive" });
      return;
    }

    console.log({
      propertyId: property.id,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      totalPrice,
      paymentMethod: paymentMethod,
      bookingType: paymentMethod === 'card' ? 'Instant (Card)' : 'Bank Transfer',
    });

    if (paymentMethod === 'card') {
      toast({
        title: "Booking Confirmed!",
        description: `Your booking for ${property.name} via card has been confirmed.`,
      });
    } else {
      toast({
        title: "Booking Initiated!",
        description: `Your booking for ${property.name} is pending. Please check your email (simulated) for bank transfer instructions.`,
        duration: 7000, // Longer duration for this message
      });
    }
    router.push('/account'); // Redirect to account page or a confirmation page
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="outline" asChild className="mb-6">
        <Link href={`/properties/${property.id}`}>
          <ArrowLeft size={16} className="mr-2" /> Back to Property
        </Link>
      </Button>

      <h1 className="text-3xl md:text-4xl font-headline mb-8 text-center">Book Your Stay at {property.name}</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary">Booking Details</CardTitle>
            <CardDescription>Confirm your dates and guest count.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="checkInDate">Check-in Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="checkInDate"
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkInDate ? format(checkInDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={setCheckInDate}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="checkOutDate">Check-out Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="checkOutDate"
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOutDate ? format(checkOutDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    initialFocus
                    disabled={(date) => checkInDate ? date <= checkInDate : date < new Date(new Date().setHours(0,0,0,0))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="numberOfGuests">Number of Guests</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="numberOfGuests"
                  type="number"
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(parseInt(e.target.value, 10))}
                  min="1"
                  max={property.guests}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Max guests: {property.guests}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-headline">Property Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-4 items-start">
              <Image
                src={property.mainImage}
                alt={property.name}
                width={120}
                height={90}
                className="rounded-md object-cover aspect-[4/3]"
                data-ai-hint={`${property.propertyType.toLowerCase()} exterior`}
              />
              <div>
                <h3 className="font-semibold text-lg">{property.name}</h3>
                <p className="text-sm text-muted-foreground">{property.location}</p>
                <p className="text-sm text-muted-foreground">{property.propertyType}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-lg border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary">Price & Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Base price per night:</span>
                <span>₦{property.pricePerNight.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Number of nights:</span>
                <span>{checkInDate && checkOutDate && checkOutDate > checkInDate ? Math.ceil(Math.abs(checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)) : 0}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg text-primary">
                <span>Total Price:</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-4">
              <div className="w-full space-y-2">
                <Label className="text-base font-semibold text-foreground">Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value: 'card' | 'bank_transfer') => setPaymentMethod(value)}
                  className="grid grid-cols-2 gap-x-4"
                >
                  <div>
                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                    >
                      <CreditCard className="mb-2 h-5 w-5" />
                      <span className="text-sm">Card Payment</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="bank_transfer" id="bank_transfer" className="peer sr-only" />
                    <Label
                      htmlFor="bank_transfer"
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                    >
                      <Landmark className="mb-2 h-5 w-5" />
                      <span className="text-sm">Bank Transfer</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button onClick={handleBooking} size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 mt-2">
                 Confirm Booking
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                By booking, you agree to the property's house rules and our terms of service.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

