
"use client"
export default function ProductNotFoundCard() {
    return(
        

<>

 <div className="min-h-[70vh] flex items-center justify-center bg-background px-6">
       <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-sm p-10 max-w-lg w-full text-center transition-all duration-300">
        
         {/* Modern Illustration Area */}
         <div className="flex justify-center mb-8 relative">
           <div className="bg-zinc-50 dark:bg-zinc-800 p-8 rounded-full relative ">
             <SearchOff className="text-zinc-300 dark:text-zinc-600 w-20 h-20" />
           </div>
           {/* Subtle Decorative Yellow Ring */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-dashed border-yellow-400 rounded-full animate-[spin_10s_linear_infinite]" />
         </div>

         {/* Text Content */}
         <div className="space-y-3">
           <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
             Sorry, no results found!
           </h2>
           <p className="text-muted-foreground text-sm md:text-base max-w-xs mx-auto leading-relaxed">
             Please check the spelling or try searching for something else. We couldn't find what you’re looking for.
           </p>
         </div>

         {/* Action Buttons */}
         <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
           <button 
             onClick={() => router.push("/")}
             className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase text-xs tracking-wider px-8 py-3.5 rounded-sm transition-all shadow-md active:scale-95"
           >
             Continue Shopping
           </button>
          
           <button 
             onClick={() => window.location.reload()}
             className="border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-foreground font-bold uppercase text-xs tracking-wider px-8 py-3.5 rounded-sm transition-all"
           >
             Clear Filters
           </button>
         </div>

         {/* Helpful Hint */}
         <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800">
           <p className="text-[11px] text-zinc-400 uppercase font-semibold tracking-widest">
             Need help? Contact our 24/7 Support
           </p>
         </div>
       </div>
     </div>

</>
    )
}