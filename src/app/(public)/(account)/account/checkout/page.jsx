'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { 
  CheckCircle2, 
  MapPin, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ShoppingBag, 
  ArrowRight, 
  Plus, 
  Edit3, 
  Clock, 
  Sparkles, 
  Lock, 
  ChevronRight, 
  AlertCircle, 
  RefreshCw, 
  Tag, 
  Check, 
  ChevronDown, 
  Building2, 
  Home, 
  Briefcase,
  QrCode,
  Smartphone,
  Banknote,
  BadgeCheck,
  Package
} from 'lucide-react';
import { 
  SiGooglepay, 
  SiPaytm, 
  SiPhonepe, 
  SiRazorpay 
} from 'react-icons/si';
import { toast } from 'react-toastify';
import { GetCartRequest, ClearCartRequest } from '@/redux-store/cart/action';
import { GetUser } from '@/redux-store/user/action';

// Helper function to safely extract numbers from price
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
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Extractor for cart items array from any response shape
const extractItems = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.items)) return data.items;
  if (data.data && Array.isArray(data.data.items)) return data.data.items;
  if (Array.isArray(data.data)) return data.data;
  if (data.cart && Array.isArray(data.cart.items)) return data.cart.items;
  return [];
};

// Extractor for summary object
const extractSummary = (data) => {
  if (!data) return null;
  if (data.summary) return data.summary;
  if (data.data?.summary) return data.data.summary;
  if (data.cart?.summary) return data.cart.summary;
  return null;
};

// Available Indian States for address
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi NCR', 'Chandigarh', 'Jammu and Kashmir', 'Ladakh'
];

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const reduxCartData = useSelector((state) => state?.CartReducer?.cartdata);
  const currentUser = useSelector((state) => state?.UserReducer?.data || state?.UserReducer?.user);

  const [initialLoading, setInitialLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(1); // 1: Address, 2: Order Summary, 3: Payment
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccessData, setOrderSuccessData] = useState(null);

  // Address Management
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 'addr-1',
      name: 'Bhaskar Joshi',
      phone: '9876543210',
      pincode: '110001',
      locality: 'Connaught Place',
      addressLine: 'Flat 402, Royal Residency, Barakhamba Road',
      city: 'New Delhi',
      state: 'Delhi NCR',
      landmark: 'Near Metro Station Gate 2',
      type: 'HOME',
      isDefault: true,
    },
    {
      id: 'addr-2',
      name: 'Bhaskar Joshi',
      phone: '9876543210',
      pincode: '201301',
      locality: 'Sector 62',
      addressLine: 'Tower B, Tech Park, Electronic City',
      city: 'Noida',
      state: 'Uttar Pradesh',
      landmark: 'Opposite Metro Hospital',
      type: 'WORK',
      isDefault: false,
    }
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState('addr-1');
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    addressLine: '',
    city: '',
    state: 'Delhi NCR',
    landmark: '',
    type: 'HOME',
  });

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'netbanking', 'cod'
  const [upiOption, setUpiOption] = useState('gpay'); // 'gpay', 'phonepe', 'paytm', 'custom'
  const [customUpiId, setCustomUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('sbi');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // COD Anti-bot Captcha
  const [captchaCode, setCaptchaCode] = useState('482');
  const [captchaInput, setCaptchaInput] = useState('');

  // Coupons
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Fetch initial cart and user data
  useEffect(() => {
    const usertoken = Cookies.get('usertoken');
    if (usertoken) {
      Promise.all([
        dispatch(GetCartRequest({ usertoken })),
        dispatch(GetUser({ token: usertoken })).catch(() => {})
      ]).finally(() => {
        setInitialLoading(false);
      });
    } else {
      setInitialLoading(false);
    }
  }, [dispatch]);

  // Update address name if user profile loads
  useEffect(() => {
    if (currentUser?.name) {
      setSavedAddresses((prev) =>
        prev.map((a, idx) => (idx === 0 ? { ...a, name: currentUser.name, phone: currentUser.mobile || a.phone } : a))
      );
    }
  }, [currentUser]);

  // Generate random captcha for COD
  const refreshCaptcha = () => {
    const randomCode = Math.floor(100 + Math.random() * 900).toString();
    setCaptchaCode(randomCode);
    setCaptchaInput('');
  };

  const items = extractItems(reduxCartData);
  const summary = extractSummary(reduxCartData);

  // Price calculations
  const calculatedSubtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const price = getSafePrice(item?.price ?? item?.priceAtAddTime);
      const qty = item?.quantity || 1;
      return acc + price * qty;
    }, 0);
  }, [items]);

  const baseSubTotal = summary?.subTotal !== undefined ? summary.subTotal : calculatedSubtotal;
  const baseDiscount = summary?.discount || 0;
  const couponDiscount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const totalDiscount = baseDiscount + couponDiscount;
  const deliveryFee = 0; // Free delivery promotion
  const tax = summary?.tax !== undefined ? summary.tax : 0;
  const totalAmount = Math.max(0, baseSubTotal - totalDiscount + deliveryFee + tax);
  const totalItemCount = items.reduce((acc, item) => acc + (item?.quantity || 1), 0);

  // Estimated delivery calculation (3 days from now)
  const deliveryDateFormatted = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  // Handle Address Save
  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!newAddress.name || !newAddress.phone || !newAddress.pincode || !newAddress.addressLine || !newAddress.city) {
      toast.error('Please fill all required address fields');
      return;
    }
    if (newAddress.phone.length < 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    const createdAddress = {
      ...newAddress,
      id: `addr-${Date.now()}`,
    };

    setSavedAddresses([createdAddress, ...savedAddresses]);
    setSelectedAddressId(createdAddress.id);
    setShowAddAddressForm(false);
    toast.success('Address added successfully!');
  };

  // Handle Apply Coupon
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (!cleanCode) return;

    if (cleanCode === 'QUICK50') {
      const discount = Math.min(50, baseSubTotal * 0.2);
      setAppliedCoupon({ code: cleanCode, discountAmount: discount, description: 'Flat ₹50 off on your order' });
      toast.success('Coupon QUICK50 applied! ₹50 saved.');
      setCouponCode('');
    } else if (cleanCode === 'WELCOME10') {
      const discount = Math.round(baseSubTotal * 0.1);
      setAppliedCoupon({ code: cleanCode, discountAmount: discount, description: '10% instant discount applied' });
      toast.success('Coupon WELCOME10 applied! 10% saved.');
      setCouponCode('');
    } else if (cleanCode === 'FREESHIP') {
      setAppliedCoupon({ code: cleanCode, discountAmount: 0, description: 'Free Express Shipping unlocked' });
      toast.success('Coupon FREESHIP applied!');
      setCouponCode('');
    } else {
      toast.error('Invalid coupon code. Try QUICK50 or WELCOME10');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.info('Coupon removed');
  };

  // Handle Format Card Number with Spaces
  const handleCardNumberChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = rawVal.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardDetails({ ...cardDetails, number: formatted });
  };

  // Handle Format Card Expiry
  const handleExpiryChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (rawVal.length >= 3) {
      setCardDetails({ ...cardDetails, expiry: `${rawVal.slice(0, 2)}/${rawVal.slice(2)}` });
    } else {
      setCardDetails({ ...cardDetails, expiry: rawVal });
    }
  };

  // Handle Order Placement
  const handlePlaceOrder = async () => {
    const usertoken = Cookies.get('usertoken');
    if (!usertoken) {
      toast.error('Please login first to place an order');
      return;
    }

    if (items.length === 0) {
      toast.warn('Your cart is empty');
      return;
    }

    const chosenAddress = savedAddresses.find((a) => a.id === selectedAddressId) || savedAddresses[0];
    if (!chosenAddress) {
      toast.error('Please select a delivery address');
      setActiveStep(1);
      return;
    }

    // Payment validation
    if (paymentMethod === 'upi' && upiOption === 'custom') {
      if (!customUpiId || !customUpiId.includes('@')) {
        toast.error('Please enter a valid UPI ID (e.g., yourname@okhdfcbank)');
        return;
      }
    }

    if (paymentMethod === 'card') {
      const cleanNum = cardDetails.number.replace(/\s/g, '');
      if (cleanNum.length < 16) {
        toast.error('Please enter a valid 16-digit card number');
        return;
      }
      if (!cardDetails.expiry || cardDetails.expiry.length < 5) {
        toast.error('Please enter card expiry date (MM/YY)');
        return;
      }
      if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
        toast.error('Please enter 3-digit CVV');
        return;
      }
    }

    if (paymentMethod === 'cod') {
      if (captchaInput.trim() !== captchaCode) {
        toast.error('Incorrect captcha code. Please re-enter.');
        refreshCaptcha();
        return;
      }
    }

    setIsPlacingOrder(true);

    try {
      // Simulate backend payment and order creation
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Clear Cart from backend and redux state
      await dispatch(ClearCartRequest({ usertoken })).catch(() => {});

      const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

      let paymentLabel = 'Cash on Delivery (COD)';
      if (paymentMethod === 'upi') {
        paymentLabel = upiOption === 'custom' ? `UPI (${customUpiId})` : `UPI (${upiOption.toUpperCase()})`;
      } else if (paymentMethod === 'card') {
        paymentLabel = `Card ending in ${cardDetails.number.slice(-4) || '4242'}`;
      } else if (paymentMethod === 'netbanking') {
        paymentLabel = `Net Banking (${selectedBank.toUpperCase()})`;
      }

      setOrderSuccessData({
        orderId: orderNumber,
        address: chosenAddress,
        totalAmount,
        paymentMethod: paymentLabel,
        itemsCount: totalItemCount,
        deliveryDate: deliveryDateFormatted,
      });

      toast.success('Order placed successfully! 🎉');
    } catch (err) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const selectedAddress = savedAddresses.find((a) => a.id === selectedAddressId) || savedAddresses[0];

  // 1. Initial Loading Skeleton
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-10 bg-gray-200 rounded-lg w-64 mb-6"></div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3 space-y-4">
              <div className="h-44 bg-gray-200 rounded-xl"></div>
              <div className="h-44 bg-gray-200 rounded-xl"></div>
              <div className="h-44 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="w-full lg:w-1/3">
              <div className="h-80 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Order Success Screen
  if (orderSuccessData) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-500 text-sm mt-1.5">
            Thank you for shopping with us. Your order has been confirmed.
          </p>

          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 my-6 text-left space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-blue-100">
              <span className="text-gray-500 font-medium">Order ID</span>
              <span className="font-bold text-gray-900 tracking-wider font-mono">
                #{orderSuccessData.orderId}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Estimated Delivery</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <Truck className="w-4 h-4" />
                {orderSuccessData.deliveryDate}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Payment Method</span>
              <span className="font-semibold text-gray-800">
                {orderSuccessData.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Total Paid</span>
              <span className="font-extrabold text-[#2874f0] text-base">
                {formatCurrency(orderSuccessData.totalAmount)}
              </span>
            </div>
            <div className="pt-2 border-t border-blue-100">
              <span className="text-gray-500 block mb-0.5 font-medium">Delivering To</span>
              <p className="text-gray-800 font-medium text-xs leading-relaxed">
                <span className="font-bold">{orderSuccessData.address.name}</span> ({orderSuccessData.address.phone})<br />
                {orderSuccessData.address.addressLine}, {orderSuccessData.address.locality}, {orderSuccessData.address.city}, {orderSuccessData.address.state} - {orderSuccessData.address.pincode}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push('/account/orders')}
              className="flex-1 py-3.5 px-4 bg-[#2874f0] hover:bg-[#1b63d9] text-white font-bold text-sm rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Package className="w-4 h-4" />
              View My Orders
            </button>
            <button
              onClick={() => router.push('/products')}
              className="flex-1 py-3.5 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-sm rounded-lg transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Empty Cart State
  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-20 h-20 bg-blue-50 text-[#2874f0] rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 text-sm mb-6">
            Looks like you haven&apos;t added any items to your cart yet. Explore our top products and start shopping!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-lg bg-[#2874f0] hover:bg-[#1b63d9] text-white font-bold text-sm shadow-sm transition-all"
          >
            Explore Products
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb & Security Assurance Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-1">
              <Link href="/account/cart" className="hover:text-blue-600 transition-colors">
                Cart
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <span className="text-gray-900 font-semibold">Checkout</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 flex items-center gap-2.5">
              Secure Checkout
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Safe & Verified
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Bank Grade Encryption</span>
          </div>
        </div>

        {/* Main Grid: Steps Column (Left) + Order Summary Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 3-Step Checkout Flow */}
          <div className="lg:col-span-8 space-y-4">

            {/* ================= STEP 1: DELIVERY ADDRESS ================= */}
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden transition-all">
              
              {/* Header */}
              <div 
                className={`p-4 sm:p-5 flex items-center justify-between transition-colors ${
                  activeStep === 1 ? 'bg-[#2874f0] text-white' : 'bg-gray-50 text-gray-800 border-b border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs sm:text-sm ${
                    activeStep === 1 ? 'bg-white text-[#2874f0]' : 'bg-emerald-600 text-white'
                  }`}>
                    {activeStep > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide">
                      Delivery Address
                    </h2>
                    {activeStep > 1 && selectedAddress && (
                      <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">
                        <span className="font-bold text-gray-900">{selectedAddress.name}</span> — {selectedAddress.addressLine}, {selectedAddress.city} - {selectedAddress.pincode}
                      </p>
                    )}
                  </div>
                </div>

                {activeStep > 1 && (
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-3 py-1.5 text-xs font-bold text-[#2874f0] bg-white border border-blue-200 hover:bg-blue-50 rounded-md transition-colors shadow-xs cursor-pointer"
                  >
                    CHANGE
                  </button>
                )}
              </div>

              {/* Step 1 Body (When Active) */}
              {activeStep === 1 && (
                <div className="p-4 sm:p-6 space-y-4">
                  
                  {/* Saved Addresses List */}
                  <div className="space-y-3">
                    {savedAddresses.map((addr) => {
                      const isSelected = selectedAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedAddressId(addr.id)}
                          className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                            isSelected
                              ? 'border-[#2874f0] bg-blue-50/40 shadow-xs'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <input
                            type="radio"
                            name="deliveryAddress"
                            checked={isSelected}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="mt-1 size-4 text-[#2874f0] focus:ring-[#2874f0] cursor-pointer"
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-sm font-bold text-gray-900">
                                {addr.name}
                              </span>
                              <span className="text-xs font-semibold px-2 py-0.5 rounded text-gray-600 bg-gray-100 uppercase tracking-wider">
                                {addr.type === 'HOME' ? '🏠 Home' : '🏢 Work'}
                              </span>
                              <span className="text-xs text-gray-500 font-semibold">
                                {addr.phone}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                              {addr.addressLine}, {addr.locality}, {addr.city}, {addr.state} -{' '}
                              <span className="font-bold text-gray-900">{addr.pincode}</span>
                            </p>

                            {addr.landmark && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                Landmark: {addr.landmark}
                              </p>
                            )}

                            {isSelected && (
                              <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveStep(2);
                                  }}
                                  className="py-2.5 px-6 bg-[#fb641b] hover:bg-[#e85a14] active:scale-[0.99] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-2"
                                >
                                  DELIVER HERE
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                                  <Truck className="w-3.5 h-3.5" />
                                  Delivery by {deliveryDateFormatted}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add New Address Accordion / Toggle */}
                  {!showAddAddressForm ? (
                    <button
                      type="button"
                      onClick={() => setShowAddAddressForm(true)}
                      className="w-full py-3 px-4 border border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/30 text-blue-600 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      ADD A NEW DELIVERY ADDRESS
                    </button>
                  ) : (
                    <form onSubmit={handleSaveNewAddress} className="mt-4 p-5 rounded-xl border border-blue-200 bg-blue-50/20 space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          Add New Delivery Address
                        </h3>
                        <button
                          type="button"
                          onClick={() => setShowAddAddressForm(false)}
                          className="text-xs text-gray-500 hover:text-gray-800 font-semibold"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. John Doe"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">10-Digit Mobile Number *</label>
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            placeholder="e.g. 9876543210"
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value.replace(/\D/g, '') })}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Pincode *</label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            placeholder="e.g. 110001"
                            value={newAddress.pincode}
                            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value.replace(/\D/g, '') })}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Locality / Area *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Connaught Place"
                            value={newAddress.locality}
                            onChange={(e) => setNewAddress({ ...newAddress, locality: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Flat, House no., Building, Company, Apartment *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Flat 301, Tower 2, Green Heights"
                          value={newAddress.addressLine}
                          onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">City / District *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. New Delhi"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">State *</label>
                          <select
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                          >
                            {INDIAN_STATES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Landmark (Optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. Near Metro Gate"
                            value={newAddress.landmark}
                            onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Address Type */}
                      <div className="pt-2">
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Address Type</label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                            <input
                              type="radio"
                              name="addrType"
                              checked={newAddress.type === 'HOME'}
                              onChange={() => setNewAddress({ ...newAddress, type: 'HOME' })}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span>Home (All day delivery)</span>
                          </label>
                          <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                            <input
                              type="radio"
                              name="addrType"
                              checked={newAddress.type === 'WORK'}
                              onChange={() => setNewAddress({ ...newAddress, type: 'WORK' })}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span>Work (Delivery between 10 AM - 5 PM)</span>
                          </label>
                        </div>
                      </div>

                      <div className="pt-2 flex gap-3">
                        <button
                          type="submit"
                          className="py-2.5 px-6 bg-[#fb641b] hover:bg-[#e85a14] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all cursor-pointer"
                        >
                          SAVE AND DELIVER HERE
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddAddressForm(false)}
                          className="py-2.5 px-4 border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          CANCEL
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* ================= STEP 2: ORDER SUMMARY ================= */}
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden transition-all">
              
              {/* Header */}
              <div 
                className={`p-4 sm:p-5 flex items-center justify-between transition-colors ${
                  activeStep === 2 ? 'bg-[#2874f0] text-white' : 'bg-gray-50 text-gray-800 border-b border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs sm:text-sm ${
                    activeStep === 2 ? 'bg-white text-[#2874f0]' : activeStep > 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {activeStep > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide">
                      Order Summary
                    </h2>
                    {activeStep !== 2 && (
                      <p className="text-xs text-gray-600 mt-0.5">
                        {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} in your cart
                      </p>
                    )}
                  </div>
                </div>

                {activeStep > 2 && (
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-3 py-1.5 text-xs font-bold text-[#2874f0] bg-white border border-blue-200 hover:bg-blue-50 rounded-md transition-colors shadow-xs cursor-pointer"
                  >
                    CHANGE
                  </button>
                )}
              </div>

              {/* Step 2 Body (When Active) */}
              {activeStep === 2 && (
                <div className="p-4 sm:p-6 space-y-4">
                  
                  {/* Items List */}
                  <div className="divide-y divide-gray-100">
                    {items.map((item, idx) => {
                      const itemPrice = getSafePrice(item?.price ?? item?.priceAtAddTime);
                      const qty = item?.quantity || 1;
                      const itemTotal = itemPrice * qty;
                      const imageSrc = item?.productImage || item?.images?.[0] || '/placeholder-image.jpg';

                      return (
                        <div key={item?.productId || item?.id || idx} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 border border-gray-200 rounded-lg p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                            <img
                              src={imageSrc}
                              alt={item?.productName || 'Product'}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                              {item?.productName || 'Product Item'}
                            </h4>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Quantity: <span className="font-bold text-gray-800">{qty}</span>
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm sm:text-base font-extrabold text-gray-900">
                                {formatCurrency(itemTotal)}
                              </span>
                              {qty > 1 && (
                                <span className="text-xs text-gray-500 font-medium">
                                  ({formatCurrency(itemPrice)} each)
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-right shrink-0 hidden sm:block">
                            <p className="text-xs font-medium text-emerald-700 flex items-center justify-end gap-1">
                              <Truck className="w-3.5 h-3.5" />
                              Free Delivery
                            </p>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                              by {deliveryDateFormatted}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Confirmation note & Continue Button */}
                  <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      Order confirmation email will be sent to your registered account.
                    </p>

                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="w-full sm:w-auto py-3 px-8 bg-[#fb641b] hover:bg-[#e85a14] active:scale-[0.99] text-white font-bold text-sm rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      CONTINUE TO PAYMENT
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ================= STEP 3: PAYMENT OPTIONS ================= */}
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden transition-all">
              
              {/* Header */}
              <div 
                className={`p-4 sm:p-5 flex items-center justify-between transition-colors ${
                  activeStep === 3 ? 'bg-[#2874f0] text-white' : 'bg-gray-50 text-gray-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs sm:text-sm ${
                    activeStep === 3 ? 'bg-white text-[#2874f0]' : 'bg-gray-200 text-gray-600'
                  }`}>
                    3
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide">
                      Payment Options
                    </h2>
                    {activeStep === 3 && (
                      <p className="text-xs text-white/80 mt-0.5">
                        Select a secure payment method to place order
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Encrypted</span>
                </div>
              </div>

              {/* Step 3 Body (When Active) */}
              {activeStep === 3 && (
                <div className="p-4 sm:p-6 space-y-4">
                  
                  {/* OPTION A: UPI */}
                  <div className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'upi' ? 'border-[#2874f0] bg-blue-50/20' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="size-4 text-[#2874f0] focus:ring-[#2874f0]"
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-[#2874f0]" />
                          UPI (Google Pay, PhonePe, Paytm, Any UPI)
                        </span>
                        <div className="flex items-center gap-2">
                          <SiGooglepay className="text-xl text-gray-700" />
                          <SiPhonepe className="text-base text-purple-600" />
                          <SiPaytm className="text-lg text-blue-500" />
                        </div>
                      </div>
                    </label>

                    {paymentMethod === 'upi' && (
                      <div className="mt-4 pt-3 border-t border-gray-100 pl-7 space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'gpay', name: 'Google Pay', icon: SiGooglepay, color: 'text-gray-800' },
                            { id: 'phonepe', name: 'PhonePe', icon: SiPhonepe, color: 'text-purple-600' },
                            { id: 'paytm', name: 'Paytm UPI', icon: SiPaytm, color: 'text-blue-500' },
                            { id: 'custom', name: 'Other UPI ID', icon: QrCode, color: 'text-gray-600' },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setUpiOption(opt.id)}
                              className={`p-2.5 rounded-lg border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                                upiOption === opt.id
                                  ? 'border-[#2874f0] bg-blue-50 text-[#2874f0]'
                                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <opt.icon className={`text-xl ${opt.color}`} />
                              <span>{opt.name}</span>
                            </button>
                          ))}
                        </div>

                        {upiOption === 'custom' && (
                          <div className="pt-2">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Enter Virtual Payment Address (UPI ID)
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="e.g. yourname@okhdfcbank"
                                value={customUpiId}
                                onChange={(e) => setCustomUpiId(e.target.value)}
                                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              />
                            </div>
                            <p className="text-[11px] text-gray-500 mt-1">
                              A payment request will be sent to your UPI app.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* OPTION B: Credit / Debit / ATM Card */}
                  <div className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'card' ? 'border-[#2874f0] bg-blue-50/20' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="size-4 text-[#2874f0] focus:ring-[#2874f0]"
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#2874f0]" />
                          Credit / Debit / ATM Card
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                          <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px]">VISA</span>
                          <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px]">MasterCard</span>
                          <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px]">RuPay</span>
                        </div>
                      </div>
                    </label>

                    {paymentMethod === 'card' && (
                      <div className="mt-4 pt-3 border-t border-gray-100 pl-7 space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            placeholder="xxxx xxxx xxxx xxxx"
                            value={cardDetails.number}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm font-mono tracking-wider focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Valid Thru (MM/YY)</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              maxLength={5}
                              value={cardDetails.expiry}
                              onChange={handleExpiryChange}
                              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">CVV</label>
                            <input
                              type="password"
                              maxLength={4}
                              placeholder="***"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Name on Card</label>
                          <input
                            type="text"
                            placeholder="Name as printed on card"
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* OPTION C: Net Banking */}
                  <div className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'netbanking' ? 'border-[#2874f0] bg-blue-50/20' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'netbanking'}
                        onChange={() => setPaymentMethod('netbanking')}
                        className="size-4 text-[#2874f0] focus:ring-[#2874f0]"
                      />
                      <span className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#2874f0]" />
                        Net Banking
                      </span>
                    </label>

                    {paymentMethod === 'netbanking' && (
                      <div className="mt-4 pt-3 border-t border-gray-100 pl-7 space-y-3">
                        <label className="block text-xs font-semibold text-gray-700">Popular Banks</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'sbi', name: 'SBI' },
                            { id: 'hdfc', name: 'HDFC Bank' },
                            { id: 'icici', name: 'ICICI Bank' },
                            { id: 'axis', name: 'Axis Bank' },
                          ].map((b) => (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => setSelectedBank(b.id)}
                              className={`p-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                                selectedBank === b.id
                                  ? 'border-[#2874f0] bg-blue-50 text-[#2874f0]'
                                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {b.name}
                            </button>
                          ))}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Or choose another bank</label>
                          <select
                            value={selectedBank}
                            onChange={(e) => setSelectedBank(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                          >
                            <option value="sbi">State Bank of India</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="axis">Axis Bank</option>
                            <option value="kotak">Kotak Mahindra Bank</option>
                            <option value="pnb">Punjab National Bank</option>
                            <option value="bob">Bank of Baroda</option>
                            <option value="indusind">IndusInd Bank</option>
                            <option value="yes">Yes Bank</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* OPTION D: Cash on Delivery (COD) */}
                  <div className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'cod' ? 'border-[#2874f0] bg-blue-50/20' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="size-4 text-[#2874f0] focus:ring-[#2874f0]"
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-emerald-600" />
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Pay at Doorstep
                        </span>
                      </div>
                    </label>

                    {paymentMethod === 'cod' && (
                      <div className="mt-4 pt-3 border-t border-gray-100 pl-7 space-y-3">
                        <p className="text-xs text-gray-600">
                          Pay cash or UPI to the delivery courier upon arrival. To confirm your order, please enter the characters shown below.
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 border border-gray-300 px-3.5 py-1.5 rounded-md font-mono text-lg font-extrabold tracking-widest select-none text-gray-800">
                            {captchaCode}
                          </div>
                          <button
                            type="button"
                            onClick={refreshCaptcha}
                            className="p-2 text-gray-500 hover:text-gray-800 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                            title="Refresh captcha"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <input
                            type="text"
                            maxLength={3}
                            placeholder="Enter Code"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            className="w-28 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm font-mono tracking-widest text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* PLACE ORDER BUTTON */}
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      disabled={isPlacingOrder}
                      onClick={handlePlaceOrder}
                      className="w-full py-4 rounded-xl bg-[#fb641b] hover:bg-[#e85a14] active:scale-[0.99] text-white font-extrabold text-base sm:text-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {isPlacingOrder ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          PROCESSING YOUR ORDER...
                        </>
                      ) : (
                        <>
                          {paymentMethod === 'cod' ? (
                            <>
                              CONFIRM ORDER (CASH ON DELIVERY)
                              <ArrowRight className="w-5 h-5" />
                            </>
                          ) : (
                            <>
                              PAY {formatCurrency(totalAmount)}
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: Order & Price Summary Sidebar */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            
            {/* Price Details Card */}
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-5 sm:p-6 space-y-4">
              <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider pb-3 border-b border-gray-100">
                Price Details
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                <div className="flex justify-between items-center">
                  <span>Price ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(baseSubTotal)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Discount</span>
                  {totalDiscount > 0 ? (
                    <span className="font-bold text-emerald-600">-{formatCurrency(totalDiscount)}</span>
                  ) : (
                    <span className="text-gray-400">₹0.00</span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span>Delivery Charges</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400 line-through text-xs">₹70.00</span>
                    <span className="font-bold text-emerald-600 uppercase">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span>Packaging & Handling</span>
                  <span className="font-bold text-emerald-600 uppercase">FREE</span>
                </div>

                {tax > 0 && (
                  <div className="flex justify-between items-center">
                    <span>Estimated Tax (GST)</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(tax)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                  <span className="text-sm sm:text-base font-bold text-gray-900">Total Payable</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#2874f0]">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Total Savings Callout */}
              {totalDiscount > 0 && (
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold text-center border border-emerald-200">
                  You will save {formatCurrency(totalDiscount)} on this order! 🎉
                </div>
              )}
            </div>

            {/* Coupons Card */}
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <Tag className="w-4 h-4 text-[#2874f0]" />
                Have a Coupon Code?
              </div>

              {appliedCoupon ? (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-mono font-extrabold text-blue-800 text-xs">
                      {appliedCoupon.code}
                    </span>
                    <p className="text-[11px] text-gray-600 mt-0.5">
                      {appliedCoupon.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. QUICK50"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs uppercase font-mono tracking-wider focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    APPLY
                  </button>
                </form>
              )}
            </div>

            {/* Trust Assurances */}
            <div className="p-4 bg-gray-100/60 rounded-xl border border-gray-200 space-y-3 text-xs text-gray-600">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Original Products Guaranteed</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Free Express Contactless Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Safe and Secure Payments With 256-Bit SSL</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
