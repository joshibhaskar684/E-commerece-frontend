"use client";

import React, { Suspense } from "react";
import ReviewsComponent from "@/components/Reviews/ReviewsComponent";

export default function ReviewsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-zinc-500">Loading Customer Reviews...</p>
          </div>
        </div>
      }
    >
      <ReviewsComponent />
    </Suspense>
  );
}