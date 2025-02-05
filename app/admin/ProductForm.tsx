import { useState, useEffect } from 'react';
import { put } from '@vercel/blob'; // Import the Vercel Blob SDK
import fs from 'fs';
import path from 'path';
import { Product } from "@/types/product"; // Import the shared interface

interface Category {
  _id: string;
  name: string;
  photo: string;
}

interface ProductFormProps {
  onProductAdded: () => void;
  productToEdit: Product | null;
  onEditComplete: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onProductAdded, productToEdit, onEditComplete }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price.toString());
      setCategory(productToEdit.category);
      setPhoto(productToEdit.photo);
      setFeatured(productToEdit.featured || false);
    }
  }, [productToEdit]);

  const fetchCategories = async () => {
    const response = await fetch('/api/categories');
    const data = await response.json();
    setCategories(data.categories);
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Convert file to base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setPhoto(reader.result); // Set the base64 string
          }
        };
      } catch (error) {
        console.error('Error uploading photo:', error);
        alert('Error uploading photo');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = productToEdit ? 'PUT' : 'POST';
    const endpoint = productToEdit ? `/api/products/${productToEdit._id}` : '/api/products';

    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, category, photo, featured }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Product saved successfully');
      onProductAdded();
      if (productToEdit) onEditComplete();
      if (!productToEdit) {
        setName('');
        setPrice('');
        setCategory('');
        setPhoto('');
        setFeatured(false);
      }
    } else {
      alert('Error saving product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <input type="file" onChange={handlePhotoChange} className="w-full" required />
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          id="featured"
          className="mr-2"
        />
        <label htmlFor="featured" className="text-sm text-gray-600">
          Featured Product
        </label>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
        {productToEdit ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm; 