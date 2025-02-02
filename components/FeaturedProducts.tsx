"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: string;
  rating: number;
  photo: string; // Change this to photo if that's the correct field
  featured: boolean;
}

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const phoneNumber = "1234567890"; // Replace with your phone number (include country code)

  const createWhatsAppLink = (productName: string) => {
    const message = `Hello! I'm interested in the details of the "${productName}".`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        console.log("Fetched Products:", data.products); // Log the fetched products
        if (data.success) {
          const featured = data.products.filter((product: Product) => product.featured);
          setFeaturedProducts(featured);
        } else {
          console.error("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product._id} className="group">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={product.photo} // Use product.photo if that's the correct field
                  alt={product.name}
                  className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white text-black rounded-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    onClick={() => window.open(createWhatsAppLink(product.name), "_blank")}
                  >
                    Get details
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-[#b08968]">{product.price}</span>
                  <div className="flex">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#b08968] text-[#b08968]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}