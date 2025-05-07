"use client";

import { ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../component/ui/breadcrumb";
import { Button } from "../component/ui/button";
import { Checkbox } from "../component/ui/checkbox";
import { Label } from "../component/ui/label";
import { RadioGroup, RadioGroupItem } from "../component/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../component/ui/select";
import ProductCard from "../component/ProductCard";

const sortedProducts = [
  {
    id: "1",
    name: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description:
      "Premium wireless headphones with high-quality sound, noise cancellation, and long battery life",
    price: 111,
    reviewCount: 20,
    onSale: true,
    originalPrice: "1",
    thumbnails: [],
    isNew: true,
    rating: "",
  },
  {
    id: "2",
    name: "Fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description:
      "Premium wireless headphones with high-quality sound, noise cancellation, and long battery life",
    price: 11,
    reviewCount: 10,
    onSale: true,
    originalPrice: "2",
    thumbnails: [],
    isNew: true,
    rating: "",
  },
  {
    id: "3",
    name: "Home & Decor",
    imageUrl:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description:
      "Premium wireless headphones with high-quality sound, noise cancellation, and long battery life",
    price: 99,
    reviewCount: 1,
    onSale: true,
    originalPrice: "3",
    thumbnails: [],
    isNew: true,
    rating: "",
  },
  {
    id: "4",
    name: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description:
      "Premium wireless headphones with high-quality sound, noise cancellation, and long battery life",
    price: 200,
    reviewCount: 99,
    onSale: true,
    originalPrice: "4",
    thumbnails: [],
    isNew: true,
    rating: "",
  },
];

export default function Products() {
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

      <h1 className="text-3xl font-bold mb-6">All Products</h1>

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
                      <Checkbox id={`category-${category}`} className="mr-2" />
                      <Label htmlFor={`category-${category}`}>{category}</Label>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <RadioGroup value={""}>
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
                    <Checkbox id={`rating-${rating}`} className="mr-2" />
                    <div className="flex items-center">
                      <span className="ml-1">& up</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              variant="link"
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
              <Select value={"newest"}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
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
              <Button size="icon" className="mr-1">
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button size="icon">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products */}
          <div className="grid grid-cols-3 gap-4">
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
          {/* Pagination */}

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
        </div>
      </div>
    </div>
  );
}
