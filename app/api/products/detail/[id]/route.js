import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req, { params: paramsPromise }) {
  try {
    await connectDB();
    const { id } = await paramsPromise;

    const product = await Product.findById(id);
    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch product" }), { status: 500 });
  }
}
