"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Link from "next/link";
import { GetUser } from "@/redux-store/user/action";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    const token = Cookies.get("usertoken");
    if (token) {
      dispatch(GetUser({ token }));
    }
  }, [dispatch]);

  const menuItems = [
    { name: "My Orders", href: "/account/orders" },
    { name: "Wishlist", href: "/account/wishlist" },
    { name: "Saved Addresses", href: "/account/addresses" },
    { name: "Payment Methods", href: "/account/payment-methods" },
    { name: "Coupons", href: "/account/coupons" },
    { name: "Help Center", href: "/account/help-center" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground px-3 sm:px-4 md:px-10 py-4 md:py-6">

      {/* HEADER */}
      <div className="bg-blue-600 text-white rounded-xl p-4 sm:p-6 shadow-md flex flex-col gap-4 md:flex-row md:justify-between md:items-center">

        <div className="w-full md:w-auto">
          <h1 className="text-xl sm:text-2xl font-bold break-words">
            {user?.name || "User Profile"}
          </h1>
          <p className="text-sm opacity-90 break-words">{user?.email}</p>
          <p className="text-sm break-words">{user?.mobileno}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
          <button className="w-full sm:w-auto bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300">
            Change Password
          </button>

          <button
            onClick={() => {
              Cookies.remove("userToken");
              window.location.href = "/login";
            }}
            className="w-full sm:w-auto bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mt-6">

        {/* LEFT MENU */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4">
          <h2 className="font-semibold mb-3 text-blue-600">
            Account Settings
          </h2>

          <ul className="space-y-2">
            {menuItems.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className="block p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer text-sm sm:text-base"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-3 space-y-4">

          {/* PROFILE CARD */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-blue-600 mb-3">
              Profile Details
            </h2>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-2 text-sm sm:text-base">
                <p><span className="font-medium">Name:</span> {user?.name}</p>
                <p><span className="font-medium">Email:</span> {user?.email}</p>
                <p><span className="font-medium">Mobile:</span> {user?.mobileno}</p>
                <p><span className="font-medium">Role:</span> {user?.role}</p>
              </div>
            )}
          </div>

          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">

            {[
              { name: "My Orders", href: "/account/orders" },
              { name: "Wishlist", href: "/account/wishlist" },
              { name: "Saved Addresses", href: "/account/addresses" },
              { name: "Payments", href: "/account/payment-methods" },
              { name: "Coupons", href: "/account/coupons" },
              { name: "Support", href: "/account/help-center" },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="bg-blue-50 dark:bg-gray-800 p-3 sm:p-4 rounded-xl text-center hover:shadow cursor-pointer text-sm sm:text-base"
              >
                {item.name}
              </Link>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
}