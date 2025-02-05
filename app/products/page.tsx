"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  photo: string;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams ? searchParams.get("category") : null;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (category) {
        console.log("Fetching products for category:", category);
        try {
          const response = await fetch(`/api/products?category=${category}`);
          const data = await response.json();
          if (data.success) {
            setProducts(data.products);
            console.log("Products fetched:", data.products);
          } else {
            console.error("No products found for this category.");
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleBuyNow = (product: Product) => {
    const message = encodeURIComponent(
      `Hello, I am interested in purchasing:\n\n🛍 *${product.name}*\n💰 Price: ₹${product.price}\n\nPlease provide more details.`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank"); // Replace with actual WhatsApp number
  };

  if (loading) {
    return <div className="text-center py-16 text-gray-600 text-lg">Loading products...</div>;
  }

  if (!products.length) {
    return <div className="text-center py-16 text-gray-600 text-lg">No products found for this category.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img src={product.photo} alt={product.name} className="w-full h-56 object-cover" />
              <div className="p-5 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-gray-700 text-lg font-medium">₹{product.price}</p>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="mt-4 w-full bg-[#b08968] text-white py-2 rounded-lg hover:bg-gray-900  transition-colors duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
