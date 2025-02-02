import { useEffect, useState } from 'react';
import { Product } from "@/types/product"; // Import the shared interface

interface ProductListProps {
  category: string;
}

const ProductList: React.FC<ProductListProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/products?category=${category}`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="product-list">
      <h2 className="text-2xl font-bold mb-4">Products in {category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <img src={product.photo} alt={product.name} className="w-full h-48 object-cover mb-2" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList; 