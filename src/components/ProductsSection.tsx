import { LATEST_PRODUCTS, ProductItem } from "../data/products";
import { FadeIn } from "./FadeIn";
import { ProductCard } from "./ProductCard";

interface ProductsSectionProps {
  onAddToBag: (product: ProductItem, size: string) => void;
  onInspectProduct: (product: ProductItem, selectedSize: string) => void;
}

export function ProductsSection({ onAddToBag, onInspectProduct }: ProductsSectionProps) {
  return (
    <section id="products" className="py-20 md:py-28 bg-[#F8F6EE]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <FadeIn className="flex flex-col items-center text-center gap-2.5 pb-8 border-b border-[#4A2D1D]/12">
          <h2 className="font-display text-3xl md:text-4xl text-[#4A2D1D]">
            New Arrivals
          </h2>

          <div className="flex items-center justify-center gap-4 text-xs text-[#4A2D1D]/70 tabular-nums">
            <span>Showing {LATEST_PRODUCTS.length} pieces</span>
          </div>
        </FadeIn>

        {/* Product Grid */}
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
          {LATEST_PRODUCTS.map((product, index) => (
            <FadeIn key={product.id} delay={index * 0.06} className="flex [&>article]:w-full">
              <ProductCard
                product={product}
                onAddToBag={onAddToBag}
                onInspect={onInspectProduct}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
