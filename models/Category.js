import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true }, // Store local file path
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema); 