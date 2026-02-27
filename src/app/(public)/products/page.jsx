"use client";
import Sidebar from "@/components/Products/Sidebar/Sidebar"
import { ProductionQuantityLimits, SearchOff } from "@mui/icons-material";

import { getProducts } from "@/redux-store/products/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductCard from "@/components/Products/ProductCard/ProductCard";
import { useRouter } from 'next/navigation';
import { FaShoppingBag } from "react-icons/fa";

export default function page() {

  const dispatch = useDispatch();
  const store = useSelector((state) => state.ProductReducer);
  const products = store?.data || [];
  const router = useRouter();
  const [fetch,setFetch]=useState(false);
  
  const fetchProduct=async()=>{
       try{
    setFetch(true);
    await dispatch(getProducts());
    console.log(store);
  }
  catch(e){
    console.log(e);
  }
    finally{
      setFetch(false);
    }
  } 



  useEffect(() => {
   
fetchProduct();
  }, []);



 if (!fetch) {
  return (
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
  );
}
  if (products?.length == 0&&fetch) {
    return (
      <div className="bg-background">
        <div className="sticky top-32 z-1 bg-background">
          <Sidebar />
        </div>

        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-2 divide-foreground/10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">

            {/* Skeleton Card 1 */}
            <div className="border border-foreground/10 p-2 bg-background animate-pulse">
              <div className="aspect-square w-full rounded-lg bg-gray-300 xl:aspect-7/8" />
              <div className="mt-4 h-4 w-24 bg-gray-300 rounded" />
              <div className="mt-2 h-3 w-32 bg-gray-200 rounded" />
              <div className="mt-3 min-h-[48px] space-y-2">
                <div className="h-4 w-28 bg-gray-300 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Skeleton Card 2 */}
            <div className="border border-foreground/10 p-2 bg-background animate-pulse">
              <div className="aspect-square w-full rounded-lg bg-gray-300 xl:aspect-7/8" />
              <div className="mt-4 h-4 w-24 bg-gray-300 rounded" />
              <div className="mt-2 h-3 w-32 bg-gray-200 rounded" />
              <div className="mt-3 min-h-[48px] space-y-2">
                <div className="h-4 w-28 bg-gray-300 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Skeleton Card 3 */}
            <div className="border border-foreground/10 p-2 bg-background animate-pulse">
              <div className="aspect-square w-full rounded-lg bg-gray-300 xl:aspect-7/8" />
              <div className="mt-4 h-4 w-24 bg-gray-300 rounded" />
              <div className="mt-2 h-3 w-32 bg-gray-200 rounded" />
              <div className="mt-3 min-h-[48px] space-y-2">
                <div className="h-4 w-28 bg-gray-300 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Skeleton Card 4 */}
            <div className="border border-foreground/10 p-2 bg-background animate-pulse">
              <div className="aspect-square w-full rounded-lg bg-gray-300 xl:aspect-7/8" />
              <div className="mt-4 h-4 w-24 bg-gray-300 rounded" />
              <div className="mt-2 h-3 w-32 bg-gray-200 rounded" />
              <div className="mt-3 min-h-[48px] space-y-2">
                <div className="h-4 w-28 bg-gray-300 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Skeleton Card 5 */}
            <div className="border border-foreground/10 p-2 bg-background animate-pulse">
              <div className="aspect-square w-full rounded-lg bg-gray-300 xl:aspect-7/8" />
              <div className="mt-4 h-4 w-24 bg-gray-300 rounded" />
              <div className="mt-2 h-3 w-32 bg-gray-200 rounded" />
              <div className="mt-3 min-h-[48px] space-y-2">
                <div className="h-4 w-28 bg-gray-300 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background ">
      <div className="sticky top-32 z-1 bg-background">
        <Sidebar />
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-2  divide-foreground/10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 ">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} router={router} />

          ))}
        </div>

      </div>
    </div>
  )
}
