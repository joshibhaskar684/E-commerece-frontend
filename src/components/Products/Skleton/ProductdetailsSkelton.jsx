import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="bg-gray-100 min-h-screen pb-10 font-sans animate-pulse">
      <div className="max-w-7xl mx-auto pt-4 px-2 sm:px-4">
        
        {/* Main Product Card Skeleton */}
        <div className="bg-white rounded-sm shadow-sm flex flex-col md:flex-row">
          
          {/* LEFT COLUMN: Image & CTAs */}
          <div className="w-full md:w-[40%] lg:w-[45%] p-4 flex flex-col border-r border-gray-100">
            
            {/* Main Image Placeholder */}
            <div className="w-full h-[350px] sm:h-[450px] bg-gray-200 rounded-sm mb-4"></div>
            
            {/* Thumbnails Placeholder */}
            <div className="flex gap-2 mb-4 justify-center">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-sm border border-gray-100"></div>
              ))}
            </div>

            {/* Action Buttons Placeholder */}
            <div className="flex gap-2 w-full mt-auto">
              <div className="flex-1 h-14 bg-gray-200 rounded-sm"></div>
              <div className="flex-1 h-14 bg-gray-200 rounded-sm"></div>
            </div>

          </div>

          {/* RIGHT COLUMN: Product Details */}
          <div className="w-full md:w-[60%] lg:w-[55%] p-4 sm:p-6 lg:p-8">
            
            {/* Breadcrumbs */}
            <div className="h-3 w-48 bg-gray-200 rounded-full mb-4"></div>

            {/* Title */}
            <div className="h-6 w-full bg-gray-200 rounded-sm mb-2"></div>
            <div className="h-6 w-2/3 bg-gray-200 rounded-sm mb-4"></div>

            {/* Ratings Summary */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-5 w-14 bg-gray-200 rounded-sm"></div>
              <div className="h-4 w-32 bg-gray-200 rounded-sm"></div>
              <div className="h-5 w-20 bg-gray-200 rounded-full ml-2"></div>
            </div>

            {/* Price Section */}
            <div className="flex items-end gap-3 mb-6">
              <div className="h-10 w-32 bg-gray-200 rounded-sm"></div>
              <div className="h-6 w-20 bg-gray-200 rounded-sm mb-1"></div>
              <div className="h-5 w-16 bg-gray-200 rounded-sm mb-1"></div>
            </div>

            {/* Offers Section */}
            <div className="mt-6">
              <div className="h-4 w-32 bg-gray-200 rounded-sm mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded-sm"></div>
                <div className="h-4 w-[90%] bg-gray-200 rounded-sm"></div>
                <div className="h-4 w-[85%] bg-gray-200 rounded-sm"></div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-6 border-gray-100" />

            {/* Highlights & Services Grid */}
            <div className="grid grid-cols-12 gap-4">
              
              {/* Services */}
              <div className="col-span-4 h-4 w-16 bg-gray-200 rounded-sm"></div>
              <div className="col-span-8 space-y-3">
                <div className="h-4 w-48 bg-gray-200 rounded-sm"></div>
                <div className="h-4 w-56 bg-gray-200 rounded-sm"></div>
                <div className="h-4 w-40 bg-gray-200 rounded-sm"></div>
              </div>

              {/* Delivery */}
              <div className="col-span-4 h-4 w-16 bg-gray-200 rounded-sm mt-4"></div>
              <div className="col-span-8 mt-4">
                <div className="h-4 w-48 bg-gray-200 rounded-sm"></div>
              </div>
              
              {/* Seller */}
              <div className="col-span-4 h-4 w-16 bg-gray-200 rounded-sm mt-4"></div>
              <div className="col-span-8 mt-4">
                <div className="h-4 w-32 bg-gray-200 rounded-sm"></div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-6 border-gray-100" />

            {/* Specifications Table Simulation */}
            <div>
              <div className="h-6 w-40 bg-gray-200 rounded-sm mb-4"></div>
              <div className="border border-gray-100 rounded-sm">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                  <div className="h-4 w-32 bg-gray-200 rounded-sm"></div>
                </div>
                <div className="divide-y divide-gray-100">
                  {[1, 2, 3, 4].map((row) => (
                    <div key={row} className="grid grid-cols-12 px-4 py-3">
                      <div className="col-span-4">
                        <div className="h-4 w-24 bg-gray-200 rounded-sm"></div>
                      </div>
                      <div className="col-span-8">
                        <div className="h-4 w-full sm:w-3/4 bg-gray-200 rounded-sm"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Similar Products Row Skeleton */}
        <div className="mt-6 bg-white p-4 shadow-sm rounded-sm">
          <div className="h-6 w-48 bg-gray-200 rounded-sm mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((card) => (
              <div key={card} className="space-y-3">
                <div className="w-full h-40 bg-gray-200 rounded-sm"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded-sm"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded-sm"></div>
                <div className="h-5 w-1/3 bg-gray-200 rounded-sm"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}