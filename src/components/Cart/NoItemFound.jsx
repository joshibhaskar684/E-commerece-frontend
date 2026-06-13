"use client";

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function NoItemFound() {
  // Initialize AOS animations on component mount
  useEffect(() => {
    AOS.init({
      once: true, // Ensures animations only run once
      easing: 'ease-out-cubic', // Smooth easing function
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div 
        data-aos="fade-up" 
        data-aos-duration="800"
        className="flex flex-col items-center text-center max-w-md"
      >
        {/* Animated SVG Container */}
        <div 
          data-aos="zoom-in" 
          data-aos-duration="600" 
          data-aos-delay="150"
          className="relative mb-8 flex justify-center items-center"
        >
          {/* Soft background glow/circle behind the icon for depth */}
          <div className="absolute inset-0 bg-gray-100 rounded-full blur-2xl transform scale-150"></div>
          
          {/* Clean Shopping Bag SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="relative w-32 h-32 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>

        {/* Text Content */}
        <h2 
          data-aos="fade-up" 
          data-aos-delay="300"
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight"
        >
          Your cart is empty
        </h2>
        <p 
          data-aos="fade-up" 
          data-aos-delay="400"
          className="text-base text-gray-500 mb-8 leading-relaxed"
        >
          Looks like you haven't added anything to your cart yet. Discover our latest collections and find something you'll love.
        </p>

        {/* Interactive CTA Button */}
        <button
          data-aos="fade-up"
          data-aos-delay="500"
          className="px-8 py-3 bg-black text-white font-medium rounded-full shadow-md transition-all duration-300 hover:bg-gray-800 hover:-translate-y-1 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          onClick={() => {
            // Replace with your router navigation (e.g., router.push('/shop'))
            window.location.href = '/shop';
          }}
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
}