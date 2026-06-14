import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function FlipkartEmptyCart() {
  useEffect(() => {
    AOS.init({
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    // Outer wrapper using your theme variables
    <div className="flex items-center justify-center min-h-[75vh] bg-background text-foreground p-4 md:p-8">
      
      {/* Flipkart style uses subtle borders and boxy, clean cards on desktop */}
      <div 
        data-aos="fade-up" 
        data-aos-duration="600"
        className="w-full max-w-4xl flex flex-col items-center justify-center py-16 px-4 bg-background border border-gray-200/60 dark:border-gray-800 rounded-sm shadow-[0_1px_4px_rgba(0,0,0,0.1)]"
      >
        {/* Illustration Container */}
        <div 
          data-aos="zoom-in" 
          data-aos-delay="150"
          data-aos-duration="600"
          className="relative w-48 h-40 mb-6 flex justify-center items-center"
        >
          {/* Flipkart-style Empty Cart SVG with Yellow Accents */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 200 150" 
            className="w-full h-full"
          >
            <path 
              d="M30 40 L50 40 L70 100 L150 100 L170 50 L60 50" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-gray-300 dark:text-gray-700"
            />
            <circle 
              cx="80" 
              cy="120" 
              r="10" 
              fill="currentColor" 
              className="text-gray-400 dark:text-gray-600"
            />
            <circle 
              cx="140" 
              cy="120" 
              r="10" 
              fill="currentColor" 
              className="text-gray-400 dark:text-gray-600"
            />
            {/* Yellow Accent Elements representing missing items */}
            <circle cx="100" cy="75" r="8" className="fill-yellow-500" />
            <rect x="120" y="65" width="16" height="16" rx="2" className="fill-yellow-400" />
            <path d="M100 20 L110 40 L90 40 Z" className="fill-yellow-500" />
          </svg>
        </div>

        {/* Text Content - Mimicking Flipkart's exact phrasing and typography */}
        <h2 
          data-aos="fade-up" 
          data-aos-delay="250"
          className="text-xl md:text-2xl font-semibold mb-2"
        >
          Missing Cart items?
        </h2>
        
        <p 
          data-aos="fade-up" 
          data-aos-delay="350"
          className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-8 text-center max-w-sm"
        >
          Login to see the items you added previously or start shopping now.
        </p>

        {/* Flipkart style buttons are typically wider rectangles with slight rounding */}
        <button
          data-aos="fade-up"
          data-aos-delay="450"
          className="px-16 py-3.5 bg-yellow-500 text-yellow-950 font-medium text-sm md:text-base rounded-sm shadow-sm transition-all duration-300 hover:bg-yellow-400 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          onClick={() => {
            window.location.href = '/shop';
          }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}