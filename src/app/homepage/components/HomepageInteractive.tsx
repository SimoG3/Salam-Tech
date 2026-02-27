"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from './HeroSection';
import ProductGrid from './ProductGrid';
import { trackEvent } from '@/lib/analytics';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  alt: string;
  description: string;
  specs: string[];
  stock: boolean;
  whatsappNumber: string;
}

export default function HomepageInteractive() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load products
  useEffect(() => {
    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading products:', error);
        setIsLoading(false);
      });
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, activeCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Track search events
    if (query.trim()) {
      trackEvent('search', {
        search_term: query,
        results_count: products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        ).length
      });
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    // Track category filter usage
    trackEvent('category_filter', {
      category: category,
      results_count: category === 'all' 
        ? products.length 
        : products.filter((product) => product.category === category).length
    });
  };

  return (
    <>
      <Header
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        activeCategory={activeCategory}
      />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <HeroSection />

        {/* Products Section */}
        <section className="py-20 lg:py-24">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold font-jakarta text-foreground mb-4">
                Nos Produits
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez notre sélection de produits tech premium. Tous les prix sont en Dirhams marocains.
              </p>
            </div>

            {/* Product Count */}
            <div className="mb-8 text-sm text-muted-foreground animate-fade-in delay-200">
              {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </section>
      </main>
    </>
  );
}