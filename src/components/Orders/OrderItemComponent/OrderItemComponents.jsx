'use client';

import Link from "next/link";
import { Package, Truck, CheckCircle2, ChevronRight } from "lucide-react";

export default function OrderItemComponent({ product, orderId, status = "DELIVERED" }) {
  const isDelivered = status === "DELIVERED";
  const isCancelled = status === "CANCELLED";

  return (
    <Link
      href={`/account/orders/${orderId || product?.orderId || product?.id || 1}`}
      className="group block border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-zinc-900 p-4 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left: Product Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="w-20 h-20 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src={product?.imageSrc || product?.image || product?.productImage || "/placeholder-image.jpg"}
              alt={product?.name || product?.productName || "Product"}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
            />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {product?.seller || product?.brand || "Quick Verified"}
            </span>

            <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {product?.name || product?.productName}
            </h4>

            <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
              <span className="font-extrabold text-gray-900 dark:text-white">
                {typeof product?.price === 'number' ? `₹${product.price.toLocaleString('en-IN')}` : product?.price}
              </span>
              <span>•</span>
              <span>Qty: {product?.quantity || 1}</span>
            </div>
          </div>
        </div>

        {/* Right: Status badge & Chevron */}
        <div className="flex items-center gap-4 self-end sm:self-center">
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end">
              <span className={`w-2 h-2 rounded-full ${
                isDelivered ? 'bg-emerald-500' : isCancelled ? 'bg-red-500' : 'bg-blue-500'
              }`} />
              <span className={`text-xs font-bold ${
                isDelivered ? 'text-emerald-700 dark:text-emerald-400' : isCancelled ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
              }`}>
                {isDelivered ? 'Delivered' : isCancelled ? 'Cancelled' : 'In Transit'}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
              {isDelivered ? 'Item has been delivered' : isCancelled ? 'Order was cancelled' : 'Delivery expected soon'}
            </p>
          </div>

          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
        </div>

      </div>
    </Link>
  );
}
