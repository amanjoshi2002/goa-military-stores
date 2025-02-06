import { useState, useEffect } from 'react';
import { Product } from "@/types/product"; // Import the shared interface

interface ProductListProps {
  onEdit: (product: Product) => void;
  onProductDeleted: () => void;
}

const ProductList: React.FC<ProductListProps & { className?: string }> = ({ onEdit, onProductDeleted, className }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
    
    // Add event listener for refresh
    const productListElement = document.querySelector(`.${className}`);
    if (productListElement) {
      productListElement.addEventListener('refresh', fetchProducts);
      return () => {
        productListElement.removeEventListener('refresh', fetchProducts);
      };
    }
  }, [className]);

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data.products);
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) {
      alert('Invalid product ID');
      return;
    }

    const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    const data = await response.json();
    if (data.success) {
      alert('Product deleted successfully');
      onProductDeleted();
    } else {
      alert('Error deleting product');
    }
  };

  return (
    <div className={`mt-8 ${className}`}>
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product._id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center">
              <img src={product.photo} alt={product.name} className="w-12 h-12 object-cover rounded mr-4" />
              <div>
                <span>{product.name} - ₹{new Intl.NumberFormat('en-IN').format(product.price)}</span>
                {product.featured && (
                  <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Featured
                  </span>
                )}
              </div>
            </div>
            <div>
              <button onClick={() => onEdit(product)} className="mr-2 text-blue-500 hover:underline">Edit</button>
              <button 
                onClick={() => handleDelete(product._id)} 
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList; 