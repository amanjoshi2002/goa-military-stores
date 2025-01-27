"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    name: "T Shirts",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Pants",
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Holsters",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Belts",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Uniform Fabric",
    image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export default function CategorySlider() {
  const [emblaRef1, emblaApi1] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [emblaRef2, emblaApi2] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev1 = useCallback(() => emblaApi1 && emblaApi1.scrollPrev(), [emblaApi1]);
  const scrollNext1 = useCallback(() => emblaApi1 && emblaApi1.scrollNext(), [emblaApi1]);
  const scrollPrev2 = useCallback(() => emblaApi2 && emblaApi2.scrollPrev(), [emblaApi2]);
  const scrollNext2 = useCallback(() => emblaApi2 && emblaApi2.scrollNext(), [emblaApi2]);

  useEffect(() => {
    if (emblaApi1 && emblaApi2) {
      const autoplay1 = setInterval(() => {
        emblaApi1.scrollNext();
      }, 3000);

      const autoplay2 = setInterval(() => {
        emblaApi2.scrollPrev();
      }, 3000);

      return () => {
        clearInterval(autoplay1);
        clearInterval(autoplay2);
      };
    }
  }, [emblaApi1, emblaApi2]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">CATEGORIES</h2>
        
        {/* First Row - Left to Right */}
        <div className="relative mb-8">
          <div className="embla overflow-hidden" ref={emblaRef1}>
            <div className="embla__container flex">
              {categories.slice(0, 3).map((category, index) => (
                <div key={index} className="embla__slide flex-[0_0_300px] min-w-0 mx-4">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md group cursor-pointer">
                    <div className="relative h-64">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
            onClick={scrollPrev1}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
            onClick={scrollNext1}
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Second Row - Right to Left */}
        <div className="relative">
          <div className="embla overflow-hidden" ref={emblaRef2}>
            <div className="embla__container flex">
              {categories.slice(3).map((category, index) => (
                <div key={index} className="embla__slide flex-[0_0_300px] min-w-0 mx-4">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md group cursor-pointer">
                    <div className="relative h-64">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
            onClick={scrollPrev2}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
            onClick={scrollNext2}
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
}