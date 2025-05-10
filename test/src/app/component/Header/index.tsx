"use client";

import Link from "next/link";
import { Input } from "../ui/input";
import { User, Search, ShoppingCart, ShoppingBag, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { toggleCart, getItemCount } = useCart();

  const itemCount = getItemCount();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      closeMobileMenu();
    }
  };
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 flex items-center"
          >
            <ShoppingBag className="mr-2" />
            <span>NextShop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="font-medium hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="font-medium hover:text-blue-600 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="font-medium hover:text-blue-600 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="font-medium hover:text-blue-600 transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <form onSubmit={handleSearch}>
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </form>
            </div>

            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <User className="h-5 w-5" />
            </button>

            <button
              className="text-gray-600 hover:text-blue-600 transition-colors relative"
              onClick={toggleCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </form>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden mt-4 pb-2 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <nav className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="font-medium hover:text-blue-600 transition-colors py-2 border-b border-gray-100"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={closeMobileMenu}
              className="font-medium hover:text-blue-600 transition-colors py-2 border-b border-gray-100"
            >
              Products
            </Link>
            <Link
              href="/categories"
              onClick={closeMobileMenu}
              className="font-medium hover:text-blue-600 transition-colors py-2 border-b border-gray-100"
            >
              Categories
            </Link>
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="font-medium hover:text-blue-600 transition-colors py-2"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
