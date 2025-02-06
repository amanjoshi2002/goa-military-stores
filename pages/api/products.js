import connectMongo from "../../lib/mongodb";
import Product from "../../models/Product";

export default async function handler(req, res) {
  await connectMongo();

  switch (req.method) {
    case "GET":
      try {
        const { category } = req.query; // Get the category name from query params
        const query = category ? { category } : {}; // Use category name in the query
        const products = await Product.find(query); // This should work with category as a string
        res.status(200).json({ success: true, products });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error });
      }
      break;
    case "POST":
      try {
        const { name, price, category, photo, featured } = req.body;
        const product = new Product({ name, price, category, photo, featured });
        await product.save();
        res.status(201).json({ success: true, data: product });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
