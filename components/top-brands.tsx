"use client";

import Image from "next/image";

const brands = [
  {
    id: 1,
    name: "Nokia",
    logo: "/brands/nokia.jpg",
    bgColor: "bg-gray-800",
  },
  {
    id: 2,
    name: "Hisense",
    logo: "/brands/hisense.jpg",
    bgColor: "bg-gray-700",
  },
  {
    id: 3,
    name: "Vision",
    logo: "/brands/vision.jpg",
    bgColor: "bg-red-600",
  },
  {
    id: 4,
    name: "Realme",
    logo: "/brands/realme.jpg",
    bgColor: "bg-black",
  },
  {
    id: 5,
    name: "Samsung",
    logo: "/brands/samsung.jpg",
    bgColor: "bg-blue-600",
  },
  {
    id: 6,
    name: "Nokia",
    logo: "/brands/nokia.jpg",
    bgColor: "bg-gray-800",
  },
  {
    id: 7,
    name: "Hisense",
    logo: "/brands/hisense.jpg",
    bgColor: "bg-gray-700",
  },
];

export function TopBrands() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            TOP BRANDS
          </h2>
        </div>

        {/* Brands Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-4xl">
            {brands.map((brand) => (
              <div key={brand.id} className="group cursor-pointer">
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${brand.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <Image
                    width={40}
                    height={40}
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    className="w-10 h-10 md:w-20 md:h-20 object-fill rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
