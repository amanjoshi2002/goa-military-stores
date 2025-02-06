import { useState, useEffect } from 'react';
import path from 'path';
import fs from 'fs';

interface Category {
  _id?: string;
  name: string;
  photo: string;
}

interface CategoryFormProps {
  onCategoryAdded: () => void;
  categoryToEdit: Category | null;
  onEditComplete: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onCategoryAdded, categoryToEdit, onEditComplete }) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
      setPhoto(categoryToEdit.photo);
    }
  }, [categoryToEdit]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value; // Assume the user inputs a URL
    if (url) {
      setPhoto(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = categoryToEdit ? 'PUT' : 'POST';
    const endpoint = categoryToEdit ? `/api/categories/${categoryToEdit._id}` : '/api/categories';

    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, photo }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Category saved successfully');
      onCategoryAdded();
      if (categoryToEdit) onEditComplete();
      setName('');
      setPhoto('');
    } else {
      alert('Error saving category');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input type="text" value={photo} onChange={handlePhotoChange} placeholder="Photo URL" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
        {categoryToEdit ? 'Update Category' : 'Add Category'}
      </button>
    </form>
  );
};

export default CategoryForm; 