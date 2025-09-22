"use client";

import type React from "react";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductGrid } from "@/components/product-grid";
import { products, categories } from "@/lib/dummy-data";

interface SearchResultsProps {
  searchParams: {
    q?: string;
    category?: string;
    sort?: string;
  };
}

export function SearchResults({ searchParams }: SearchResultsProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchParams.q || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.category || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.sort || "relevance");

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory && selectedCategory !== "all")
      params.set("category", selectedCategory);
    if (sortBy && sortBy !== "relevance") params.set("sort", sortBy);

    const newUrl = params.toString()
      ? `/search?${params.toString()}`
      : "/search";
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, selectedCategory, sortBy, router]);

  const filteredProducts = useMemo(() => {
    let results = products;

    // Filter by search query
    if (searchQuery) {
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      results = results.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort results
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        results.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        // Relevance - featured first, then by rating
        results.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
    }

    return results;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The useEffect will handle URL update
  };

  return (
    <div className="container mx-auto px-4">
      {/* Search Header */}
      <div className="mb-8" data-aos="fade-up">
        <h1 className="text-3xl font-bold mb-4">
          {searchParams.q
            ? `Search Results for "${searchParams.q}"`
            : "Search Products"}
        </h1>
        <p className="text-muted-foreground">
          {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8" data-aos="fade-up">
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </form>

            {/* Category Filter */}
            <Select
              value={selectedCategory || "all"}
              onValueChange={(value) =>
                setSelectedCategory(value === "all" ? "" : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Options */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            {/* Advanced Filters Button */}
            <Button variant="outline" className="cursor-pointer bg-transparent">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSearchQuery("")}
                >
                  Search: {searchQuery}
                  <button className="ml-1 text-xs">×</button>
                </Badge>
              )}
              {selectedCategory && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory("")}
                >
                  Category: {selectedCategory}
                  <button className="ml-1 text-xs">×</button>
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <Card data-aos="fade-up">
          <CardContent className="p-12 text-center">
            <div className="mb-4">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what
                you&apos;re looking for.
              </p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Suggestions:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Check your spelling</li>
                <li>Try more general keywords</li>
                <li>Remove some filters</li>
                <li>Browse our categories instead</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
