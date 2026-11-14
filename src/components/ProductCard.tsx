import { useState } from "react";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import { ProductItem } from "../data/products";
import { buildWhatsAppUrl, formatPrice } from "../config/store";

interface ProductCardProps {
  product: ProductItem;
  onAddToBag: (product: ProductItem, size: string) => void;
  onInspect: (product: ProductItem, selectedSize: string) => void;
}

export function ProductCard({ product, onAddToBag, onInspect }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] ?? product.sizes[0]);
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const whatsappMessage = [
    `Hello Flexal, I would like to order:`,
    `Product: ${product.name}`,
    `Colorway: ${product.colorway}`,
    `Size: ${selectedSize}`,
    `Price: ${formatPrice(product.price)}`,
    `Please confirm availability and next steps.`,
  ].join("\n");

  const whatsappHref = buildWhatsAppUrl(whatsappMessage);

  function handleAdd() {
    onAddToBag(product, selectedSize);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <article className="group flex flex-col bg-[#FEFEFE] border border-[#4A2D1D]/12 hover:border-[#F7BACA] rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(74,45,29,0.14)]">
      {/* Studio Image */}
      <button
        type="button"
        onClick={() => onInspect(product, selectedSize)}
        aria-label={`View details for ${product.name}`}
        className="relative aspect-[3/4] w-full bg-[#F8F6EE] overflow-hidden text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4A2D1D]"
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={`${product.name} in ${product.colorway}`}
            width={760}
            height={1018}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F8F6EE] text-[#4A2D1D]/70">
            <img
              src="/assets/optimized/logo_monogram.webp"
              alt=""
              width={48}
              height={48}
              loading="lazy"
              decoding="async"
              className="w-12 h-12 mb-3 opacity-80"
            />
            <span className="text-sm font-medium">{product.name}</span>
          </div>
        )}
      </button>

      {/* Product Details */}
      <div className="flex-1 flex flex-col p-5 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <button
              type="button"
              onClick={() => onInspect(product, selectedSize)}
              className="text-left font-display text-lg md:text-xl font-medium text-[#4A2D1D] hover:underline underline-offset-4 cursor-pointer"
            >
              {product.name}
            </button>
            <span className="text-[15px] font-semibold text-[#4A2D1D] tabular-nums shrink-0">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {/* Size Selector */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#4A2D1D]/8">
          <span className="text-xs font-medium text-[#4A2D1D]/65">Size</span>
          <div className="flex items-center gap-1.5" role="group" aria-label={`Select size for ${product.name}`}>
            {product.sizes.map((size) => {
              const active = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={active}
                  className={`min-w-[34px] h-8 px-2 text-xs font-medium rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                    active
                      ? "bg-[#4A2D1D] text-[#FEFEFE]"
                      : "bg-[#F8F6EE] text-[#4A2D1D]/80 hover:bg-[#FED5E6]/60 hover:text-[#4A2D1D]"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-auto pt-1 flex items-center gap-2.5">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#FEFEFE] bg-[#4A2D1D] hover:bg-[#382115] rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A2D1D] focus-visible:ring-offset-2"
          >
            <span>Order on WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to bag`}
            className={`inline-flex items-center justify-center gap-1 px-3.5 py-2.5 text-xs font-semibold rounded-lg border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
              justAdded
                ? "bg-[#F7BACA] border-[#F7BACA] text-[#4A2D1D]"
                : "bg-[#FED5E6]/70 border-[#F7BACA] text-[#4A2D1D] hover:bg-[#FED5E6]"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
