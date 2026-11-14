import { ArrowUpRight } from "lucide-react";
import { STORE_CONFIG, buildWhatsAppUrl } from "../config/store";
import { FadeIn } from "./FadeIn";

const FOOTER_NAV = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Mission", href: "#mission" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_ITEMS = [
  { label: "Instagram", href: STORE_CONFIG.socialLinks.instagram },
  { label: "TikTok", href: STORE_CONFIG.socialLinks.tiktok },
  { label: "Pinterest", href: STORE_CONFIG.socialLinks.pinterest },
  {
    label: "WhatsApp",
    href: buildWhatsAppUrl("Hello Flexal, I have a question about the latest collection."),
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FED5E6]/55 border-t border-[#F7BACA]">
      <FadeIn className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-[#4A2D1D]/15">
          <div className="space-y-3 max-w-xs">
            <a
              href="#home"
              className="inline-flex items-center justify-center w-[91px] h-[34px] overflow-hidden"
              aria-label="Flexal Home"
            >
              <img
                src="/assets/optimized/logo_wordmark.webp"
                alt="Flexal"
                width={200}
                height={200}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-[200px] h-[200px] max-w-none shrink-0 object-contain"
              />
            </a>
            <p className="text-xs leading-relaxed text-[#4A2D1D]/70">
              Made to move, Made for her.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-14">
            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-[#4A2D1D]">Navigation</p>
              <ul className="flex flex-wrap sm:flex-col gap-x-5 gap-y-2 text-xs text-[#4A2D1D]/75">
                {FOOTER_NAV.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="hover:text-[#4A2D1D] hover:underline underline-offset-4 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-[#4A2D1D]">Social Media</p>
              <ul className="flex flex-wrap sm:flex-col gap-x-5 gap-y-2 text-xs text-[#4A2D1D]/75">
                {SOCIAL_ITEMS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-[#4A2D1D] hover:underline underline-offset-4 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#4A2D1D]/65">
          <p>
            &copy; {currentYear} {STORE_CONFIG.brandName}. All rights reserved.
          </p>
        </div>
      </FadeIn>
    </footer>
  );
}
