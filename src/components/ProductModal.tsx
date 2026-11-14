import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Plus, X } from "lucide-react";
import { ProductItem } from "../data/products";
import { buildWhatsAppUrl, formatPrice } from "../config/store";

interface ProductModalProps {
  product: ProductItem | null;
  initialSize: string;
  onClose: () => void;
  onAddToBag: (product: ProductItem, size: string) => void;
}

export function ProductModal({ product, initialSize, onClose, onAddToBag }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setSelectedSize(initialSize);
    setAdded(false);
  }, [product, initialSize]);

  useEffect(() => {
    if (!product) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const whatsappHref = buildWhatsAppUrl(
    [
      `Hello Flexal, I would like to order:`,
      `Product: ${product.name}`,
      `Colorway: ${product.colorway}`,
      `Size: ${selectedSize}`,
      `Price: ${formatPrice(product.price)}`,
      `Please let me know stock and delivery details.`,
    ].join("\n")
  );

  function handleAdd() {
    if (!product) return;
    onAddToBag(product, selectedSize);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#4A2D1D]/50 backdrop-blur-[2px] overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[360px] sm:max-w-md md:max-w-3xl max-h-[82dvh] md:max-h-[85dvh] bg-[#FEFEFE] border border-[#4A2D1D]/15 rounded-2xl overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-2 overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product preview"
          className="absolute top-3 right-3 z-20 w-9 h-9 inline-flex items-center justify-center rounded-full bg-[#FEFEFE]/95 text-[#4A2D1D] border border-[#4A2D1D]/15 hover:bg-[#F8F6EE] transition-colors cursor-pointer shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Image */}
        <div className="bg-[#F8F6EE] h-44 sm:h-52 md:h-full w-full shrink-0">
          <img
            src={product.image}
            alt={`${product.name} in ${product.colorway}`}
            width={760}
            height={1018}
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right Details */}
        <div className="px-5 pt-4 pb-5 sm:p-6 md:p-8 flex flex-col justify-between gap-4 md:gap-6 md:overflow-y-auto">
          <div className="space-y-3 md:space-y-4">
            <h3 id="product-modal-title" className="font-display text-xl sm:text-2xl md:text-3xl text-[#4A2D1D] pr-6">
              {product.name}
            </h3>

            <p className="text-base sm:text-lg font-semibold text-[#4A2D1D] tabular-nums">
              {formatPrice(product.price)}
            </p>

            {/* Size Selector */}
            <div className="space-y-2 pt-1">
              <span className="block text-xs font-semibold text-[#4A2D1D]">Select Size</span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={active}
                      className={`min-w-[40px] h-9 sm:min-w-[44px] sm:h-10 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        active
                          ? "bg-[#4A2D1D] border-[#4A2D1D] text-[#FEFEFE]"
                          : "bg-[#F8F6EE] border-[#4A2D1D]/15 text-[#4A2D1D] hover:bg-[#FED5E6]/60"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center gap-2 sm:gap-2.5 pt-3.5 border-t border-[#4A2D1D]/10">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2.5 sm:py-3 text-xs font-semibold text-[#FEFEFE] bg-[#4A2D1D] hover:bg-[#382115] rounded-lg transition-colors whitespace-nowrap"
            >
              <span className="truncate">Order on WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={handleAdd}
              className={`inline-flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2.5 sm:py-3 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                added
                  ? "bg-[#F7BACA] border-[#F7BACA] text-[#4A2D1D]"
                  : "bg-[#FED5E6]/80 border-[#F7BACA] text-[#4A2D1D] hover:bg-[#FED5E6]"
              }`}
            >
              {added ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span>{added ? "Added" : "Add to Bag"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
