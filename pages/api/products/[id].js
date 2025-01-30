import connectMongo from '../../../lib/mongodb';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  await connectMongo();

  const { id } = req.query;

  switch (req.method) {
    case 'PUT':
      try {
        const { name, price, category, photo, featured } = req.body;
        const product = await Product.findByIdAndUpdate(
          id,
          { name, price, category, photo, featured },
          { new: true }
        );
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'DELETE':
      try {
        await Product.findByIdAndDelete(id);
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