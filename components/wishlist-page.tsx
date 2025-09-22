"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/dummy-data";

export function WishlistPage() {
  // Mock wishlist items (first 3 products for demo)
  const [wishlistItems, setWishlistItems] = useState(products.slice(0, 3));

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== productId));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8" data-aos="fade-up">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">
          {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""}{" "}
          saved for later
        </p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product, index) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
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
                    <div className="absolute top-3 right-3 flex flex-col space-y-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => removeFromWishlist(product.id)}
                        className="cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="cursor-pointer"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="cursor-pointer"
                    >
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors text-balance">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2 text-pretty">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <Badge
                        variant={product.stock > 10 ? "default" : "destructive"}
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
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card data-aos="fade-up">
          <CardContent className="p-12 text-center">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-muted-foreground mb-6">
              Start adding products you love to your wishlist!
            </p>
            <Button asChild className="cursor-pointer">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
