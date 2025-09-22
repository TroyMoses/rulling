"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/dummy-data";
import Image from "next/image";

const bannerDeals = [
  {
    id: 1,
    title: "Crazy phone Deals",
    image: "/person-using-smartphone.jpg",
    bgColor: "bg-gradient-to-r from-purple-400 to-pink-400",
  },
  {
    id: 2,
    title: "SAMSUNG PHONE DEALS",
    image: "/samsung-phone-stand.jpg",
    bgColor: "bg-gradient-to-r from-pink-500 to-purple-600",
  },
  {
    id: 3,
    title: "CAMON 19",
    image: "/tecno-camon-phones.jpg",
    bgColor: "bg-gradient-to-r from-blue-600 to-purple-700",
  },
];

const phoneDeals = products
  .filter(
    (p) =>
      p.category === "phones-tablets" ||
      p.name.toLowerCase().includes("phone") ||
      p.name.toLowerCase().includes("samsung") ||
      p.name.toLowerCase().includes("iphone") ||
      p.name.toLowerCase().includes("tecno")
  )
  .slice(0, 6);

export function SmartphoneDeals() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            SMARTPHONE DEALS Up to 30% off
          </h2>
        </div>

        {/* Banner Deals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {bannerDeals.map((banner) => (
            <div
              key={banner.id}
              className={`${banner.bgColor} rounded-lg p-6 text-white relative overflow-hidden cursor-pointer hover:scale-105 transition-transform`}
            >
              <h3 className="text-xl font-bold mb-2">{banner.title}</h3>
              <div className="absolute right-0 bottom-0 opacity-20">
                <Image
                  width={150}
                  height={150}
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.title}
                  className="w-32 h-32 object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Phone Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {phoneDeals.map((phone) => (
            <Link key={phone.id} href={`/products/${phone.id}`}>
              <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-3">
                  <div className="relative">
                    <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        width={200}
                        height={200}
                        src={phone.images[0] || "/placeholder.svg"}
                        alt={phone.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {phone.price && (
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                        SALE
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-sm font-medium mb-2 line-clamp-2">
                    {phone.name}
                  </h3>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-primary">
                      UGX{" "}
                      {phone.price?.toLocaleString() ||
                        phone.price.toLocaleString()}
                    </div>
                    {phone.price && (
                      <div className="text-sm text-gray-500 line-through">
                        UGX {phone.price.toLocaleString()}
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
