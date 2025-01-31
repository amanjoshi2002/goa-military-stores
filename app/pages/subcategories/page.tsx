"use client";

import { useSearchParams } from "next/navigation";
import { itemsByCategory } from "@/app/pages/subcategories/data"; // Import the mock data

export default function Subcategories() {
  const searchParams = useSearchParams();
  const categoryIndex = searchParams.get("index"); // Get the index from the URL

  // Find the category and its items
  const category = itemsByCategory.find(
    (cat: { categoryIndex: number; }) => cat.categoryIndex === Number(categoryIndex)
  );

  if (!category) {
    return <div>Category not found!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Items in Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-700">₹{item.price}</p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}