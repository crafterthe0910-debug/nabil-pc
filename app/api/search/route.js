import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    if (!q.trim()) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const products = await Product.find({
      $or: [
        { title: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
        { category: new RegExp(q, "i") },
      ],
    }).limit(20);

    return new Response(JSON.stringify(products || []), { status: 200 });
  } catch (error) {
    console.error("Error searching products:", error);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
