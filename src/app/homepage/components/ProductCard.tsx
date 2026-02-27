"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/analytics';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  alt: string;
  stock: boolean;
  whatsappNumber: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setIsVisible(true);
  }, []);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Track WhatsApp button click from product card
    trackEvent('whatsapp_click', {
      product_id: product.id,
      product_name: product.name,
      product_category: product.category,
      product_price: product.price,
      page_location: 'homepage'
    });
    
    const message = `Salam, je suis intéressé(e) par votre produit ${product.name}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${product.whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    
    if (isHydrated && typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleProductClick = () => {
    // Track product card click
    trackEvent('product_view', {
      product_id: product.id,
      product_name: product.name,
      product_category: product.category,
      product_price: product.price,
      from_page: 'homepage'
    });
  };

  return (
    <Link href={`/product-detail?id=${product.id}`} onClick={handleProductClick}>
      <div
        className={`group bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-medium hover:scale-[1.02] cursor-pointer ${
          isVisible ? 'reveal' : 'opacity-0'
        }`}
      >
        {/* Image Container */}
        <div className="relative w-full h-64 bg-secondary overflow-hidden">
          <AppImage
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Stock Badge */}
          {product.stock ? (
            <div className="absolute top-4 right-4 bg-success text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
              En Stock
            </div>
          ) : (
            <div className="absolute top-4 right-4 bg-stone-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              Rupture
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="mt-2 text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Price & CTA */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold font-jakarta text-primary">
                {product.price.toLocaleString('fr-MA')} DH
              </span>
            </div>

            <button
              onClick={handleWhatsAppClick}
              disabled={!product.stock}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover-glow ${
                product.stock
                  ? 'bg-success text-white hover:bg-green-700' :'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              <Icon name="ChatBubbleLeftRightIcon" size={18} variant="solid" />
              Commander
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}