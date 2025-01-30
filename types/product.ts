export interface Product {
  _id?: string;
  name: string;
  price: number;
  category: string;
  photo: string;
  featured: boolean; // Add featured property
} 