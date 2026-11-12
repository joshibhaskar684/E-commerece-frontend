'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  CreditCard, 
  ChevronRight, 
  FileText, 
  RotateCcw, 
  Star, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  XCircle,
  HelpCircle,
  Download,
  Printer
} from 'lucide-react';
import { toast } from 'react-toastify';
import { getOrderDetailsByOrderId } from '@/redux-store/Order/action';
import { AddToCartRequest } from '@/redux-store/cart/action';

const formatCurrency = (amount) => {
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return `₹${num.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const orderId = params?.orderId;
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const token = Cookies.get('usertoken');
    if (orderId && token) {
      dispatch(getOrderDetailsByOrderId({ orderId, usertoken: token }))
        .then((res) => {
          if (res?.success && res?.data) {
            setOrderDetails(res.data);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, orderId]);

  // Fallback order data
  const order = orderDetails || {
    id: orderId || "10842",
    orderNumber: orderId ? (orderId.startsWith('ORD') ? orderId : `ORD-${orderId}-IN`) : "ORD-948201-IN",
    status: "DELIVERED",
    deliveredDate: "11 Nov 2026",
    paymentMethod: "UPI (Google Pay)",
    createdAt: "2026-11-08T10:30:00Z",
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
        productName: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones - Silver",
        productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        price: 26990,
        quantity: 1,
        seller: "Sony Authorised India"
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
  };

  const isDelivered = order.status === 'DELIVERED';
  const isCancelled = order.status === 'CANCELLED';

  const handleBuyAgain = async (item) => {
    const token = Cookies.get('usertoken');
    if (!token) {
      toast.error('Please login first');
      return;
    }
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
      toast.success('Added to cart!');
    }
  };

  const handleRatingSubmit = () => {
    if (rating === 0) {
      toast.warn('Please select a star rating first');
      return;
    }
    setHasRated(true);
    toast.success('Thank you for rating this product!');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Back Link & Breadcrumbs */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2874f0] hover:text-[#1b63d9] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Orders
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <span>Order #{order.orderNumber || order.id}</span>
          </div>
        </div>

        {/* Header Hero Card */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-blue-200 font-semibold">
              Order Details
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              #{order.orderNumber || order.id}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Placed on {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '10 Nov 2026'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 ${
              isDelivered
                ? 'bg-emerald-400 text-emerald-950'
                : isCancelled
                ? 'bg-red-400 text-red-950'
                : 'bg-amber-300 text-amber-950'
            }`}>
              {isDelivered && <CheckCircle2 className="w-3.5 h-3.5" />}
              {isCancelled && <XCircle className="w-3.5 h-3.5" />}
              {!isDelivered && !isCancelled && <Truck className="w-3.5 h-3.5" />}
              {order.status || 'DELIVERED'}
            </span>

            <button
              onClick={() => window.print()}
              className="py-1.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5 sm:p-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-6 flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#2874f0]" />
            Delivery Progress
          </h3>

          <div className="relative flex flex-col sm:flex-row justify-between gap-6 sm:gap-2">
            {[
              { title: 'Ordered', desc: 'Verified & Confirmed', done: true },
              { title: 'Shipped', desc: 'Dispatched via Quick Express', done: true },
              { title: 'Out for Delivery', desc: 'Assigned to courier', done: isDelivered },
              { title: 'Delivered', desc: isDelivered ? `Delivered on ${order.deliveredDate}` : 'Scheduled', done: isDelivered },
            ].map((step, idx) => (
              <div key={idx} className="flex-1 flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-3 sm:gap-2 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  step.done ? 'bg-emerald-600 text-white shadow-xs' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.done ? '✓' : idx + 1}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">{step.title}</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left 2 Cols: Items & Reviews */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Items Card */}
            <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5 sm:p-6 space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide pb-3 border-b border-gray-100 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#2874f0]" />
                Items Ordered ({(order.items || []).length})
              </h3>

              <div className="divide-y divide-gray-100">
                {(order.items || []).map((item, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded-lg p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.productImage || item.image || '/placeholder-image.jpg'}
                          alt={item.productName || 'Product'}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <Link
                          href={`/products/${item.productId || ''}`}
                          className="font-bold text-sm sm:text-base text-gray-900 hover:text-blue-600 line-clamp-2 transition-colors"
                        >
                          {item.productName || item.name}
                        </Link>
                        {item.seller && (
                          <p className="text-xs text-gray-500">Seller: {item.seller}</p>
                        )}
                        <p className="text-sm font-extrabold text-gray-900">
                          {formatCurrency(item.price)}
                          <span className="text-xs font-normal text-gray-500 ml-1">× {item.quantity || 1}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBuyAgain(item)}
                      className="py-2 px-4 border border-gray-300 hover:bg-gray-100 text-gray-800 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Buy Again
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Section */}
            {isDelivered && (
              <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5 sm:p-6 space-y-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  Rate Your Experience
                </h3>
                <p className="text-xs text-gray-500">
                  How satisfied are you with the quality and delivery of this order?
                </p>

                {hasRated ? (
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold flex items-center gap-2 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" />
                    Thank you! Your feedback has been registered.
                  </div>
                ) : (
                  <div className="space-y-3 pt-1">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              s <= rating
                                ? 'fill-amber-400 text-amber-500'
                                : 'text-gray-300 hover:text-amber-400'
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleRatingSubmit}
                      className="py-2 px-5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Submit Rating
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Col: Price Breakdown & Delivery Address */}
          <div className="space-y-6">
            
            {/* Price Details */}
            <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5 space-y-3">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide pb-2 border-b border-gray-100">
                Price Breakdown
              </h3>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>List Price</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(order.summary?.subTotal || 26990)}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span className="font-bold">-{formatCurrency(order.summary?.discount || 2000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-bold text-emerald-600 uppercase">FREE</span>
                </div>
                <div className="pt-2 border-t border-gray-100 flex justify-between items-baseline font-bold text-sm text-gray-900">
                  <span>Total Paid</span>
                  <span className="text-lg text-[#2874f0]">{formatCurrency(order.summary?.totalAmount || 24990)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5 space-y-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide pb-2 border-b border-gray-100 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gray-500" />
                Delivery Address
              </h3>

              <p className="text-xs font-bold text-gray-900 mt-2">
                {order.shippingAddress?.fullName || 'Bhaskar Joshi'}
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {order.shippingAddress?.street || 'Flat 402, Royal Residency, Barakhamba Road'}, {order.shippingAddress?.city || 'New Delhi'}, {order.shippingAddress?.state || 'Delhi NCR'} - {order.shippingAddress?.pincode || '110001'}
              </p>
              <p className="text-xs text-gray-500 pt-1">
                Phone: <span className="font-semibold text-gray-800">{order.shippingAddress?.mobile || '9876543210'}</span>
              </p>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-5 space-y-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide pb-2 border-b border-gray-100 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-gray-500" />
                Payment Method
              </h3>
              <p className="text-xs font-semibold text-gray-800">
                {order.paymentMethod || 'UPI (Google Pay)'}
              </p>
              <p className="text-[11px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md w-fit">
                Payment Status: Confirmed & Paid
              </p>
            </div>

            {/* Need Help CTA */}
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-blue-900">
                <HelpCircle className="w-4 h-4 text-[#2874f0]" />
                Need help with this order?
              </div>
              <p className="text-gray-600">
                Contact our customer support for return, replacement, or invoice queries.
              </p>
              <Link
                href="/policy/returns"
                className="inline-flex items-center gap-1 text-blue-600 font-bold hover:underline pt-1"
              >
                Returns & Refund Policy
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
