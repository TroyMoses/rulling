"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { Category } from "@/lib/types";
import { products } from "@/lib/dummy-data";

interface ProductFiltersProps {
  category: Category;
}

export function ProductFilters({ category }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get unique brands for this category
  const categoryProducts = products.filter(
    (product) => product.category === category.name
  );
  const brands = [
    ...new Set(categoryProducts.map((product) => product.brand)),
  ].sort();

  const priceRanges = [
    { label: "Under Ugx 50", value: "0-50" },
    { label: "Ugx 50 - Ugx 100", value: "50-100" },
    { label: "Ugx 100 - Ugx 500", value: "100-500" },
    { label: "Ugx 500 - Ugx 1000", value: "500-1000" },
    { label: "Over Ugx 1000", value: "1000-10000" },
  ];

  const ratingOptions = [
    { label: "4+ Stars", value: "4" },
    { label: "3+ Stars", value: "3" },
    { label: "2+ Stars", value: "2" },
    { label: "1+ Stars", value: "1" },
  ];

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(window.location.pathname);
  };

  const hasActiveFilters = searchParams.toString() !== "";

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="cursor-pointer"
              >
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {searchParams.get("brand") && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => updateFilter("brand", "")}
                >
                  Brand: {searchParams.get("brand")}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
              {searchParams.get("price") && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => updateFilter("price", "")}
                >
                  Price: Ugx {searchParams.get("price")?.replace("-", " - Ugx")}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
              {searchParams.get("rating") && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => updateFilter("rating", "")}
                >
                  {searchParams.get("rating")}+ Stars
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sort Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Sort By</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Featured", value: "featured" },
            { label: "Price: Low to High", value: "price-low" },
            { label: "Price: High to Low", value: "price-high" },
            { label: "Customer Rating", value: "rating" },
            { label: "Newest First", value: "newest" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`sort-${option.value}`}
                checked={searchParams.get("sort") === option.value}
                onCheckedChange={() => updateFilter("sort", option.value)}
                className="cursor-pointer border border-foreground"
              />
              <Label
                htmlFor={`sort-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Brand Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Brand</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={searchParams.get("brand") === brand}
                onCheckedChange={() => updateFilter("brand", brand)}
                className="cursor-pointer border border-foreground"
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="text-sm cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {priceRanges.map((range) => (
            <div key={range.value} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${range.value}`}
                checked={searchParams.get("price") === range.value}
                onCheckedChange={() => updateFilter("price", range.value)}
                className="cursor-pointer border border-foreground"
              />
              <Label
                htmlFor={`price-${range.value}`}
                className="text-sm cursor-pointer"
              >
                {range.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Customer Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {ratingOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${option.value}`}
                checked={searchParams.get("rating") === option.value}
                onCheckedChange={() => updateFilter("rating", option.value)}
                className="cursor-pointer border border-foreground"
              />
              <Label
                htmlFor={`rating-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
