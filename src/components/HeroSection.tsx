import { ArrowDownRight } from "lucide-react";
import { FadeIn } from "./FadeIn";

export function HeroSection() {
  return (
    <>
      <section id="home" className="relative overflow-hidden bg-[#4A2D1D] border-b border-[#F7BACA]/40">
        <img
          src="/assets/optimized/hero_bg.webp"
          alt=""
          aria-hidden="true"
          width={1505}
          height={857}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center blur-[3px] scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#2D1A10]/72"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
            <p className="text-xs font-semibold tracking-wider text-[#FED5E6]">
              New Season Release · Activewear &amp; Studio
            </p>

            <h1 className="font-['Inter',sans-serif] font-bold text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1.08] tracking-tight text-[#FEFEFE] text-balance">
              Sculpted movement, tailored for every studio hour.
            </h1>

            <p className="text-sm md:text-base leading-relaxed text-[#F8F6EE]/90 max-w-xl">
              FLEXAL is an activewear and wellness brand built around movement, confidence and
              intentional living.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wide text-[#4A2D1D] bg-[#FED5E6] hover:bg-[#F7BACA] rounded-lg transition-colors duration-150 whitespace-nowrap"
              >
                <span>Shop Latest Products</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#mission"
                className="inline-flex items-center px-5 py-3.5 text-xs font-semibold text-[#FEFEFE] bg-[#4A2D1D]/75 hover:bg-[#4A2D1D] border border-[#FED5E6]/45 rounded-lg transition-colors duration-150 whitespace-nowrap"
              >
                Read Our Mission
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Featured Collection Showcase" className="bg-[#F7BACA] border-b border-[#4A2D1D]/10">
        <FadeIn className="max-w-[1440px] mx-auto">
          <img
            src="/assets/optimized/mission_bg.webp"
            alt="Flexal rose pink sculpted sports bra and matching high-waisted leggings"
            width={1600}
            height={859}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-auto block object-cover"
          />
        </FadeIn>
      </section>
    </>
  );
}
