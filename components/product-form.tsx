"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProduct, updateProduct } from "@/lib/server-actions";
import { categories } from "@/lib/dummy-data";
import { toast } from "sonner";
import type { Product } from "@/lib/types";
import { Loader2 } from "lucide-react";

interface ProductFormProps {
  product?: Product;
  onSuccess?: () => void;
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const result = product
        ? await updateProduct(product.id, formData)
        : await createProduct(formData);

      if (result.success) {
        toast.success(result.message);
        onSuccess?.();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              name="name"
              defaultValue={product?.name}
              required
            />
          </div>
          <div>
            <Label htmlFor="brand">Brand *</Label>
            <Input
              id="brand"
              name="brand"
              defaultValue={product?.brand}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={product?.description}
            required
          />
        </div>
      </div>

      {/* Pricing & Stock */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Pricing & Stock</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              defaultValue={product?.price}
              required
            />
          </div>
          <div>
            <Label htmlFor="originalPrice">Original Price ($)</Label>
            <Input
              id="originalPrice"
              name="originalPrice"
              type="number"
              step="0.01"
              defaultValue={product?.originalPrice}
            />
          </div>
          <div>
            <Label htmlFor="stock">Stock Quantity *</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              defaultValue={product?.stock}
              required
            />
          </div>
        </div>
      </div>

      {/* Categories & Tags */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Categories & Tags</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select name="category" defaultValue={product?.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="subcategory">Subcategory</Label>
            <Input
              id="subcategory"
              name="subcategory"
              defaultValue={product?.subcategory}
              placeholder="e.g., Smartphones, Laptops"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            name="tags"
            defaultValue={product?.tags?.join(", ")}
            placeholder="Separate tags with commas (e.g., wireless, bluetooth, portable)"
          />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Features</h3>
        <div>
          <Label htmlFor="mainFeatures">Main Features</Label>
          <Textarea
            id="mainFeatures"
            name="mainFeatures"
            rows={3}
            defaultValue={product?.mainFeatures?.join(", ")}
            placeholder="Separate features with commas (e.g., 4K Display, Fast Charging, Water Resistant)"
          />
        </div>

        <div>
          <Label htmlFor="keyFeatures">Key Features</Label>
          <Textarea
            id="keyFeatures"
            name="keyFeatures"
            rows={3}
            defaultValue={product?.keyFeatures?.join(", ")}
            placeholder="Separate features with commas (e.g., Advanced Camera, Long Battery Life)"
          />
        </div>

        <div>
          <Label htmlFor="whatsInTheBox">What&apos;s in the Box</Label>
          <Textarea
            id="whatsInTheBox"
            name="whatsInTheBox"
            rows={2}
            defaultValue={product?.whatsInTheBox?.join(", ")}
            placeholder="Separate items with commas (e.g., Device, Charger, Cable, Manual)"
          />
        </div>
      </div>

      {/* Specifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Specifications</h3>
        <div>
          <Label htmlFor="specifications">Specifications (JSON format)</Label>
          <Textarea
            id="specifications"
            name="specifications"
            rows={4}
            defaultValue={
              product?.specifications
                ? JSON.stringify(product.specifications, null, 2)
                : ""
            }
            placeholder='{"Display": "6.1 inch", "Storage": "128GB", "RAM": "8GB", "Camera": "48MP"}'
          />
          <p className="text-sm text-muted-foreground mt-1">
            Enter specifications in JSON format. Leave empty if not applicable.
          </p>
        </div>
      </div>

      {/* Images */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Images</h3>
        <div>
          <Label htmlFor="images">Product Images</Label>
          <Input
            id="images"
            name="images"
            type="file"
            multiple
            accept="image/*"
            className="cursor-pointer"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Select multiple images for the product. Supported formats: JPG, PNG,
            WebP
          </p>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Settings</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            name="featured"
            defaultChecked={product?.featured}
            className="cursor-pointer"
          />
          <Label htmlFor="featured" className="cursor-pointer">
            Featured Product
          </Label>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t">
        <Button type="submit" disabled={isLoading} className="cursor-pointer">
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {isLoading
            ? "Saving..."
            : product
            ? "Update Product"
            : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
