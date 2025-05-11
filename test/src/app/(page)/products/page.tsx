"use client";

import { ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../component/ui/breadcrumb";
import { Button } from "../../component/ui/button";
import { Checkbox } from "../../component/ui/checkbox";
import { Label } from "../../component/ui/label";
import { RadioGroup, RadioGroupItem } from "../../component/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../component/ui/select";
import ProductCard from "../../component/ProductCard";
import { useEffect, useState } from "react";
import StarRating from "../../component/ui/StarRating";
import { products } from "../../mock_data";

export default function Products() {
  const [location, setLocation] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  // Parse query params from URL

  useEffect(() => {
    setLocation(window.location.search);
  }, []);

  const searchParams = new URLSearchParams(location.split("?")[1] || "");
  const searchQuery = searchParams.get("search");
  const categoryParam = searchParams.get("category");

  // Set initial category if present in URL
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter products based on criteria
  const filteredProducts = products?.filter((product) => {
    // Filter by search query
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    // Filter by price range
    if (priceRange) {
      const price = product.price;
      if (priceRange === "under50" && price >= 50) return false;
      if (priceRange === "50to100" && (price < 50 || price > 100)) return false;
      if (priceRange === "100to200" && (price < 100 || price > 200))
        return false;
      if (priceRange === "over200" && price <= 200) return false;
    }

    // Filter by rating
    if (selectedRatings.length > 0) {
      const rating = parseFloat(product.rating || "0");
      return selectedRatings.some((minRating) => rating >= minRating);
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    if (sortBy === "priceAsc") return a.price - b.price;
    if (sortBy === "priceDesc") return b.price - a.price;
    if (sortBy === "rating")
      return parseFloat(b.rating || "0") - parseFloat(a.rating || "0");
    if (sortBy === "newest") return Number(b.id) - Number(a.id);
    return 0;
  });

  const toggleRatingFilter = (rating: number) => {
    setSelectedRatings((prevRatings) => {
      if (prevRatings.includes(rating)) {
        return prevRatings.filter((r) => r !== rating);
      } else {
        return [...prevRatings, rating];
      }
    });
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange(null);
    setSelectedRatings([]);
    setSortBy("featured");

    // Remove query params but keep the path
    setLocation("/products");
  };
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>All Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6">
        {searchQuery
          ? `Search Results for "${searchQuery}"`
          : selectedCategory
          ? `${selectedCategory}`
          : "All Products"}
      </h1>

      <div className="flex flex-col lg:flex-row">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4 pr-0 lg:pr-8 mb-6 lg:mb-0">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-medium text-lg mb-4">Filters</h2>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {["Electronics", "Fashion", "Home & Decor", "Accessories"].map(
                  (category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategory === category}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategory(category);
                          } else {
                            setSelectedCategory(null);
                          }
                        }}
                        className="mr-2"
                      />
                      <Label htmlFor={`category-${category}`}>{category}</Label>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <RadioGroup
                value={priceRange || ""}
                onValueChange={setPriceRange}
              >
                <div className="space-y-2">
                  <div className="flex items-center">
                    <RadioGroupItem value="under50" id="under50" />
                    <Label htmlFor="under50" className="ml-2">
                      Under $50
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="50to100" id="50to100" />
                    <Label htmlFor="50to100" className="ml-2">
                      $50 - $100
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="100to200" id="100to200" />
                    <Label htmlFor="100to200" className="ml-2">
                      $100 - $200
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="over200" id="over200" />
                    <Label htmlFor="over200" className="ml-2">
                      Over $200
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onCheckedChange={() => toggleRatingFilter(rating)}
                      className="mr-2"
                    />
                    <div className="flex items-center">
                      <StarRating rating={rating} />
                      <span className="ml-1">& up</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              variant="link"
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 font-medium px-0"
            >
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Sorting and View Options */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center mb-4 sm:mb-0">
              <span className="text-gray-600 mr-2">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-lg shadow-sm p-2">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">View:</span>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="mr-1"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products */}
          {false ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : false ? (
            <div className="text-center py-12">
              <p className="text-red-500">
                Failed to load products. Please try again later.
              </p>
            </div>
          ) : sortedProducts?.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">
                No products found matching your criteria.
              </p>
              <Button
                variant="link"
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 mt-4"
              >
                Clear filters and try again
              </Button>
            </div>
          ) : (
            <div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              } gap-6`}
            >
              {sortedProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  rating={product.rating || "0"}
                  reviewCount={product.reviewCount || 0}
                  isNew={product.isNew ?? undefined}
                  onSale={product.onSale ?? undefined}
                  originalPrice={product.originalPrice ?? undefined}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {sortedProducts && sortedProducts.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <Button variant="outline" size="icon" className="rounded-l-md">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="bg-blue-50 text-blue-600 border-blue-500"
                >
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline" disabled>
                  ...
                </Button>
                <Button variant="outline">8</Button>
                <Button variant="outline">9</Button>
                <Button variant="outline" size="icon" className="rounded-r-md">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
