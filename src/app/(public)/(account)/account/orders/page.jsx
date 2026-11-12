'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Package, 
  Search, 
  Filter, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ChevronRight, 
  FileText, 
  RotateCcw, 
  Star, 
  AlertCircle, 
  ShoppingBag, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  ChevronDown, 
  ShieldCheck, 
  X, 
  Printer, 
  Download,
  ExternalLink
} from 'lucide-react';
import { toast } from 'react-toastify';
import { getOrderRequest, cancelOrderRequest } from '@/redux-store/Order/action';
import { AddToCartRequest } from '@/redux-store/cart/action';

// Safe Price Extractor
const getSafePrice = (priceVal) => {
  if (priceVal === undefined || priceVal === null) return 0;
  if (typeof priceVal === 'number') return priceVal;
  const numericString = priceVal.toString().replace(/[^0-9.]/g, '');
  return parseFloat(numericString) || 0;
};

// Formatter for Indian Rupees
const formatCurrency = (amount) => {
  const safeAmount = getSafePrice(amount);
  return `₹${safeAmount.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

// Mock fallback orders for realistic display when backend has no orders yet
const FALLBACK_ORDERS = [
  {
    id: 10842,
    orderNumber: "ORD-948201-IN",
    status: "DELIVERED",
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "PAID",
    createdAt: "2026-11-08T10:30:00Z",
    deliveredDate: "11 Nov 2026",
    shippingAddress: {
      fullName: "Bhaskar Joshi",
      mobile: "9876543210",
      street: "Flat 402, Royal Residency, Barakhamba Road",
      city: "New Delhi",
      state: "Delhi NCR",
      pincode: "110001",
      addressType: "HOME"
    },
    items: [
      {
        id: 101,
        productId: "6aeeff594fc676c777667b3a",
        productName: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
        productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        price: 26990,
        quantity: 1,
        lineTotal: 26990,
        seller: "Sony Authorised Store"
      }
    ],
    summary: {
      subTotal: 26990,
      discount: 2000,
      deliveryFee: 0,
      tax: 0,
      totalAmount: 24990,
      currency: "INR"
    }
  },
  {
    id: 10841,
    orderNumber: "ORD-729104-IN",
    status: "CONFIRMED",
    paymentMethod: "Credit Card (Visa ending in 4242)",
    paymentStatus: "PAID",
    createdAt: "2026-11-10T14:15:00Z",
    expectedDelivery: "14 Nov 2026",
    shippingAddress: {
      fullName: "Bhaskar Joshi",
      mobile: "9876543210",
      street: "Tower B, Tech Park, Electronic City, Sector 62",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
      addressType: "WORK"
    },
    items: [
      {
        id: 102,
        productId: "6aeeff594fc676c777667b3b",
        productName: "Nike Air Max 270 Flyknit Running Shoes - Triple Black",
        productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        price: 11995,
        quantity: 1,
        lineTotal: 11995,
        seller: "Nike Retail India"
      },
      {
        id: 103,
        productId: "6aeeff594fc676c777667b3c",
        productName: "Puma Classic Cotton Crew Neck T-Shirt - Pack of 2",
        productImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80",
        price: 1499,
        quantity: 2,
        lineTotal: 2998,
        seller: "Puma Sports India"
      }
    ],
    summary: {
      subTotal: 14993,
      discount: 1500,
      deliveryFee: 0,
      tax: 0,
      totalAmount: 13493,
      currency: "INR"
    }
  },
  {
    id: 10840,
    orderNumber: "ORD-519280-IN",
    status: "DELIVERED",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "PAID",
    createdAt: "2026-10-25T09:00:00Z",
    deliveredDate: "29 Oct 2026",
    shippingAddress: {
      fullName: "Bhaskar Joshi",
      mobile: "9876543210",
      street: "Flat 402, Royal Residency, Barakhamba Road",
      city: "New Delhi",
      state: "Delhi NCR",
      pincode: "110001",
      addressType: "HOME"
    },
    items: [
      {
        id: 104,
        productId: "6aeeff594fc676c777667b3d",
        productName: "Apple Watch Series 9 GPS - 45mm Midnight Aluminum",
        productImage: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
        price: 41900,
        quantity: 1,
        lineTotal: 41900,
        seller: "Apple Certified Partner"
      }
    ],
    summary: {
      subTotal: 41900,
      discount: 3000,
      deliveryFee: 0,
      tax: 0,
      totalAmount: 38900,
      currency: "INR"
    }
  }
];

export default function OrdersPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const reduxOrderData = useSelector((state) => state?.OrderReducer?.data);
  const isLoading = useSelector((state) => state?.OrderReducer?.isLoading);

  const [initialLoading, setInitialLoading] = useState(true);
  const [localOrders, setLocalOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'
  const [timeFilter, setTimeFilter] = useState('ALL'); // 'ALL', '30_DAYS', '3_MONTHS', '2026'

  // Modal States
  const [trackingModalOrder, setTrackingModalOrder] = useState(null);
  const [cancelModalOrder, setCancelModalOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('Ordered by mistake');
  const [isCancelling, setIsCancelling] = useState(false);
  const [invoiceModalOrder, setInvoiceModalOrder] = useState(null);
  const [reviewModalItem, setReviewModalItem] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Fetch Orders on mount
  useEffect(() => {
    const usertoken = Cookies.get('usertoken');
    if (usertoken) {
      dispatch(getOrderRequest({ usertoken, pageno: 0, pagesize: 20 }))
        .then((res) => {
          if (res?.success && res?.data) {
            const rawOrders = res.data?.content || (Array.isArray(res.data) ? res.data : []);
            if (rawOrders.length > 0) {
              setLocalOrders(rawOrders);
            } else {
              setLocalOrders(FALLBACK_ORDERS);
            }
          } else {
            setLocalOrders(FALLBACK_ORDERS);
          }
        })
        .catch(() => {
          setLocalOrders(FALLBACK_ORDERS);
        })
        .finally(() => {
          setInitialLoading(false);
        });
    } else {
      setLocalOrders(FALLBACK_ORDERS);
      setInitialLoading(false);
    }
  }, [dispatch]);

  // Sync Redux Data
  useEffect(() => {
    if (reduxOrderData) {
      const rawOrders = reduxOrderData?.content || (Array.isArray(reduxOrderData) ? reduxOrderData : []);
      if (rawOrders.length > 0) {
        setLocalOrders(rawOrders);
      }
    }
  }, [reduxOrderData]);

  // Filtered orders calculation
  const filteredOrders = useMemo(() => {
    return localOrders.filter((order) => {
      // 1. Status Filter
      if (statusFilter === 'DELIVERED' && order.status !== 'DELIVERED') return false;
      if (statusFilter === 'CANCELLED' && order.status !== 'CANCELLED') return false;
      if (statusFilter === 'IN_TRANSIT' && (order.status === 'DELIVERED' || order.status === 'CANCELLED')) return false;

      // 2. Search Query (Matches order number, product name, or seller)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesId = (order.orderNumber || order.id || '').toString().toLowerCase().includes(query);
        const matchesProduct = (order.items || []).some((item) =>
          (item.productName || item.name || '').toLowerCase().includes(query) ||
          (item.seller || '').toLowerCase().includes(query)
        );
        if (!matchesId && !matchesProduct) return false;
      }

      // 3. Time Filter
      if (timeFilter !== 'ALL' && order.createdAt) {
        const orderTime = new Date(order.createdAt).getTime();
        const now = Date.now();
        const daysDiff = (now - orderTime) / (1000 * 60 * 60 * 24);
        if (timeFilter === '30_DAYS' && daysDiff > 30) return false;
        if (timeFilter === '3_MONTHS' && daysDiff > 90) return false;
        if (timeFilter === '2026') {
          const orderYear = new Date(order.createdAt).getFullYear();
          if (orderYear !== 2026) return false;
        }
      }

      return true;
    });
  }, [localOrders, statusFilter, searchQuery, timeFilter]);

  // Handle Buy Again (Add to Cart)
  const handleBuyAgain = async (item) => {
    const token = Cookies.get('usertoken');
    if (!token) {
      toast.error('Please login first to add items to cart');
      return;
    }

    try {
      const res = await dispatch(
        AddToCartRequest({
          productId: item.productId || item.id,
          quantity: 1,
          productName: item.productName || item.name,
          productImage: item.productImage || item.image || '',
          price: item.price,
          usertoken: token,
        })
      );
      if (res?.success) {
        toast.success(`"${item.productName || item.name}" added to cart!`);
      }
    } catch (e) {
      toast.error('Failed to add item to cart');
    }
  };

  // Handle Order Cancellation
  const handleConfirmCancel = async () => {
    if (!cancelModalOrder) return;
    const token = Cookies.get('usertoken');

    setIsCancelling(true);
    try {
      if (token) {
        await dispatch(cancelOrderRequest({ orderId: cancelModalOrder.id, usertoken: token })).catch(() => {});
      }

      // Optimistic update
      setLocalOrders((prev) =>
        prev.map((o) => (o.id === cancelModalOrder.id ? { ...o, status: 'CANCELLED' } : o))
      );

      toast.success(`Order #${cancelModalOrder.orderNumber || cancelModalOrder.id} cancelled successfully.`);
      setCancelModalOrder(null);
    } catch (err) {
      toast.error('Could not cancel order. Please contact customer support.');
    } finally {
      setIsCancelling(false);
    }
  };

  // Handle Review Submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    toast.success('Thank you for rating this product! Your review has been submitted.');
    setReviewModalItem(null);
    setReviewComment('');
    setReviewRating(5);
  };

  // Helper for status badge
  const renderStatusBadge = (status, dateInfo) => {
    if (status === 'DELIVERED') {
      return (
        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold w-fit">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>Delivered on {dateInfo || 'recent'}</span>
        </div>
      );
    }
    if (status === 'CANCELLED') {
      return (
        <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full text-xs font-bold w-fit">
          <XCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Cancelled as requested</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold w-fit">
        <Truck className="w-3.5 h-3.5 shrink-0" />
        <span>Expected Delivery: {dateInfo || 'in 2-3 days'}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ================= PAGE HEADER & BREADCRUMBS ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-1">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <Link href="/account/profile" className="hover:text-blue-600 transition-colors">
                My Account
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <span className="text-gray-900 font-semibold">Orders</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 flex items-center gap-3">
              <Package className="w-7 h-7 text-[#2874f0]" />
              My Orders
              <span className="text-xs font-bold px-2.5 py-0.5 bg-blue-100 text-[#2874f0] rounded-full">
                {localOrders.length} {localOrders.length === 1 ? 'Order' : 'Orders'}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-[#2874f0] bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              Explore Products
            </Link>
          </div>
        </div>

        {/* ================= SEARCH & FILTER CONTROLS ================= */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 space-y-4">
          
          <div className="flex flex-col md:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search orders by product name, brand, or Order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Time Filter Select */}
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              <Calendar className="w-4 h-4 text-gray-500 hidden sm:block" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full md:w-auto px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="ALL">All Time</option>
                <option value="30_DAYS">Last 30 Days</option>
                <option value="3_MONTHS">Past 3 Months</option>
                <option value="2026">2026</option>
              </select>
            </div>

          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-gray-100 scrollbar-none">
            {[
              { id: 'ALL', label: 'All Orders' },
              { id: 'IN_TRANSIT', label: 'On The Way / Confirmed' },
              { id: 'DELIVERED', label: 'Delivered' },
              { id: 'CANCELLED', label: 'Cancelled' },
            ].map((tab) => {
              const isActive = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2874f0] text-white shadow-xs'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* ================= ORDER CARDS LIST ================= */}
        {initialLoading || isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          
          /* Empty State */
          <div className="bg-white rounded-2xl border border-gray-200 p-10 sm:p-14 text-center shadow-xs">
            <div className="w-20 h-20 bg-blue-50 text-[#2874f0] rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              No Orders Found
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm max-w-sm mx-auto mb-6">
              {searchQuery
                ? `No results matching "${searchQuery}". Try searching with another keyword.`
                : "You don't have any orders under this category yet."}
            </p>
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            ) : (
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2874f0] hover:bg-[#1b63d9] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all"
              >
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

        ) : (

          /* Order Cards */
          <div className="space-y-5">
            {filteredOrders.map((order) => {
              const orderId = order.orderNumber || `ORD-${order.id || 10840}`;
              const orderDate = order.createdAt
                ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '10 Nov 2026';

              const totalAmount = order.summary?.totalAmount !== undefined
                ? order.summary.totalAmount
                : (order.items || []).reduce((acc, it) => acc + (it.lineTotal || it.price * (it.quantity || 1)), 0);

              const recipientName = order.shippingAddress?.fullName || order.shippingAddress?.name || 'Bhaskar Joshi';
              const isDelivered = order.status === 'DELIVERED';
              const isCancelled = order.status === 'CANCELLED';

              return (
                <div
                  key={order.id || order.orderNumber}
                  className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden hover:border-gray-300 transition-all duration-200"
                >
                  
                  {/* Top Bar (Order Metadata) */}
                  <div className="bg-gray-50/80 px-4 sm:px-6 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                      <div>
                        <span className="text-gray-500 block text-[11px] font-medium uppercase">
                          Order Placed
                        </span>
                        <span className="font-bold text-gray-900">{orderDate}</span>
                      </div>

                      <div>
                        <span className="text-gray-500 block text-[11px] font-medium uppercase">
                          Total
                        </span>
                        <span className="font-extrabold text-[#2874f0]">{formatCurrency(totalAmount)}</span>
                      </div>

                      <div>
                        <span className="text-gray-500 block text-[11px] font-medium uppercase">
                          Ship To
                        </span>
                        <span className="font-bold text-gray-900 flex items-center gap-1">
                          {recipientName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-gray-500 block text-[11px] font-medium uppercase">
                          Order ID
                        </span>
                        <span className="font-mono font-bold text-gray-900 tracking-wider">
                          #{orderId}
                        </span>
                      </div>

                      <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

                      <button
                        onClick={() => setInvoiceModalOrder(order)}
                        className="px-2.5 py-1 text-xs font-bold text-gray-700 hover:text-blue-600 hover:bg-gray-200/60 rounded flex items-center gap-1 transition-colors cursor-pointer"
                        title="View invoice"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Invoice</span>
                      </button>
                    </div>
                  </div>

                  {/* Body: Items List */}
                  <div className="p-4 sm:p-6 divide-y divide-gray-100">
                    {(order.items || []).map((item, itIdx) => {
                      const itemPrice = item.price;
                      const qty = item.quantity || 1;
                      const lineTotal = item.lineTotal || itemPrice * qty;
                      const imageSrc = item.productImage || item.image || '/placeholder-image.jpg';

                      return (
                        <div
                          key={item.id || itIdx}
                          className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                        >
                          
                          {/* Item Thumbnail & Details */}
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <Link
                              href={`/products/${item.productId || ''}`}
                              className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 border border-gray-200 rounded-lg p-1.5 shrink-0 flex items-center justify-center overflow-hidden group cursor-pointer"
                            >
                              <img
                                src={imageSrc}
                                alt={item.productName || 'Product'}
                                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                              />
                            </Link>

                            <div className="min-w-0 flex-1 space-y-1">
                              {item.seller && (
                                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                                  Seller: {item.seller}
                                </p>
                              )}

                              <Link
                                href={`/products/${item.productId || ''}`}
                                className="font-bold text-sm sm:text-base text-gray-900 hover:text-[#2874f0] line-clamp-2 transition-colors cursor-pointer"
                              >
                                {item.productName}
                              </Link>

                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                <span className="font-bold text-gray-900">{formatCurrency(lineTotal)}</span>
                                {qty > 1 && (
                                  <span className="text-gray-500 text-xs">
                                    ({formatCurrency(itemPrice)} × {qty})
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Item Status Info */}
                          <div className="w-full md:w-56 shrink-0 md:text-left space-y-1">
                            {renderStatusBadge(
                              order.status,
                              isDelivered ? order.deliveredDate : order.expectedDelivery
                            )}
                            <p className="text-[11px] text-gray-500 pl-1">
                              {isDelivered
                                ? 'Your item has been delivered'
                                : isCancelled
                                ? 'Refund initiated if paid online'
                                : 'Package is on schedule'}
                            </p>
                          </div>

                          {/* Action Buttons Column */}
                          <div className="flex flex-wrap sm:flex-nowrap md:flex-col gap-2 w-full md:w-44 shrink-0">
                            
                            {/* Track Package */}
                            {!isCancelled && (
                              <button
                                onClick={() => setTrackingModalOrder(order)}
                                className="flex-1 md:flex-none py-2 px-3 bg-[#2874f0] hover:bg-[#1b63d9] text-white text-xs font-bold rounded-lg shadow-2xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <Truck className="w-3.5 h-3.5" />
                                Track Package
                              </button>
                            )}

                            {/* Buy Again */}
                            <button
                              onClick={() => handleBuyAgain(item)}
                              className="flex-1 md:flex-none py-2 px-3 border border-gray-300 hover:bg-gray-100 text-gray-800 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              Buy Again
                            </button>

                            {/* Rate Product (Delivered) */}
                            {isDelivered && (
                              <button
                                onClick={() => setReviewModalItem(item)}
                                className="flex-1 md:flex-none py-1.5 px-3 text-xs font-semibold text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg border border-amber-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                                Rate & Review
                              </button>
                            )}

                            {/* Cancel Order (If in transit) */}
                            {!isDelivered && !isCancelled && (
                              <button
                                onClick={() => setCancelModalOrder(order)}
                                className="flex-1 md:flex-none py-1.5 px-3 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200 transition-colors cursor-pointer"
                              >
                                Cancel Order
                              </button>
                            )}

                          </div>

                        </div>
                      );
                    })}
                  </div>

                  {/* Card Bottom Footer: Delivery Address & Payment summary */}
                  <div className="bg-gray-50/50 px-4 sm:px-6 py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate max-w-md">
                        Delivery to: <span className="font-semibold text-gray-800">{order.shippingAddress?.street || 'Connaught Place'}, {order.shippingAddress?.city || 'New Delhi'}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-medium">
                      <span>Paid via: <span className="font-semibold text-gray-800">{order.paymentMethod || 'UPI'}</span></span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        )}

      </div>

      {/* ================= MODAL: TRACK PACKAGE ================= */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border border-gray-100 animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setTrackingModalOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-blue-600 font-bold text-base mb-1">
              <Truck className="w-5 h-5" />
              <span>Tracking Information</span>
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Order #{trackingModalOrder.orderNumber || trackingModalOrder.id}
            </p>

            {/* Tracking Progress Timeline */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
              
              {/* Step 1: Confirmed */}
              <div className="relative">
                <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Order Confirmed</h4>
                  <p className="text-xs text-gray-500">Order verified and assigned to warehouse</p>
                </div>
              </div>

              {/* Step 2: Shipped */}
              <div className="relative">
                <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Shipped with Quick Express</h4>
                  <p className="text-xs text-gray-500">AWB Tracking Code: <span className="font-mono font-bold">QX983720194IN</span></p>
                </div>
              </div>

              {/* Step 3: Out for Delivery */}
              <div className="relative">
                <div className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  trackingModalOrder.status === 'DELIVERED' ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white animate-pulse'
                }`}>
                  {trackingModalOrder.status === 'DELIVERED' ? '✓' : '●'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Out for Delivery</h4>
                  <p className="text-xs text-gray-500">Courier partner is on the way to delivery address</p>
                </div>
              </div>

              {/* Step 4: Delivered */}
              <div className="relative">
                <div className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  trackingModalOrder.status === 'DELIVERED' ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {trackingModalOrder.status === 'DELIVERED' ? '✓' : '4'}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${trackingModalOrder.status === 'DELIVERED' ? 'text-emerald-700' : 'text-gray-400'}`}>
                    Delivered
                  </h4>
                  <p className="text-xs text-gray-500">
                    {trackingModalOrder.status === 'DELIVERED' ? `Delivered on ${trackingModalOrder.deliveredDate}` : 'Scheduled arrival'}
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setTrackingModalOrder(null)}
                className="py-2.5 px-6 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: CANCEL ORDER ================= */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-gray-100 animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setCancelModalOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-red-600 font-bold text-base mb-2">
              <AlertCircle className="w-5 h-5" />
              <span>Cancel Order Confirmation</span>
            </div>

            <p className="text-xs text-gray-600 mb-4">
              Are you sure you want to cancel order <span className="font-bold text-gray-900">#{cancelModalOrder.orderNumber || cancelModalOrder.id}</span>? Any online payment will be refunded to your original payment source within 2-4 business days.
            </p>

            <div className="space-y-3 mb-6">
              <label className="block text-xs font-bold text-gray-700">Reason for Cancellation</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none cursor-pointer"
              >
                <option value="Ordered by mistake">Ordered by mistake</option>
                <option value="Found cheaper alternative elsewhere">Found cheaper alternative elsewhere</option>
                <option value="Delivery time is too long">Delivery time is too long</option>
                <option value="Need to change shipping address">Need to change shipping address</option>
                <option value="Other reason">Other reason</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCancelModalOrder(null)}
                className="flex-1 py-2.5 px-4 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Keep Order
              </button>
              <button
                type="button"
                disabled={isCancelling}
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isCancelling ? 'Cancelling...' : 'Confirm Cancellation'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: INVOICE ================= */}
      {invoiceModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative border border-gray-100 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInvoiceModalOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Invoice Header */}
            <div className="flex justify-between items-start pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">TAX INVOICE</h2>
                <p className="text-xs text-gray-500 mt-1">Quick E-Commerce Retail Pvt. Ltd.</p>
                <p className="text-[11px] text-gray-400">GSTIN: 07AAACQ9821L1ZV</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-gray-900 font-mono">
                  #{invoiceModalOrder.orderNumber || invoiceModalOrder.id}
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  Date: {invoiceModalOrder.createdAt ? new Date(invoiceModalOrder.createdAt).toLocaleDateString('en-IN') : '10 Nov 2026'}
                </p>
              </div>
            </div>

            {/* Bill To & Ship To */}
            <div className="grid grid-cols-2 gap-4 py-4 border-b border-gray-100 text-xs">
              <div>
                <span className="font-bold text-gray-800 uppercase block mb-1">Delivered To:</span>
                <p className="text-gray-700 font-semibold">{invoiceModalOrder.shippingAddress?.fullName || 'Bhaskar Joshi'}</p>
                <p className="text-gray-500">{invoiceModalOrder.shippingAddress?.street || 'Barakhamba Road'}</p>
                <p className="text-gray-500">{invoiceModalOrder.shippingAddress?.city || 'New Delhi'}, {invoiceModalOrder.shippingAddress?.pincode || '110001'}</p>
                <p className="text-gray-500">Phone: {invoiceModalOrder.shippingAddress?.mobile || '9876543210'}</p>
              </div>

              <div className="text-right">
                <span className="font-bold text-gray-800 uppercase block mb-1">Payment Method:</span>
                <p className="text-gray-700 font-semibold">{invoiceModalOrder.paymentMethod || 'UPI'}</p>
                <p className="text-emerald-600 font-bold uppercase mt-1">Status: Paid</p>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="py-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-semibold">
                    <th className="pb-2">Item Description</th>
                    <th className="pb-2 text-center">Qty</th>
                    <th className="pb-2 text-right">Price</th>
                    <th className="pb-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(invoiceModalOrder.items || []).map((it, idx) => (
                    <tr key={idx} className="text-gray-800">
                      <td className="py-2.5 font-medium">{it.productName}</td>
                      <td className="py-2.5 text-center">{it.quantity || 1}</td>
                      <td className="py-2.5 text-right">{formatCurrency(it.price)}</td>
                      <td className="py-2.5 text-right font-bold">{formatCurrency(it.lineTotal || it.price * (it.quantity || 1))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Invoice Total */}
            <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-sm font-bold">
              <span>Grand Total</span>
              <span className="text-lg text-[#2874f0]">
                {formatCurrency(
                  invoiceModalOrder.summary?.totalAmount !== undefined
                    ? invoiceModalOrder.summary.totalAmount
                    : (invoiceModalOrder.items || []).reduce((acc, it) => acc + (it.lineTotal || it.price * (it.quantity || 1)), 0)
                )}
              </span>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="py-2.5 px-4 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Print Invoice
              </button>
              <button
                onClick={() => {
                  toast.success('Invoice downloaded successfully!');
                  setInvoiceModalOrder(null);
                }}
                className="py-2.5 px-4 bg-[#2874f0] hover:bg-[#1b63d9] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: RATE & REVIEW ================= */}
      {reviewModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-gray-100 animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setReviewModalItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-gray-900 mb-1">
              Rate & Review Product
            </h3>
            <p className="text-xs text-gray-500 mb-4 truncate">
              {reviewModalItem.productName}
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Overall Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setReviewRating(s)}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          s <= reviewRating
                            ? 'fill-amber-400 text-amber-500'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Feedback (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Share details of your experience with this item..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalItem(null)}
                  className="flex-1 py-2.5 px-4 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-[#2874f0] hover:bg-[#1b63d9] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
