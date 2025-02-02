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

  if (loading) {
    return <div className="text-center py-16">Loading products...</div>;
  }

  if (!products.length) {
    return <div className="text-center py-16">No products found for this category.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={product.photo} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700">₹{product.price}</p>
                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                  Add to Cart
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
