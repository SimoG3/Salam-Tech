import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  alt: string;
  stock: boolean;
}

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-jakarta text-foreground mb-4">
            Produits Similaires
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez d'autres produits qui pourraient vous intéresser
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/product-detail?id=${product.id}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-medium hover:scale-[1.02]">
                {/* Image */}
                <div className="relative w-full h-48 bg-secondary overflow-hidden">
                  <AppImage
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Stock Badge */}
                  {product.stock && (
                    <div className="absolute top-3 right-3 bg-success text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      En Stock
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-bold font-jakarta text-primary">
                      {product.price.toLocaleString('fr-MA')} DH
                    </span>
                    <Icon
                      name="ArrowRightIcon"
                      size={20}
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}