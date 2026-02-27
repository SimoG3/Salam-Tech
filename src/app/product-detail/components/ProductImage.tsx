"use client";

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';

interface ProductImageProps {
  image: string;
  alt: string;
  productName: string;
}

export default function ProductImage({ image, alt, productName }: ProductImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    setIsZoomed(false);
  }, [image]);

  return (
    <div className="relative w-full h-full bg-secondary rounded-2xl overflow-hidden group">
      <AppImage
        src={image}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-500 ${
          isZoomed ? 'scale-150' : 'scale-100 group-hover:scale-105'
        }`}
      />
      
      {/* Zoom Indicator */}
      {isHydrated && (
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-xl text-sm font-medium shadow-medium hover:bg-white transition-all"
        >
          {isZoomed ? 'Réinitialiser' : 'Zoomer'}
        </button>
      )}
    </div>
  );
}