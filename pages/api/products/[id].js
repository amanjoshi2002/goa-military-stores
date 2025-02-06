import connectMongo from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  await connectMongo();

  const { category } = req.query; // Get the category ID from query params

  switch (req.method) {
    case "GET":
      try {
        const products = await Product.find({ category }); // Fetch products by category
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "PUT":
      try {
        const { id } = req.query;
        const { name, price, category, photo, featured } = req.body;
        const product = await Product.findByIdAndUpdate(
          id,
          { name, price, category, photo, featured },
          { new: true }
        );
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
