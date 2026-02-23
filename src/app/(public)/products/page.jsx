"use client";
import Sidebar from "@/components/Products/Sidebar/Sidebar"


import { getProducts } from "@/redux-store/products/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductCard from "@/components/Products/ProductCard/ProductCard";
import { useRouter } from 'next/navigation';

export default function page() {

  const dispatch = useDispatch();
  const store = useSelector((state) => state.ProductReducer);
  const products = store?.data || [];
  const router = useRouter();
  useEffect(() => {
    dispatch(getProducts());
    console.log(store);

  }, []);





  if (products?.length == 0) {
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
