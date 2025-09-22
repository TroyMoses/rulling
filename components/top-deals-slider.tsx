"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Top Deals",
    subtitle: "60% off",
    icon: "🔥",
    bgColor: "bg-yellow-400",
    textColor: "text-white",
  },
  {
    id: 2,
    name: "Mobiles",
    icon: "📱",
    bgColor: "bg-green-100",
    textColor: "text-gray-800",
  },
  {
    id: 3,
    name: "Spring/Summer 2022",
    icon: "👕",
    bgColor: "bg-orange-100",
    textColor: "text-gray-800",
  },
  {
    id: 4,
    name: "Wearables",
    icon: "⌚",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
  },
  {
    id: 5,
    name: "Appliances",
    icon: "🏠",
    bgColor: "bg-blue-100",
    textColor: "text-gray-800",
  },
  {
    id: 6,
    name: "Headphones",
    icon: "🎧",
    bgColor: "bg-purple-100",
    textColor: "text-gray-800",
  },
  {
    id: 7,
    name: "Televisions",
    icon: "📺",
    bgColor: "bg-pink-100",
    textColor: "text-gray-800",
  },
];

export function TopDealsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 5;
  const maxIndex = Math.max(0, categories.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-50"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-50"
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Categories Slider */}
          <div className="overflow-hidden mx-12">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
              }}
            >
              {categories.map((category) => (
                <div key={category.id} className="flex-shrink-0 w-1/5 px-2">
                  <div className="text-center cursor-pointer group">
                    <div
                      className={`w-24 h-24 mx-auto rounded-full ${category.bgColor} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}
                    >
                      {category.id === 1 ? (
                        <div className="text-center">
                          <div className="text-white font-bold text-xs">
                            Top
                          </div>
                          <div className="text-white font-bold text-xs">
                            Deals
                          </div>
                          <div className="bg-red-500 text-white text-xs px-1 rounded mt-1">
                            60%
                          </div>
                        </div>
                      ) : (
                        <span className="text-5xl">{category.icon}</span>
                      )}
                    </div>
                    <h3
                      className={`text-sm font-medium ${category.textColor} text-center`}
                    >
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
