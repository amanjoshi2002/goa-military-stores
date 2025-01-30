import connectMongo from '../../../lib/mongodb';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  await connectMongo();

  const { id } = req.query;

  switch (req.method) {
    case 'PUT':
      try {
        const { name, photo } = req.body;
        const category = await Category.findByIdAndUpdate(id, { name, photo }, { new: true });
        res.status(200).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'DELETE':
      try {
        await Category.findByIdAndDelete(id);
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
} 