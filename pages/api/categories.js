import connectMongo from '../../lib/mongodb';
import Category from '../../models/Category';

export default async function handler(req, res) {
  await connectMongo();

  switch (req.method) {
    case 'GET':
      try {
        const categories = await Category.find({});
        res.status(200).json({ success: true, categories });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'POST':
      try {
        const { name, photo } = req.body;
        const category = new Category({ name, photo });
        await category.save();
        res.status(201).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
} 