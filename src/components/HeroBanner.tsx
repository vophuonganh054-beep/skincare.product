import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/products';

interface HeroBannerProps {
  onExplore: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative mx-3.5 my-2">
      <div className="relative w-full h-[330px] rounded-[28px] overflow-hidden shadow-sm select-none">
        {/* Background Image with warm editorial dark-to-light gradient overlay */}
        <img
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-1000 scale-105"
        />
        {/* Luminous luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f]/90 via-[#0d0d0f]/40 to-transparent" />
        <div className="absolute inset-0 bg-[#382b24]/15 mix-blend-multiply" />

        {/* Content Container matching screenshot layout */}
        <div className="relative h-full flex flex-col justify-end p-5 text-white">
          {/* Badge: BỘ SƯU TẬP MỚI 2025 */}
          <div className="inline-flex items-center self-start mb-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-[10.5px] font-semibold tracking-[0.14em] uppercase text-white shadow-xs">
            {slide.badge}
          </div>

          {/* Title in Serif */}
          <h2 className="font-serif text-[27px] leading-[32px] font-normal tracking-tight text-white drop-shadow-sm mb-1.5">
            {slide.title}
          </h2>

          {/* Subtitle */}
          <p className="text-[12px] leading-[17px] text-white/85 font-light max-w-[90%] line-clamp-2 mb-4 tracking-[0.01em]">
            {slide.subtitle}
          </p>

          {/* Bottom row: Button + Limited Edition & indicators */}
          <div className="flex items-center justify-between mt-0.5">
            {/* CTA Pill button: KHÁM PHÁ NGAY -> */}
            <button
              id="btn-hero-explore"
              onClick={onExplore}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#1C1C19] text-[11px] font-bold tracking-[0.12em] uppercase shadow-md hover:bg-[#FAF7F2] active:scale-95 transition-all group cursor-pointer"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform stroke-[2.2]" />
            </button>

            {/* Right side: Italic text & dots */}
            <div className="flex flex-col items-end gap-1.5">
              <span className="font-serif italic text-[11.5px] text-white/90 tracking-wide">
                {slide.tag}
              </span>

              {/* Slider pills */}
              <div className="flex items-center gap-1.5">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? 'w-6 bg-white'
                        : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
