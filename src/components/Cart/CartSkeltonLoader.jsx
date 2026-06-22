export function CartSkeltonLoader() {   
  return (  
    <div className="min-h-screen bg-background text-foreground py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto animate-pulse">
        
        {/* Header Section Skeleton */}
        <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          {/* Title Placeholder */}
          <div className="h-8 sm:h-10 md:h-12 w-48 sm:w-64 bg-foreground/10 rounded-lg"></div>
          {/* Item Count Placeholder */}
          <div className="h-5 sm:h-6 w-24 sm:w-32 bg-foreground/10 rounded-md"></div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Cart Items Container Skeleton */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4 sm:gap-6">
            {/* Array of 3 items to show a filled state while loading */}
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border border-foreground/10 bg-background shadow-sm"
              >
                {/* Product Image Skeleton */}
                <div className="relative w-full sm:w-32 md:w-40 aspect-square sm:aspect-auto sm:h-32 md:h-40 flex-shrink-0 rounded-xl bg-foreground/10"></div>

                {/* Product Details Skeleton */}
                <div className="flex flex-col flex-1 min-w-0 justify-between">
                  
                  <div className="flex justify-between items-start gap-4">
                    {/* Title & Price Skeleton */}
                    <div className="min-w-0 flex-1 flex flex-col gap-2">
                      <div className="h-6 sm:h-7 w-3/4 bg-foreground/10 rounded-md"></div>
                      <div className="h-5 sm:h-6 w-16 bg-foreground/10 rounded-md mt-1"></div>
                    </div>
                    
                    {/* Remove Button Skeleton */}
                    <div className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 bg-foreground/10 rounded-full"></div>
                  </div>

                  {/* Quantity & Subtotal Skeleton */}
                  <div className="flex flex-wrap justify-between items-center gap-4 mt-4 sm:mt-auto pt-4 sm:pt-0 border-t border-foreground/5 sm:border-transparent">
                    {/* Pill-shaped Quantity Toggle Skeleton */}
                    <div className="h-8 sm:h-10 w-24 sm:w-28 bg-foreground/10 rounded-full"></div>

                    {/* Item Subtotal Price Skeleton */}
                    <div className="h-6 sm:h-7 md:h-8 w-20 sm:w-24 bg-foreground/10 rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary Sidebar Skeleton */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-8">
            <div className="border border-foreground/10 rounded-3xl p-5 sm:p-6 md:p-8 bg-foreground/5 flex flex-col gap-5 sm:gap-6 shadow-sm">
              {/* Summary Title Skeleton */}
              <div className="h-7 sm:h-8 md:h-9 w-1/2 bg-foreground/10 rounded-md"></div>
              
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Rows (Subtotal, Discount, Tax) */}
                {[1, 2, 3].map((row) => (
                  <div key={row} className="flex justify-between items-center">
                    <div className="h-5 sm:h-6 w-20 bg-foreground/10 rounded-md"></div>
                    <div className="h-5 sm:h-6 w-16 bg-foreground/10 rounded-md"></div>
                  </div>
                ))}
                
                <hr className="border-foreground/10 my-1 sm:my-2" />
                
                {/* Total Price Skeleton */}
                <div className="flex flex-wrap justify-between items-end gap-2">
                  <div className="h-6 sm:h-7 md:h-8 w-24 bg-foreground/10 rounded-md"></div>
                  <div className="h-8 sm:h-9 md:h-10 w-32 bg-foreground/10 rounded-md"></div>
                </div>
              </div>

              {/* Checkout Button Skeleton */}
              <div className="w-full h-12 sm:h-14 rounded-xl bg-foreground/10 mt-2"></div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}