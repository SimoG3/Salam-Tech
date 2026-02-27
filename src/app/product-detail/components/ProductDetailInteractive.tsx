"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import RelatedProducts from './RelatedProducts';
import Icon from '@/components/ui/AppIcon';

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

export default function ProductDetailInteractive() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data: Product[]) => {
        const currentProduct = data.find((p) => p.id === productId);
        if (currentProduct) {
          setProduct(currentProduct);
          
          // Find related products (same category, exclude current)
          const related = data
            .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading product:', error);
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-20">
          <Icon name="ExclamationTriangleIcon" size={48} className="text-warning mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Produit non trouvé</h2>
          <p className="text-muted-foreground mb-6">Le produit que vous recherchez n'existe pas.</p>
          <Link
            href="/homepage"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            <Icon name="ArrowLeftIcon" size={20} />
            Retour à l'accueil
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-background pt-20">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/homepage" className="text-muted-foreground hover:text-foreground transition-colors">
                Accueil
              </Link>
              <Icon name="ChevronRightIcon" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">{product.category}</span>
              <Icon name="ChevronRightIcon" size={16} className="text-muted-foreground" />
              <span className="text-foreground font-medium truncate max-w-xs">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <section className="py-12 lg:py-16">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Image - 7 columns */}
              <div className="lg:col-span-7">
                <div className="sticky top-24 h-[500px] lg:h-[600px]">
                  <ProductImage
                    key={product.id}
                    image={product.image}
                    alt={product.alt}
                    productName={product.name}
                  />
                </div>
              </div>

              {/* Info - 5 columns */}
              <div className="lg:col-span-5">
                <ProductInfo product={product} />
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </main>
    </>
  );
}