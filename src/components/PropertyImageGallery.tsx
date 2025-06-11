import Image from 'next/image';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface PropertyImageGalleryProps {
  images: string[];
  altText: string;
}

export default function PropertyImageGallery({ images, altText }: PropertyImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <Card className="p-4 text-center text-muted-foreground">
        No images available for this property.
      </Card>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="space-y-4">
      <Card className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
        <Image
          src={images[currentIndex]}
          alt={`${altText} - Image ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-300 ease-in-out"
          data-ai-hint="property interior room"
          priority={currentIndex === 0}
        />
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background/90 rounded-full"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background/90 rounded-full"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </Button>
          </>
        )}
      </Card>
      {images.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {images.map((src, index) => (
            <button
              key={src + index}
              onClick={() => setCurrentIndex(index)}
              className={`aspect-square overflow-hidden rounded-md focus:outline-none focus:ring-2 focus:ring-primary ring-offset-2 transition-all ${
                index === currentIndex ? 'ring-2 ring-primary opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={src}
                alt={`${altText} - Thumbnail ${index + 1}`}
                width={150}
                height={150}
                objectFit="cover"
                className="w-full h-full"
                data-ai-hint="room detail"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
