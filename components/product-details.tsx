"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  Facebook,
  Twitter,
  MessageCircle,
  Plus,
  Minus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Product } from "@/lib/types";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState("");
  const [showVariationModal, setShowVariationModal] = useState(false);
  const [variationQuantities, setVariationQuantities] = useState<
    Record<string, number>
  >({});

  const { user } = useAuth();
  const { addToCart, setIsOpen } = useCart();
  const router = useRouter();

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const variations = product.variations || [];

  const handleVariationQuantityChange = (
    variationId: string,
    change: number
  ) => {
    setVariationQuantities((prev) => ({
      ...prev,
      [variationId]: Math.max(0, (prev[variationId] || 0) + change),
    }));
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      router.push("/login");
      return;
    }

    if (variations.length > 0) {
      setShowVariationModal(true);
    } else {
      addToCart(product, quantity);
      toast.success(`Added ${product.name} to cart`);
      setIsOpen(true);
    }
  };

  const handleVariationAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      router.push("/login");
      return;
    }

    const selectedItems = Object.entries(variationQuantities).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, qty]) => qty > 0
    );

    selectedItems.forEach(([variationId, qty]) => {
      const variation = variations.find((v) => v.id === variationId);
      if (variation) {
        addToCart(product, qty, variation.name);
      }
    });

    if (selectedItems.length > 0) {
      toast.success(`Added ${selectedItems.length} variation(s) to cart`);
      setIsOpen(true);
    }

    setShowVariationModal(false);
    setVariationQuantities({});
  };

  const totalVariationItems = Object.values(variationQuantities).reduce(
    (sum, qty) => sum + qty,
    0
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4" data-aos="fade-right">
        <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.originalPrice && (
            <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
              -{discountPercentage}%
            </Badge>
          )}
          <div className="absolute top-4 right-4">
            <Button
              variant="secondary"
              size="icon"
              className="cursor-pointer bg-white/80 hover:bg-white"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {product.images.map((image, index) => (
            <button
              key={index}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 cursor-pointer ${
                selectedImage === index
                  ? "border-primary"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Share Section */}
        <div className="pt-4">
          <h3 className="text-lg font-semibold mb-3">SHARE THIS PRODUCT</h3>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer rounded-full bg-transparent"
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer rounded-full bg-transparent"
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer rounded-full bg-transparent"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6" data-aos="fade-left">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-balance">
            {product.name}
          </h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm text-muted-foreground">
              Brand:{" "}
              <Link
                href={`/brands/${product.brand.toLowerCase()}`}
                className="text-primary hover:underline"
              >
                {product.brand}
              </Link>
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            {variations.length > 0 ? (
              <span className="text-lg md:text-xl font-bold text-primary">
                UGX{" "}
                {Math.min(...variations.map((v) => v.price)).toLocaleString()} -
                UGX{" "}
                {Math.max(...variations.map((v) => v.price)).toLocaleString()}
              </span>
            ) : (
              <span className="text-lg md:text-xl font-bold text-primary">
                UGX {product.price.toLocaleString()}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-[12px] text-muted-foreground line-through">
                UGX {product.originalPrice.toLocaleString()}
              </span>
            )}
            {discountPercentage > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{discountPercentage}%
              </Badge>
            )}
          </div>
          {variations.length > 0 && (
            <p className="text-sm text-orange-600">
              Some variations with low stock
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            + shipping from <span className="font-medium">UGX 2,500</span> to
            Central Business District
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.reviewCount > 0
              ? `(${product.reviewCount} reviews)`
              : "(No ratings available)"}
          </span>
        </div>

        {/* Variations */}
        {variations.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">VARIATION AVAILABLE</h3>
            <div className="flex space-x-2 flex-wrap">
              {variations.map((variation) => (
                <Button
                  key={variation.id}
                  variant={
                    selectedVariation === variation.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedVariation(variation.id)}
                  className="cursor-pointer"
                >
                  {variation.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {variations.length === 0 && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="cursor-pointer px-3"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="cursor-pointer px-3"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                ({quantity} item(s) added)
              </span>
            </div>
          )}

          <Button
            size="lg"
            className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white"
            disabled={product.stock === 0}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {user ? "Add to cart" : "Login to Add to Cart"}
          </Button>
        </div>

        {/* Promotions */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">PROMOTIONS</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                FREE DELIVERY
              </Badge>
              <span className="text-sm text-muted-foreground">
                on orders above UGX 200,000
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                BULK DISCOUNT
              </Badge>
              <span className="text-sm text-muted-foreground">
                Buy 2 or more and save 5%
              </span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">
                On orders over UGX 200,000
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Warranty</p>
              <p className="text-xs text-muted-foreground">1 year coverage</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Easy Returns</p>
              <p className="text-xs text-muted-foreground">30-day policy</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="lg:col-span-2 mt-12">
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications" className="cursor-pointer">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="shipping" className="cursor-pointer">
              Shipping
            </TabsTrigger>
            <TabsTrigger value="returns" className="cursor-pointer">
              Returns
            </TabsTrigger>
          </TabsList>
          <TabsContent value="specifications" className="space-y-6">
            {product.mainFeatures && product.mainFeatures.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">MAIN FEATURES</h3>
                  <div className="space-y-3">
                    {product.mainFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-primary">•</span>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.keyFeatures && product.keyFeatures.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">KEY FEATURES</h3>
                    <div className="space-y-3">
                      {product.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <span className="text-primary">•</span>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {product.whatsInTheBox && product.whatsInTheBox.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">
                      WHAT&apos;S IN THE BOX
                    </h3>
                    <div className="space-y-2">
                      {product.whatsInTheBox.map((item, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <span className="text-primary">•</span>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Specifications Table */}
            {product.specifications && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">SPECIFICATIONS</h3>
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between py-2 border-b"
                        >
                          <span className="font-medium">{key}:</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Shipping */}
          <TabsContent value="shipping" className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-2">
                <p className="font-medium">Shipping Information</p>
                <p className="text-sm text-muted-foreground">
                  • Free standard shipping on orders over UGX 200,000
                </p>
                <p className="text-sm text-muted-foreground">
                  • Express shipping available for UGX 20,000
                </p>
                <p className="text-sm text-muted-foreground">
                  • Standard delivery: 1-2 business days
                </p>
                <p className="text-sm text-muted-foreground">
                  • Express delivery: 1 business day or hours
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="returns" className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-2">
                <p className="font-medium">Return Policy</p>
                <p className="text-sm text-muted-foreground">
                  • 30-day return window
                </p>
                <p className="text-sm text-muted-foreground">
                  • Items must be in original condition
                </p>
                <p className="text-sm text-muted-foreground">
                  • Free return shipping on defective items
                </p>
                <p className="text-sm text-muted-foreground">
                  • Refunds processed within 5-7 business days
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showVariationModal} onOpenChange={setShowVariationModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Please select a variation
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowVariationModal(false)}
                className="cursor-pointer"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {variations.map((variation) => (
              <div key={variation.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">{variation.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">
                        UGX {variation.price.toLocaleString()}
                      </span>
                      {variation.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          UGX {variation.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-sm ${
                        variation.stock <= 5 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {variation.stock <= 5
                        ? `${variation.stock} units left`
                        : "In stock"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleVariationQuantityChange(variation.id, -1)
                      }
                      className="cursor-pointer bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="min-w-[2rem] text-center">
                      {variationQuantities[variation.id] || 0}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleVariationQuantityChange(variation.id, 1)
                      }
                      className="cursor-pointer bg-orange-500 text-white hover:bg-orange-600"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex space-x-4 pt-4">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 cursor-pointer bg-transparent"
                onClick={() => setShowVariationModal(false)}
              >
                Continue Shopping
              </Button>
              <Button
                size="lg"
                className="flex-1 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white"
                onClick={handleVariationAddToCart}
                disabled={totalVariationItems === 0}
              >
                Go to Cart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
