"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Category {
  _id: string;
  name: string;
  photo: string;
}

export default function CategorySlider() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const router = useRouter();

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/products?category=${categoryName}`);
  };

  if (loading) {
    return <div className="py-16 bg-gray-50 text-center">Loading categories...</div>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">CATEGORIES</h2>
        <div className="relative mb-8">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {categories.map((category) => (
                <div key={category._id} className="embla__slide mx-4 cursor-pointer" onClick={() => handleCategoryClick(category.name)}>
                  <div className="category-card">
                    <div className="relative">
                      <img src={category.photo} alt={category.name} className="w-full h-full object-cover" />
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
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10" onClick={scrollPrev}>
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10" onClick={scrollNext}>
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
}
