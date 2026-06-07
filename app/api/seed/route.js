import connectDB from "@/lib/mongodb";
import Product from "@/models/Product"; // ← import your Product model

export async function GET() {
  await connectDB(); // ← just connect, no arguments

  const products = [
    // Pre-built PCs
    {
      title: "Nabil Pro Gamer PC",
      description: "High-performance gaming desktop with RTX 4080 graphics",
      price: 1899.99,
      category: "prebuilt",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 145,
    },
    {
      title: "Nabil Office Tower",
      description: "Reliable work PC for productivity and everyday use",
      price: 999.0,
      category: "prebuilt",
      image: "https://images.unsplash.com/photo-1517801541368-2f390a3341f7?auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      reviews: 98,
    },
    {
      title: "Nabil Creator Workstation",
      description: "Powerful content creation PC with multitasking",
      price: 2299.0,
      category: "prebuilt",
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 203,
    },
    {
      title: "Nabil Streamer Pro",
      description: "Optimized for streaming with dual graphics",
      price: 2499.99,
      category: "prebuilt",
      image: "https://images.unsplash.com/photo-1552308995-5658671fda5d?auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      reviews: 156,
    },
    {
      title: "Nabil Mini Compact",
      description: "Space-saving compact PC for small desks",
      price: 749.99,
      category: "prebuilt",
      image: "https://images.unsplash.com/photo-1587829191301-72e2e119f087?auto=format&fit=crop&w=400&q=80",
      rating: 4.5,
      reviews: 87,
    },
    // PC Accessories
    {
      title: "Elite Keyboard",
      description: "Premium mechanical keyboard with RGB lighting",
      price: 129.99,
      category: "pc-accessories",
      image: "https://images.unsplash.com/photo-1587829191301-72e2e119f087?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 234,
    },
    {
      title: "Precision Mouse",
      description: "High-precision gaming mouse with adjustable DPI",
      price: 59.99,
      category: "pc-accessories",
      image: "https://images.unsplash.com/photo-1587829191301-72e2e119f087?auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      reviews: 189,
    },
    {
      title: "4K Monitor",
      description: "Professional-grade 4K monitor for content creators",
      price: 449.99,
      category: "pc-accessories",
      image: "https://images.unsplash.com/photo-1587829191301-72e2e119f087?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 312,
    },
    {
      title: "Monitor Stand",
      description: "Adjustable monitor stand with storage",
      price: 49.99,
      category: "pc-accessories",
      image: "https://images.unsplash.com/photo-1587829191301-72e2e119f087?auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      reviews: 145,
    },
    {
      title: "Pro Headset",
      description: "Wireless headset with noise cancellation",
      price: 199.99,
      category: "pc-accessories",
      image: "https://images.unsplash.com/photo-1587829191301-72e2e119f087?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 267,
    },
  ];

  // Clear existing products first
  await Product.deleteMany({});

  await Product.insertMany(products); // ← actually saves to MongoDB

  return new Response("Products seeded successfully");
}