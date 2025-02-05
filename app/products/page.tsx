"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    // Extract category from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromParams = urlParams.get("category");
    setCategory(categoryFromParams);

    const fetchProducts = async () => {
      if (categoryFromParams) {
        console.log("Fetching products for category:", categoryFromParams);
        try {
          const response = await fetch(`/api/products?category=${categoryFromParams}`);
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
  }, []); // Run effect only once on mount

  const handleBuyNow = (product: Product) => {
    const message = encodeURIComponent(
      `Hello, I am interested in purchasing:\n\n🛍 *${product.name}*\n💰 Price: ₹${product.price}\n\nPlease provide more details.`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank"); // Replace with actual WhatsApp number
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (!products.length) {
    return <div className="text-center py-16 text-gray-600 text-lg">No products found for this category.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-10 text-center text-gray-900">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img src={product.photo} alt={product.name} className="w-full h-72 object-cover transition-transform duration-300 transform hover:scale-110" />
              <div className="p-6 text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-gray-700 text-xl font-medium mb-4">₹{product.price}</p>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="mt-4 w-full bg-[#b08968] text-white py-3 rounded-lg hover:bg-[#a0785b] transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
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
