"use client";

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/analytics';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  specs: string[];
  stock: boolean;
  whatsappNumber: string;
}

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleWhatsAppClick = () => {
    if (!isHydrated || typeof window === 'undefined') return;

    // Track WhatsApp button click
    trackEvent('whatsapp_click', {
      product_id: product.id,
      product_name: product.name,
      product_category: product.category,
      product_price: product.price,
      page_location: window.location.pathname
    });

    const message = `Salam, je suis intéressé(e) par votre produit ${product.name}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${product.whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Category */}
      <div className="animate-fade-in-up">
        <span className="inline-block px-4 py-1.5 bg-secondary text-muted-foreground text-xs font-semibold uppercase tracking-wider rounded-full">
          {product.category}
        </span>
      </div>

      {/* Product Name */}
      <h1 className="text-4xl md:text-5xl font-bold font-jakarta text-foreground leading-tight animate-fade-in-up delay-100">
        {product.name}
      </h1>

      {/* Stock Status */}
      <div className="animate-fade-in-up delay-200">
        {product.stock ? (
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-xl text-sm font-semibold">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            En Stock - Disponible maintenant
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-600 px-4 py-2 rounded-xl text-sm font-semibold">
            <Icon name="XCircleIcon" size={16} />
            Rupture de stock
          </div>
        )}
      </div>

      {/* Price */}
      <div className="animate-fade-in-up delay-300">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold font-jakarta text-primary">
            {product.price.toLocaleString('fr-MA')}
          </span>
          <span className="text-2xl font-medium text-muted-foreground">DH</span>
        </div>
      </div>

      {/* Description */}
      <div className="animate-fade-in-up delay-400">
        <p className="text-lg text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Specifications */}
      <div className="animate-fade-in-up delay-500">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Spécifications Techniques
        </h3>
        <ul className="space-y-3">
          {product.specs.map((spec, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="CheckIcon" size={12} className="text-primary" />
              </div>
              <span className="text-foreground">{spec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* WhatsApp CTA */}
      <div className="pt-4 animate-fade-in-up delay-500">
        <button
          onClick={handleWhatsAppClick}
          disabled={!product.stock}
          className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-bold transition-all ${
            product.stock
              ? 'bg-success text-white hover:bg-green-700 hover-glow shadow-strong'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          <Icon name="ChatBubbleLeftRightIcon" size={24} variant="solid" />
          Commander via WhatsApp
        </button>
        
        {product.stock && (
          <p className="mt-3 text-sm text-muted-foreground text-center">
            Message pré-rempli avec le nom du produit
          </p>
        )}
      </div>
    </div>
  );
}