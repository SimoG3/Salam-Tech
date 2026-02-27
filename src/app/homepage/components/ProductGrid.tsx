import ProductCard from './ProductCard';

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

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground">Aucun produit trouvé</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}