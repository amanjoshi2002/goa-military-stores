"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "T Shirts",
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Pants",
    image:
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Holsters",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Belts",
    image:
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Uniform Fabric",
    image:
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export default function CategorySlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext();
      }, 3000);

      return () => clearInterval(autoplay);
    }
  }, [emblaApi]);

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">CATEGORIES</h2>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex flex-nowrap">
              {categories.map((category, index) => (
                <Link key={index} href={`/pages/subcategories?index=${index}`} passHref>
                  <div className="flex-[0_0_50%] sm:flex-[0_0_50%] md:flex-[0_0_33%] lg:flex-[0_0_25%] px-2">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md group cursor-pointer">
                      <div className="relative h-48 sm:h-56 md:h-64">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-lg md:text-xl font-semibold">{category.name}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Navigation Buttons */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
            onClick={scrollNext}
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
}