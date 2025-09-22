"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/dummy-data";

export function FeaturedProducts() {
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Handpicked premium products that our customers love most
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="cursor-pointer"
            >
              <Card
                className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.originalPrice && (
                        <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                          Sale
                        </Badge>
                      )}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors text-balance">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2 text-pretty">
                        {product.description}
                      </p>

                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({product.reviewCount})
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-primary">
                            UGX {product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              UGX {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <Badge
                          variant={
                            product.stock > 10 ? "default" : "destructive"
                          }
                          className="text-xs"
                        >
                          {product.stock > 0
                            ? `${product.stock} left`
                            : "Out of stock"}
                        </Badge>
                      </div>

                      <Button
                        className="w-full cursor-pointer"
                        disabled={product.stock === 0}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12" data-aos="fade-up">
          <Button
            variant="outline"
            size="lg"
            className="cursor-pointer bg-transparent"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
