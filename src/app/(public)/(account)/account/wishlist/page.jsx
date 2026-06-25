import React from 'react';

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
  return (
    <div className="bg-gray-100 min-h-screen p-2 sm:p-4 md:py-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
        
        {/* Left Sidebar (Typical E-commerce Account Layout) */}
        <div className="hidden md:flex flex-col w-[280px] gap-4 shrink-0">
          {/* User Profile Summary */}
          <div className="bg-white p-4 shadow-sm rounded-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Hello,</p>
              <p className="font-semibold text-gray-800">Flipkart Customer</p>
            </div>
          </div>

          {/* Account Menu */}
          <div className="bg-white shadow-sm rounded-sm flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <span className="text-gray-500 font-medium uppercase text-sm flex items-center gap-3">
                {/* Order Icon */}
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                My Orders
              </span>
            </div>
            <div className="p-4 border-b border-gray-100">
              <span className="text-gray-500 font-medium uppercase text-sm flex items-center gap-3">
                {/* Account Icon */}
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Account Settings
              </span>
            </div>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-500 font-medium text-sm flex items-center gap-3">
               {/* Heart Icon */}
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
               My Wishlist
            </div>
          </div>
        </div>

        {/* Main Content - Wishlist Items */}
        <div className="flex-1 bg-white shadow-sm rounded-sm">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-lg font-semibold">My Wishlist ({wishlistItems.length})</h1>
          </div>

          {/* Item List */}
          <div className="flex flex-col">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group flex p-4 sm:p-6 border-b border-gray-200 hover:shadow-[0_3px_16px_0_rgba(0,0,0,0.11)] transition-shadow duration-200 relative">
                
                {/* Delete Button (Trash Icon) */}
                <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>

                {/* Product Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 flex justify-center items-start">
                  <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                </div>

                {/* Product Details */}
                <div className="ml-4 sm:ml-8 flex-1 pr-8">
                  <h2 className="text-sm sm:text-base hover:text-blue-600 cursor-pointer line-clamp-2">{item.title}</h2>
                  
                  {/* Ratings */}
                  <div className="flex items-center gap-2 mt-1 sm:mt-2">
                    <span className="bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                      {item.rating}
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    </span>
                    <span className="text-gray-500 text-sm">({item.reviews})</span>
                    {item.assured && (
                      <span className="ml-2 hidden sm:inline-block">
                        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" className="h-5" />
                      </span>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="mt-3 flex items-baseline gap-2 sm:gap-3">
                    <span className="text-lg sm:text-2xl font-medium">{item.price}</span>
                    <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                    <span className="text-sm text-green-600 font-medium">{item.discount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}