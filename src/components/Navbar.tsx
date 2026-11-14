import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

interface NavbarProps {
  bagCount: number;
  onOpenBag: () => void;
}

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Mission", href: "#mission" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ bagCount, onOpenBag }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FEFEFE]/95 backdrop-blur-md border-b border-[#F7BACA]/75">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          className="inline-flex items-center justify-center w-[91px] h-[34px] overflow-hidden shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A2D1D] rounded-sm"
          aria-label="Flexal Home"
        >
          <img
            src="/assets/optimized/logo_wordmark.webp"
            alt="Flexal"
            width={200}
            height={200}
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-[200px] h-[200px] max-w-none shrink-0 pl-0 pr-0 object-contain"
          />
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A2D1D]/80"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#4A2D1D] hover:text-[#4A2D1D] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A2D1D]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            aria-label={`Open bag (${bagCount} items)`}
            className="inline-flex items-center justify-center w-10 h-10 text-[#FEFEFE] bg-[#4A2D1D] hover:bg-[#382115] rounded-lg transition-colors duration-150 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A2D1D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FEFEFE]"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#4A2D1D] border border-[#4A2D1D]/15 rounded-lg hover:bg-[#F8F6EE] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile"
          className="md:hidden bg-[#FEFEFE] border-t border-[#4A2D1D]/10 px-6 py-4 flex flex-col gap-3"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 text-sm font-medium text-[#4A2D1D] border-b border-[#4A2D1D]/8 last:border-b-0"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
