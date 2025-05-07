"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Image from "next/image";

interface ProductCardProps {
  id: number | string;
  name: string;
  description: string;
  price: string | number;
  imageUrl: string;
  rating: string | null;
  reviewCount: number;
  isNew?: boolean;
  onSale?: boolean;
  originalPrice?: string | null;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
  reviewCount,
  isNew = false,
  onSale = false,
  originalPrice = null,
}: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden group">
      <div className="relative aspect-square bg-gray-100">
        <Link href={`/products/${id}`}>
          <Image
            src={imageUrl || "/fallback.jpg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={450}
            height={500}
          />
        </Link>
        <div className="absolute top-2 right-2">
          <Button
            onClick={toggleFavorite}
            variant="ghost"
            size="icon"
            className="bg-white rounded-full shadow-md hover:text-pink-500 transition-colors"
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorited ? "fill-pink-500 text-pink-500" : ""
              }`}
            />
          </Button>
        </div>
        {isNew && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-emerald-500 hover:bg-emerald-600">New</Badge>
          </div>
        )}
        {onSale && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <Link href={`/product/${id}`}>
          <h3 className="font-medium text-gray-900 mb-1 hover:text-blue-600">
            {name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">
          {description.split(".")[0]}
        </p>
        <div className="flex items-center mb-2">
          <span className="text-gray-500 text-sm ml-1">({reviewCount})</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold text-lg">${price}</span>
            {onSale && originalPrice && (
              <span className="text-gray-500 text-sm line-through ml-2">
                ${originalPrice}
              </span>
            )}
          </div>
          <Button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white py-1 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
