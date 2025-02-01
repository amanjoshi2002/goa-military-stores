"use client";

import { Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Tactical Combat Jacket",
    price: "$199.99",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580654843061-8c90a9585600?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
  {
    id: 2,
    name: "Military Grade Backpack",
    price: "$89.99",
    rating: 4,
    image: "https://images.unsplash.com/photo-1542729779-11d8fe8e25f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
  {
    id: 3,
    name: "Combat Boots",
    price: "$149.99",
    rating: 5,
    image: "https://images.unsplash.com/photo-1595341595379-cf1cb694ea1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
  {
    id: 4,
    name: "Tactical Gloves",
    price: "$39.99",
    rating: 4,
    image: "https://images.unsplash.com/photo-1584285418616-f8bb0c7d2e9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1972&q=80",
  },
];

export default function FeaturedProducts() {
  const phoneNumber = "1234567890"; // Replace with your phone number (include country code)
  const createWhatsAppLink = (productName: string) => {
    const message = `Hello! I'm interested in the details of the "${productName}".`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={product.image}
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
