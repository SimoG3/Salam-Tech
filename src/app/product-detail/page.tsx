import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductDetailInteractive from './components/ProductDetailInteractive';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Détails du Produit - SalamTech',
  description: 'Découvrez les détails complets de ce produit tech. Commander directement via WhatsApp.',
};

export default function ProductDetailPage() {
  return (
    <>
      <Suspense fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }>
        <ProductDetailInteractive />
      </Suspense>
      <Footer />
    </>
  );
}