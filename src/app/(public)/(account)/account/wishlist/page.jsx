"use client";

import React from 'react';
import Link from "next/link";
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Ticket, 
  HelpCircle,
  Trash2,
  Star,
  ShieldCheck
} from "lucide-react";

// Dummy data for wishlist items
const wishlistItems = [
  {
    id: 1,
    title: "APPLE iPhone 14 (Blue, 128 GB)",
    image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=iPhone",
    rating: "4.6",
    reviews: "2,34,561",
    price: "₹57,999",
    originalPrice: "₹69,900",
    discount: "17% Off",
    assured: true,
  },
  {
    id: 2,
    title: "SAMSUNG Galaxy F14 5G (B.A.E. Purple, 128 GB)",
    image: "https://via.placeholder.com/150/800080/FFFFFF?text=Samsung",
    rating: "4.2",
    reviews: "78,120",
    price: "₹12,490",
    originalPrice: "₹17,490",
    discount: "28% Off",
    assured: true,
  },
  {
    id: 3,
    title: "SONY WH-1000XM5 Bluetooth Headset",
    image: "https://via.placeholder.com/150/000000/FFFFFF?text=Sony+Headphones",
    rating: "4.8",
    reviews: "12,984",
    price: "₹29,990",
    originalPrice: "₹34,990",
    discount: "14% Off",
    assured: false,
  }
];

export default function WishlistPage() {
  const menuItems = [
    { name: "My Orders", href: "/account/orders", icon: Package },
    { name: "Wishlist", href: "/account/wishlist", icon: Heart },
    { name: "Saved Addresses", href: "/account/addresses", icon: MapPin },
    { name: "Payment Methods", href: "/account/payment-methods", icon: CreditCard },
    { name: "Coupons", href: "/account/coupons", icon: Ticket },
    { name: "Help Center", href: "/account/help-center", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* PAGE HEADER */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full">
              <Heart className="h-8 w-8 text-rose-500" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                My Wishlist
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium mt-1">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR NAVIGATION */}
          <div className="lg:col-span-1 space-y-1">
            <h2 className="px-4 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 uppercase mb-3">
              Account
            </h2>
            <nav className="flex flex-col space-y-1">
              {menuItems.map((item, i) => {
                const Icon = item.icon;
                const isActive = item.name === "Wishlist";
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50' 
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-3 space-y-6">
            
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="group flex flex-col sm:flex-row gap-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all relative"
              >
                {/* Delete Button */}
                <button 
                  className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                {/* Product Image */}
                <div className="w-full sm:w-40 h-40 shrink-0 bg-zinc-50 dark:bg-zinc-800 rounded-lg flex justify-center items-center overflow-hidden border border-zinc-100 dark:border-zinc-800/50">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal" 
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col pt-1 pr-8">
                  <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer line-clamp-2 leading-tight">
                    {item.title}
                  </h2>
                  
                  {/* Ratings */}
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className="inline-flex items-center gap-1 bg-green-600/10 text-green-700 dark:text-green-400 px-2 py-0.5 rounded text-xs font-bold border border-green-600/20">
                      {item.rating}
                      <Star className="w-3 h-3 fill-current" />
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                      {item.reviews} reviews
                    </span>
                    {item.assured && (
                      <span className="inline-flex items-center gap-1 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 px-2 py-0.5 rounded text-xs font-bold">
                        <ShieldCheck className="w-3 h-3" />
                        Assured
                      </span>
                    )}
                  </div>

                  <div className="flex-1"></div>

                  {/* Pricing */}
                  <div className="mt-6 flex flex-wrap items-baseline gap-3">
                    <span className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                      {item.price}
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 line-through font-medium">
                      {item.originalPrice}
                    </span>
                    <span className="text-sm text-green-600 dark:text-green-400 font-bold tracking-tight">
                      {item.discount}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {wishlistItems.length === 0 && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-12 text-center shadow-sm">
                <Heart className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Your wishlist is empty</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2">Save items you want to buy later.</p>
                <Link href="/products" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 shadow h-10 px-6 py-2 mt-6">
                  Continue Shopping
                </Link>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}