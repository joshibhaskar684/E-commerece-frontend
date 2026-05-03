"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function page() {
  const [rating, setRating] = useState(0);

  const order = {
    id: "ORD-102938",
    status: "Delivered",
    deliveredDate: "28 Apr 2026",
    paymentMode: "UPI",
    total: 1299,
    discount: 200,
    product: {
      name: "Nike Air Max 270",
      image:
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
      seller: "Nike Official Store",
      price: 1499,
      size: "UK 9",
      color: "Black",
    },
    address: {
      name: "Rahul Sharma",
      phone: "9999999999",
      full: "Near City Mall, Agwar, Uttar Pradesh, India",
    },
  };

  return (
    <div className="bg-background text-foreground min-h-screen pb-20 md:pb-10">

      {/* HEADER (Mobile-first stacked) */}
      <div className="bg-blue-600 text-white px-4 py-4 md:rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-base md:text-lg font-bold">
            Order ID: {order.id}
          </h1>
          <p className="text-xs md:text-sm opacity-90">
            Delivered on {order.deliveredDate}
          </p>
        </div>

        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs md:text-sm w-fit">
          {order.status}
        </span>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-6xl mx-auto px-3 md:px-6 mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* PRODUCT SECTION */}
        <div className="lg:col-span-2 bg-foreground/5 rounded-xl p-3 md:p-5 shadow-sm">

          {/* PRODUCT CARD */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

            <img
              src={order.product.image}
              className="w-full sm:w-28 md:w-32 h-40 sm:h-28 md:h-32 object-cover rounded-lg"
            />

            <div className="flex flex-col gap-1 flex-1">
              <h2 className="font-semibold text-sm md:text-lg line-clamp-2">
                {order.product.name}
              </h2>

              <p className="text-xs md:text-sm text-gray-500">
                Seller: {order.product.seller}
              </p>

              <p className="text-xs md:text-sm">
                Size: {order.product.size} | Color: {order.product.color}
              </p>

              <p className="text-blue-600 font-bold text-sm md:text-base">
                ₹{order.product.price}
              </p>
            </div>
          </div>

          {/* RATE SECTION */}
          <div className="mt-5 border-t pt-4">

            <h3 className="font-semibold text-sm md:text-base mb-2">
              Rate this product
            </h3>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-6 h-6 md:w-7 md:h-7 cursor-pointer transition ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  }`}
                />
              ))}
            </div>

            <button className="mt-3 w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-sm md:text-base">
              Submit Rating
            </button>
          </div>
        </div>

        {/* SUMMARY CARD */}
        <div className="bg-foreground/5 rounded-xl p-3 md:p-5 shadow-sm">

          <h2 className="font-semibold mb-3 text-sm md:text-base">
            Price Details
          </h2>

          <div className="space-y-2 text-xs md:text-sm">
            <div className="flex justify-between">
              <span>Product Price</span>
              <span>₹{order.product.price}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{order.discount}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>Free</span>
            </div>

            <hr className="opacity-30" />

            <div className="flex justify-between font-bold text-sm md:text-base">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="mt-5">
            <h3 className="font-semibold text-sm md:text-base">
              Delivery Address
            </h3>
            <p className="text-xs md:text-sm mt-1">
              {order.address.name}
            </p>
            <p className="text-xs md:text-sm">
              {order.address.phone}
            </p>
            <p className="text-xs text-gray-500">
              {order.address.full}
            </p>
          </div>

          {/* PAYMENT */}
          <div className="mt-5">
            <h3 className="font-semibold text-sm md:text-base">
              Payment Mode
            </h3>
            <p className="text-xs md:text-sm text-blue-600">
              {order.paymentMode}
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE FIXED ACTION BAR */}
      <div className="fixed bottom-0 left-0 w-full md:hidden bg-background border-t p-2 flex gap-2">
        <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg text-sm">
          Buy Again
        </button>
        <button className="flex-1 bg-yellow-400 text-black py-3 rounded-lg text-sm">
          Need Help
        </button>
      </div>
    </div>
  );
}