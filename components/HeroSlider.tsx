"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Providing High Quality",
    subtitle: "Military Products",
    image: "/images/hero/slider1.png",
  },
  {
    title: "Premium Military Gear",
    subtitle: "For Professionals",
    image: "/images/hero/slider2.png",
  },
  {
    title: "Tactical Equipment",
    subtitle: "Built to Last",
    image: "/images/hero/slider3.png",
  },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
      emblaApi.on("select", onSelect);
      const interval = setInterval(() => emblaApi.scrollNext(), 5000);
      return () => {
        clearInterval(interval);
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide, index) => (
          <div key={index} className="relative flex-[0_0_100%] min-w-0">
            <div className="relative h-[400px] sm:h-[500px] md:h-[700px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/50 sm:bg-black/40" />
              </div>
              <div className="relative h-full flex items-center justify-center text-center text-white px-4">
                <div>
                  <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4">{slide.title}</h1>
                  <p className="text-lg sm:text-xl md:text-2xl">{slide.subtitle}</p>
                  <button
  className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 bg-[#b08968] text-white rounded-full hover:bg-[#8e6d53] transition-colors text-sm sm:text-base"
  onClick={() => {
    const phone = "7942687658"; // Replace with the actual WhatsApp number
    const message = encodeURIComponent("Hello, I'm interested in your military products. Could you provide more details?");
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  }}
>
  Shop Now
</button>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white/80 rounded-full hover:bg-white transition-colors"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
      </button>
      <button
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white/80 rounded-full hover:bg-white transition-colors"
        onClick={scrollNext}
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
              index === selectedIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
