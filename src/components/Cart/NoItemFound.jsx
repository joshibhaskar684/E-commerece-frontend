import React from 'react';
import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function NoItemFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 bg-background">
      <div className="w-24 h-24 sm:w-32 sm:h-32 mb-6 bg-gray-50 dark:bg-gray-800/30 rounded-full flex items-center justify-center ring-8 ring-gray-50/50 dark:ring-gray-800/10">
        <ShoppingBagIcon className="w-12 h-12 sm:w-14 sm:h-14 text-gray-300 dark:text-gray-600" strokeWidth={1.5} />
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-foreground">
        Your cart is empty
      </h2>
      
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
        Looks like you haven't added anything to your cart yet. Discover our latest products and fill it up!
      </p>
      
      <Link 
        href="/products" 
        className="inline-flex items-center justify-center rounded-md bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        Start Shopping
      </Link>
    </div>
  );
}