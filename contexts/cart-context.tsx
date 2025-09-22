"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/lib/types"
import { useAuth } from "@/contexts/auth-context"

export interface CartItem {
  product: Product
  quantity: number
  selectedVariation?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity: number, selectedVariation?: string) => void
  removeFromCart: (productId: string, selectedVariation?: string) => void
  updateQuantity: (productId: string, quantity: number, selectedVariation?: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      // Load cart from server for logged-in users
      loadCartFromServer()
    } else {
      // Load cart from localStorage for guest users
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart))
        } catch (error) {
          console.error("Failed to load cart from localStorage:", error)
        }
      }
    }
  }, [user])

  useEffect(() => {
    if (user) {
      // Save to server for logged-in users (debounced)
      const timeoutId = setTimeout(() => {
        saveCartToServer()
      }, 1000)
      return () => clearTimeout(timeoutId)
    } else {
      // Save to localStorage for guest users
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, user])

  const loadCartFromServer = async () => {
    try {
      const response = await fetch("/api/cart")
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setItems(data.cart)
        }
      }
    } catch (error) {
      console.error("Failed to load cart from server:", error)
    }
  }

  const saveCartToServer = async () => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      })
    } catch (error) {
      console.error("Failed to save cart to server:", error)
    }
  }

  const mergeGuestCartWithUserCart = async () => {
    const guestCart = localStorage.getItem("cart")
    if (guestCart) {
      try {
        const guestItems = JSON.parse(guestCart)
        if (guestItems.length > 0) {
          // Merge guest cart with existing user cart
          setItems((prevItems) => {
            const merged = [...prevItems]
            guestItems.forEach((guestItem: CartItem) => {
              const existingIndex = merged.findIndex(
                (item) =>
                  item.product.id === guestItem.product.id && item.selectedVariation === guestItem.selectedVariation,
              )
              if (existingIndex > -1) {
                merged[existingIndex].quantity += guestItem.quantity
              } else {
                merged.push(guestItem)
              }
            })
            return merged
          })
          // Clear guest cart from localStorage
          localStorage.removeItem("cart")
        }
      } catch (error) {
        console.error("Failed to merge guest cart:", error)
      }
    }
  }

  useEffect(() => {
    if (user) {
      mergeGuestCartWithUserCart()
    }
  }, [user])

  const addToCart = (product: Product, quantity: number, selectedVariation?: string) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedVariation === selectedVariation,
      )

      if (existingItemIndex > -1) {
        // Update existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Add new item
        return [...prevItems, { product, quantity, selectedVariation }]
      }
    })
  }

  const removeFromCart = (productId: string, selectedVariation?: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => !(item.product.id === productId && item.selectedVariation === selectedVariation)),
    )
  }

  const updateQuantity = (productId: string, quantity: number, selectedVariation?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedVariation)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.selectedVariation === selectedVariation ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = item.product.price || item.product.price
      return total + price * item.quantity
    }, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
