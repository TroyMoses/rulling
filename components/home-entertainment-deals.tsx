"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/dummy-data";
import Image from "next/image";

const bannerDeals = [
  {
    id: 1,
    title: "Cinema at home",
    subtitle: "Television deals",
    image: "/banners/tv2.jpg",
    bgColor: "bg-gradient-to-r from-red-600 to-orange-600",
  },
  {
    id: 2,
    title: "Sound Bars",
    subtitle: "Party at home",
    image: "/banners/soundbar.jpg",
    bgColor: "bg-gradient-to-r from-purple-600 to-blue-600",
  },
  {
    id: 3,
    title: "Home theaters",
    subtitle: "Sound setup",
    image: "/banners/theater1.jpg",
    bgColor: "bg-gradient-to-r from-gray-700 to-gray-900",
  },
];

const entertainmentDeals = products
  .filter(
    (p) =>
      p.category === "electronics" ||
      p.name.toLowerCase().includes("tv") ||
      p.name.toLowerCase().includes("speaker") ||
      p.name.toLowerCase().includes("sound") ||
      p.name.toLowerCase().includes("home theater")
  )
  .slice(0, 6);

export function HomeEntertainmentDeals() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            HOME ENTERTAINMENT DEALS Up to 30% off
          </h2>
        </div>

        {/* Banner Deals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {bannerDeals.map((banner) => (
            <div
              key={banner.id}
              className={`${banner.bgColor} rounded-lg p-6 text-white relative overflow-hidden cursor-pointer hover:scale-105 transition-transform min-h-[120px]`}
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1">{banner.title}</h3>
                <p className="text-sm opacity-90">{banner.subtitle}</p>
              </div>
              <div className="absolute right-0 bottom-0 opacity-30">
                <Image
                  width={100}
                  height={100}
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.title}
                  className="w-[120px] h-[120px] object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Entertainment Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {entertainmentDeals.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-3">
                  <div className="relative">
                    <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        width={200}
                        height={200}
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {product.price && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500 text-black text-xs">
                        SALE
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-sm font-medium mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-primary">
                      UGX{" "}
                      {product.price?.toLocaleString() ||
                        product.price.toLocaleString()}
                    </div>
                    {product.price && (
                      <div className="text-sm text-gray-500 line-through">
                        UGX {product.price.toLocaleString()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
