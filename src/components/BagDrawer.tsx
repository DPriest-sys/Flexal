import { useEffect, useState } from "react";
import { ArrowUpRight, Minus, Plus, Trash2, X } from "lucide-react";
import { ProductItem } from "../data/products";
import { buildWhatsAppUrl, formatPrice } from "../config/store";

export interface BagLineItem {
  product: ProductItem;
  size: string;
  quantity: number;
}

interface BagDrawerProps {
  isOpen: boolean;
  items: BagLineItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearBag: () => void;
}

export function BagDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearBag,
}: BagDrawerProps) {
  const [customerNote, setCustomerNote] = useState("");

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const compiledMessage = [
    "Hello Flexal, I would like to place an order:",
    "",
    ...items.map(
      (item, index) =>
        `${index + 1}. ${item.product.name} (${item.product.colorway}, Size ${item.size}) x${item.quantity} — ${formatPrice(
          item.product.price * item.quantity
        )}`
    ),
    "",
    `Estimated Subtotal: ${formatPrice(subtotal)}`,
    customerNote.trim() ? `Delivery / Fit Note: ${customerNote.trim()}` : "",
    "Please share payment and delivery confirmation.",
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappOrderUrl = buildWhatsAppUrl(compiledMessage);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#4A2D1D]/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Order bag"
      onClick={onClose}
    >
      <aside
        className="w-full max-w-md h-full bg-[#FEFEFE] border-l border-[#4A2D1D]/15 flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#4A2D1D]/12 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-[#4A2D1D]">Your Bag</h2>
            <p className="text-xs text-[#4A2D1D]/65 mt-0.5">
              Items compile directly into a WhatsApp order
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close bag"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-[#4A2D1D]/15 text-[#4A2D1D] hover:bg-[#F8F6EE] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 gap-4">
              <img
                src="/assets/optimized/logo_monogram.webp"
                alt=""
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                className="w-14 h-14 opacity-85"
              />
              <div className="space-y-1 max-w-xs">
                <p className="font-display text-xl text-[#4A2D1D]">Your bag is empty</p>
                <p className="text-xs leading-relaxed text-[#4A2D1D]/70">
                  Add pieces from the latest collection to send a combined order, or order any
                  single item directly via WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-[#FEFEFE] bg-[#4A2D1D] rounded-lg hover:bg-[#382115] transition-colors cursor-pointer"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[#4A2D1D]/10">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}`}
                  className="py-4 first:pt-0 flex gap-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    width={80}
                    height={96}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover rounded-lg bg-[#F8F6EE] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#4A2D1D] truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-[#4A2D1D]/65 mt-0.5">
                          {item.product.colorway} · Size {item.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id, item.size)}
                        aria-label={`Remove ${item.product.name}`}
                        className="p-1.5 text-[#4A2D1D]/50 hover:text-[#4A2D1D] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <div className="inline-flex items-center border border-[#4A2D1D]/15 rounded-md bg-[#F8F6EE]">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.product.id, item.size, -1)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 inline-flex items-center justify-center text-[#4A2D1D] hover:bg-[#FED5E6]/50 rounded-l-md cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-[#4A2D1D] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.product.id, item.size, 1)}
                          aria-label="Increase quantity"
                          className="w-8 h-8 inline-flex items-center justify-center text-[#4A2D1D] hover:bg-[#FED5E6]/50 rounded-r-md cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#4A2D1D] tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Checkout Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#4A2D1D]/12 bg-[#F8F6EE] space-y-4">
            <div>
              <label
                htmlFor="bag-delivery-note"
                className="block text-xs font-medium text-[#4A2D1D]/80 mb-1.5"
              >
                Optional Delivery City or Sizing Note
              </label>
              <input
                id="bag-delivery-note"
                type="text"
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                placeholder="e.g. Lagos delivery, prefer relaxed fit"
                className="w-full px-3.5 py-2 text-xs bg-[#FEFEFE] border border-[#4A2D1D]/15 rounded-lg text-[#4A2D1D] placeholder:text-[#4A2D1D]/40 focus:outline-none focus:border-[#4A2D1D]"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-[#4A2D1D]/75 font-medium">Estimated Subtotal</span>
              <span className="text-base font-bold text-[#4A2D1D] tabular-nums">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-[#FEFEFE] bg-[#4A2D1D] hover:bg-[#382115] rounded-lg transition-colors"
              >
                <span>Checkout via WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onClearBag}
                className="w-full py-2 text-xs font-medium text-[#4A2D1D]/65 hover:text-[#4A2D1D] transition-colors cursor-pointer"
              >
                Clear Bag
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
