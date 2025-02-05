"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import { deleteCookie, getCookie } from "cookies-next";
import { Product } from "@/types/product";

interface Category {
  _id?: string;
  name: string;
  photo: string;
}

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = getCookie("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/admin/login"); // Redirect to login page if not logged in
    } else {
      setIsLoggedIn(true); // Update state to reflect login status
    }
  }, [router]);

  const handleLogout = () => {
    deleteCookie("isLoggedIn");
    router.push("/admin/login");
  };

  const handleProductAdded = () => {
    setProductToEdit(null);
    // Force refresh the product list
    const productList = document.querySelector('.product-list');
    if (productList) {
      productList.dispatchEvent(new Event('refresh'));
    }
  };

  if (!isLoggedIn) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <div className="flex">
        <div className="w-1/4 p-4 bg-gray-100 h-screen flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('products')} className={`text-blue-500 hover:underline ${activeTab === 'products' ? 'font-bold' : ''}`}>
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('categories')} className={`text-blue-500 hover:underline ${activeTab === 'categories' ? 'font-bold' : ''}`}>
                  Categories
                </button>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <button onClick={() => router.push('/')} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
              Go to Home Page
            </button>
            <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
              Logout
            </button>
          </div>
        </div>
        <div className="w-3/4 p-8">
          {activeTab === 'products' ? (
            <>
              <h1 className="text-2xl font-bold mb-4">Products</h1>
              <ProductForm
                onProductAdded={handleProductAdded}
                productToEdit={productToEdit}
                onEditComplete={() => setProductToEdit(null)}
              />
              <ProductList
                onEdit={setProductToEdit}
                onProductDeleted={handleProductAdded}
                className="product-list"
              />
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">Categories</h1>
              <CategoryForm
                onCategoryAdded={() => setCategoryToEdit(null)}
                categoryToEdit={categoryToEdit}
                onEditComplete={() => setCategoryToEdit(null)}
              />
              <CategoryList
                onEdit={setCategoryToEdit}
                onCategoryDeleted={() => setCategoryToEdit(null)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;