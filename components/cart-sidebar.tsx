"use client";

import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import Image from "next/image";

export function CartSidebar() {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();
  const { user } = useAuth();

  if (getTotalItems() === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Shopping Cart
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Add some products to get started!
            </p>
            <Button onClick={() => setIsOpen(false)}>Continue Shopping</Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({getTotalItems()})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={`${item.product.id}-${
                  item.selectedVariation || "default"
                }-${index}`}
                className="flex gap-4 p-4 border rounded-lg"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    width={64}
                    height={64}
                    src={item.product.images[0] || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2">
                    {item.product.name}
                  </h4>
                  {item.selectedVariation && (
                    <p className="text-xs text-gray-500 mt-1">
                      Variation: {item.selectedVariation}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.selectedVariation
                          )
                        }
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.selectedVariation
                          )
                        }
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        removeFromCart(item.product.id, item.selectedVariation)
                      }
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-sm font-medium text-primary mt-1">
                    UGX{" "}
                    {(
                      (item.product.price || item.product.price) *
                      item.quantity
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total:</span>
            <span>UGX {getTotalPrice().toLocaleString()}</span>
          </div>

          {!user ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 text-center">
                Please login to checkout
              </p>
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </div>
          ) : (
            <Button className="w-full" size="lg">
              Proceed to Checkout
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
