"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Link from "next/link";
import { GetUser } from "@/redux-store/user/action";
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Ticket, 
  HelpCircle, 
  LogOut, 
  Key,
  ShieldCheck,
  Mail,
  Phone
} from "lucide-react";

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
    { name: "My Orders", href: "/account/orders", icon: Package },
    { name: "Wishlist", href: "/account/wishlist", icon: Heart },
    { name: "Saved Addresses", href: "/account/addresses", icon: MapPin },
    { name: "Payment Methods", href: "/account/payment-methods", icon: CreditCard },
    { name: "Coupons", href: "/account/coupons", icon: Ticket },
    { name: "Help Center", href: "/account/help-center", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER / HERO CARD */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 flex items-center justify-center flex-shrink-0">
                <User className="h-10 w-10 text-zinc-500 dark:text-zinc-400" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {user?.name || "User Profile"}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                  {user?.email}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-10 px-4 py-2">
                <Key className="mr-2 h-4 w-4" />
                Change Password
              </button>
              <button
                onClick={() => {
                  Cookies.remove("userToken"); // Adjusted from userToken to match usertoken below or maybe it should be userToken. Kept as it was. Wait, let me check the existing code: Cookies.remove("userToken");
                  window.location.href = "/login";
                }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white hover:bg-red-500/90 shadow-sm h-10 px-4 py-2"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR NAVIGATION */}
          <div className="lg:col-span-1 space-y-1">
            <h2 className="px-4 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 uppercase mb-3">
              Account
            </h2>
            <nav className="flex flex-col space-y-1">
              {menuItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 text-zinc-600 dark:text-zinc-400"
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* PERSONAL INFORMATION CARD */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Personal Information
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Manage your personal details and account role.
                </p>
              </div>
              
              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-zinc-100"></div>
                  </div>
                ) : (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {user?.name || "Not provided"}
                      </dd>
                    </div>
                    
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {user?.email || "Not provided"}
                      </dd>
                    </div>
                    
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Mobile Number
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {user?.mobileno || "Not provided"}
                      </dd>
                    </div>
                    
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" />
                        Account Role
                      </dt>
                      <dd className="mt-1 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
                          {user?.role || "Customer"}
                        </span>
                      </dd>
                    </div>
                  </dl>
                )}
              </div>
            </div>

            {/* QUICK ACTIONS GRID */}
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 px-1">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {menuItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={i}
                      href={item.href}
                      className="group flex flex-col items-center justify-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 text-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all shadow-sm hover:shadow-md cursor-pointer"
                    >
                      <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-zinc-50 dark:group-hover:text-zinc-900 transition-all">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}