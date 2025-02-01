import { useState, useEffect } from 'react';

interface Category {
  _id: string;
  name: string;
  photo: string;
}

interface CategoryListProps {
  onEdit: (category: Category) => void;
  onCategoryDeleted: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onEdit, onCategoryDeleted }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch('/api/categories');
    const data = await response.json();
    setCategories(data.categories);
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    const data = await response.json();
    if (data.success) {
      alert('Category deleted successfully');
      onCategoryDeleted();
    } else {
      alert('Error deleting category');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Category List</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category._id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
            <span>{category.name}</span>
            <div>
              <button onClick={() => onEdit(category)} className="mr-2 text-blue-500 hover:underline">Edit</button>
              <button onClick={() => handleDelete(category._id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList; 