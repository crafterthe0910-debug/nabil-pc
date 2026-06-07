import Link from "next/link";

const customParts = [
  {
    title: "Processor (CPU)",
    description: "High-performance multi-core processors for gaming, streaming, and intensive rendering workloads.",
    price: 349.99,
    category: "custom-built",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 512,
  },
  {
    title: "Graphics Card (GPU)",
    description: "Next-generation graphics processing units for maximum frame rates and real-time ray tracing.",
    price: 699.99,
    category: "custom-built",
    image: "https://images.unsplash.com/photo-1591448372338-086df52d574e?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 340,
  },
  {
    title: "Motherboard",
    description: "Feature-rich motherboards with robust power delivery, PCIe expansion slots, and high-speed connectivity.",
    price: 189.50,
    category: "custom-built",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviews: 189,
  },
  {
    title: "Memory (RAM)",
    description: "High-speed DDR5 memory kits optimized for system responsiveness and extreme multitasking capabilities.",
    price: 124.99,
    category: "custom-built",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 275,
  },
  {
    title: "Solid State Drive (SSD)",
    description: "Ultra-fast NVMe M.2 storage drives providing blazing-fast boot times and instantaneous application loading.",
    price: 99.99,
    category: "custom-built",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 422,
  },
  {
    title: "Power Supply Unit (PSU)",
    description: "Efficient, fully modular power supplies delivering clean, reliable energy to protect your internal components.",
    price: 119.99,
    category: "custom-built",
    image: "https://images.unsplash.com/photo-1555616635-640b71bdb185?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    reviews: 115,
  }
];

export default function CustomBuiltPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Custom Built / Buy</p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900">Build your custom PC</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              Choose the exact PC parts you want or ask us to assemble the system for you.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back to Home
          </Link>
        </div>

        {/* Component Grid Container */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Select the parts you need</h2>
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              Pick or request build
            </span>
          </div>

          {/* Grid Layout mapping the component schema */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {customParts.map((part) => (
              <article 
                key={part.title} 
                className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition hover:border-emerald-400 hover:bg-white flex flex-col"
              >
                {/* Component Image */}
                <div className="relative h-48 w-full bg-slate-200">
                  <img 
                    src={part.image} 
                    alt={part.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm uppercase tracking-wider">
                    {part.category}
                  </span>
                </div>

                {/* Content Block */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-slate-900">{part.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 flex-grow">{part.description}</p>
                  
                  {/* Metadata: Price & Ratings */}
                  <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-slate-400 block uppercase">Base Price</span>
                      <span className="text-xl font-bold text-slate-900">${part.price.toFixed(2)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-slate-400 block uppercase">Rating</span>
                      <span className="text-sm font-semibold text-slate-800">
                        ⭐ {part.rating} <span className="text-xs font-normal text-slate-500">({part.reviews})</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Ask us to build your PC
            </Link>
            <span className="text-sm text-slate-600">
              Need help choosing parts? Our team can configure a system for your budget and goals.
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}