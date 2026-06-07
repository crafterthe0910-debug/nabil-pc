import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req, { params: paramsPromise }) {
  try {
    await connectDB();
    const { category } = await paramsPromise;

    let query = {};
    if (category !== "all") {
      query.category = new RegExp(category, "i");
    }

    const products = await Product.find(query).limit(100);
    return new Response(JSON.stringify(products || []), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 });
  }
}
