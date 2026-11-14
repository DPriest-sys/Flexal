
import { FadeIn } from "./FadeIn";

export function MissionSection() {
  return (
    <section
      id="mission"
      className="relative overflow-hidden py-20 md:py-28 bg-[#FED5E6] text-[#4A2D1D]"
    >
      {/* Background Campaign Image */}
      <img
        src="/assets/optimized/mission_bg.webp"
        alt=""
        aria-hidden="true"
        width={1600}
        height={762}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-[72%_center]"
      />

      {/* Contrast Scrim for Left-Column Legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#FED5E6]/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#FED5E6]/95 lg:via-[#FED5E6]/80 lg:to-[#FED5E6]/10"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <FadeIn className="max-w-xl flex flex-col justify-between gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src="/assets/optimized/logo_monogram.webp"
                alt="Flexal Monogram"
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-xs font-bold tracking-wider text-[#4A2D1D]">
                Our Mission
              </span>
            </div>

            <h2 className="font-['Inter',sans-serif] font-bold text-3xl md:text-5xl leading-[1.12] tracking-tight text-[#4A2D1D] text-balance">
              Made to move, Made for her.
            </h2>

            <p className="text-sm md:text-base leading-relaxed text-[#4A2D1D]/85">
              Flexal was created around a simple conviction: activewear should support every breath
              and posture without visual noise. From our signature deep espresso compression sets to
              soft blush modal layers, each capsule is produced in small runs for longevity inside
              and beyond the studio.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
