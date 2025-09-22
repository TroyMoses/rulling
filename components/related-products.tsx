"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";
import { products } from "@/lib/dummy-data";

interface RelatedProductsProps {
  currentProduct: Product;
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  // Get related products from the same category, excluding the current product
  const relatedProducts = products
    .filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== currentProduct.id
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-balance">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="cursor-pointer"
          >
            <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.featured && (
                      <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <div className="p-3">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.brand}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors text-balance">
                      {product.name}
                    </h3>

                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({product.reviewCount})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <span className="text-[16px] font-bold text-primary">
                          UGX {product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-muted-foreground line-through">
                            UGX {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="w-full cursor-pointer text-xs"
                      disabled={product.stock === 0}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
