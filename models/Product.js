import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  photo: { type: String, required: true }, // Store base64 image string
  featured: { type: Boolean, default: false }, // Add featured field
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema); 