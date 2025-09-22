"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/lib/dummy-data";
import Image from "next/image";

const deals = [
  products.find((p) => p.name.includes("Tecno Spark")) || products[0],
  products.find((p) => p.name.includes("Smart Watch")) || products[1],
  products.find((p) => p.name.includes("Smart TV")) || products[2],
  products.find((p) => p.name.includes("Electric Kettle")) || products[3],
  products.find((p) => p.name.includes("Memory Card")) || products[4],
  products.find((p) => p.name.includes("Bluetooth Speaker")) || products[5],
].slice(0, 6);

export function HalfPriceDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 bg-red-500">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="text-white">
            <span className="font-bold">SIMBULA</span> with a gadget today
          </div>
          <div className="text-white">
            <span className="font-bold">HALF PRICE DEALS:</span> Ends in:{" "}
            {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}hrs
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {deals.map((deal) => (
            <Link key={deal.id} href={`/products/${deal.id}`}>
              <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-3">
                  <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      width={200}
                      height={200}
                      src={deal.images[0] || "/placeholder.svg"}
                      alt={deal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-medium mb-2 line-clamp-2">
                    {deal.name}
                  </h3>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-primary">
                      UGX{" "}
                      {deal.price?.toLocaleString() ||
                        deal.price.toLocaleString()}
                    </div>
                    {deal.price && (
                      <div className="text-sm text-gray-500 line-through">
                        UGX {deal.price.toLocaleString()}
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
