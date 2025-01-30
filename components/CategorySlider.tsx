"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  photo: string;
}

export default function CategorySlider() {
  const [categories, setCategories] = useState<Category[]>([]);
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

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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

  if (categories.length === 0) {
    return <div className="py-16 bg-gray-50 text-center">Loading categories...</div>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">CATEGORIES</h2>
        
        {/* First Row - Left to Right */}
        <div className="relative mb-8">
          <div className="embla overflow-hidden" ref={emblaRef1}>
            <div className="embla__container flex">
              {categories.slice(0, Math.ceil(categories.length / 2)).map((category) => (
                <div key={category._id} className="embla__slide flex-[0_0_300px] min-w-0 mx-4">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md group cursor-pointer">
                    <div className="relative h-64">
                      <img
                        src={category.photo}
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
              {categories.slice(Math.ceil(categories.length / 2)).map((category) => (
                <div key={category._id} className="embla__slide flex-[0_0_300px] min-w-0 mx-4">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md group cursor-pointer">
                    <div className="relative h-64">
                      <img
                        src={category.photo}
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