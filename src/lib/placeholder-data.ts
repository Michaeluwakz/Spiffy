
export interface Property {
  id: string;
  name: string;
  location: string;
  propertyType: 'Apartment' | 'House' | 'Villa' | 'Penthouse';
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  amenities: string[];
  images: string[];
  mainImage: string;
  description: string;
  houseRules: string[];
  host: {
    name: string;
    avatar: string;
  };
  rating: number;
  reviewsCount: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const properties: Property[] = [
  {
    id: '1',
    name: 'Serene Luxury Villa in Asokoro',
    location: 'Asokoro, Abuja',
    propertyType: 'Villa',
    pricePerNight: 150000,
    bedrooms: 4,
    bathrooms: 5,
    guests: 8,
    amenities: ['WiFi', 'Pool', 'Air Conditioning', 'Kitchen', 'Parking', 'Gym'],
    mainImage: 'https://i.ibb.co/DDCfTwHC/image.png',
    images: [
      'https://i.ibb.co/DDCfTwHC/image.png', // Ensure mainImage is first
      'https://i.ibb.co/XrwG6Sj8/image.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    description: 'Experience unparalleled luxury and comfort in this stunning villa located in the prestigious Asokoro district. Perfect for families or large groups seeking a serene getaway with top-notch amenities.',
    houseRules: ['No smoking indoors', 'No pets allowed', 'No parties or events without prior approval', 'Check-in time is 3 PM - 9 PM', 'Check-out by 11 AM'],
    host: { name: 'Aisha Bello', avatar: 'https://placehold.co/100x100.png' },
    rating: 4.9,
    reviewsCount: 120,
  },
  {
    id: '2',
    name: 'Modern Downtown Apartment',
    location: 'Wuse II, Abuja',
    propertyType: 'Apartment',
    pricePerNight: 75000,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Elevator', 'Workspace'],
    mainImage: 'https://i.ibb.co/XktRKDnz/image.png',
    images: [
      'https://i.ibb.co/XktRKDnz/image.png', // Ensure mainImage is first
      'https://placehold.co/800x600.png',
    ],
    description: 'A chic and modern apartment in the bustling heart of Wuse II. Ideal for business travelers or couples looking for a stylish and convenient base to explore the city.',
    houseRules: ['No smoking', 'Not suitable for pets', 'Quiet hours after 10 PM'],
    host: { name: 'Emeka Adebayo', avatar: 'https://placehold.co/100x100.png' },
    rating: 4.7,
    reviewsCount: 85,
  },
  {
    id: '3',
    name: 'Cozy Family House with Garden',
    location: 'Gwarinpa, Abuja',
    propertyType: 'House',
    pricePerNight: 90000,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Parking', 'Garden', 'Cable TV'],
    mainImage: 'https://i.ibb.co/PGmT7JhX/image.png',
    images: [
      'https://i.ibb.co/PGmT7JhX/image.png', // Ensure mainImage is first
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    description: 'A beautiful and cozy family house with a lush garden in the residential area of Gwarinpa. Offers a peaceful retreat with all the comforts of home.',
    houseRules: ['Family-friendly', 'No loud music after 9 PM', 'Please conserve water and electricity'],
    host: { name: 'Fatima Sani', avatar: 'https://placehold.co/100x100.png' },
    rating: 4.8,
    reviewsCount: 92,
  },
   {
    id: '4',
    name: 'Penthouse with Panoramic City Views',
    location: 'Maitama, Abuja',
    propertyType: 'Penthouse',
    pricePerNight: 250000,
    bedrooms: 3,
    bathrooms: 4,
    guests: 6,
    amenities: ['WiFi', 'Pool', 'Air Conditioning', 'Kitchen', 'Parking', 'Gym', 'Hot Tub', 'Rooftop Terrace'],
    mainImage: 'https://i.ibb.co/PGmT7JhX/image.png', // Note: This URL is same as property 3's mainImage, confirm if intentional
    images: [
      'https://i.ibb.co/PGmT7JhX/image.png', // Ensure mainImage is first
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    description: 'Indulge in the ultimate luxury experience in this exquisite penthouse in Maitama. Featuring breathtaking panoramic views of Abuja, a private rooftop terrace, and high-end finishes throughout.',
    houseRules: ['No smoking', 'No pets', 'Minimum stay: 3 nights', 'Events considered on request'],
    host: { name: 'Chief Okoro', avatar: 'https://placehold.co/100x100.png' },
    rating: 5.0,
    reviewsCount: 45,
  },
];

export const faqs: FAQItem[] = [
  {
    id: 'faq1',
    question: 'What is the check-in/check-out process?',
    answer: 'Check-in is typically after 3 PM and check-out is before 11 AM. Specific instructions will be provided by the host prior to your arrival. Some properties offer self-check-in options.',
  },
  {
    id: 'faq2',
    question: 'Can I cancel my booking?',
    answer: 'Cancellation policies vary by property and are set by the host. Please review the cancellation policy for your specific booking at the time of reservation and in your confirmation email.',
  },
  {
    id: 'faq3',
    question: 'Are pets allowed?',
    answer: 'Pet policies differ for each property. Some hosts allow pets, while others do not. You can filter properties by "pet-friendly" or check the specific property\'s house rules for details.',
  },
  {
    id: 'faq4',
    question: 'How do I contact the host?',
    answer: 'Once your booking is confirmed, you will receive the host\'s contact information. You can communicate with them through our platform\'s messaging system or directly via phone/email as provided.',
  },
  {
    id: 'faq5',
    question: 'What payment methods are accepted?',
    answer: 'We accept major credit cards and bank transfers. Payment details are processed securely. Specific options may vary depending on the property.',
  },
];

