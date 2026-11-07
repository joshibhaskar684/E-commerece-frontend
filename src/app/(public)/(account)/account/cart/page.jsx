'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { 
  FaMinus, 
  FaPlus, 
  FaTrash, 
  FaShieldAlt, 
  FaTruck, 
  FaUndo, 
  FaArrowRight, 
  FaShoppingBag 
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import NoItemFound from '@/components/Cart/NoItemFound';
import { 
  GetCartRequest, 
  UpdateCartItemRequest, 
  RemoveCartItemRequest, 
  ClearCartRequest 
} from '@/redux-store/cart/action';

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

// Robust extractor for cart items array from any response shape
const extractItems = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.items)) return data.items;
  if (data.data && Array.isArray(data.data.items)) return data.data.items;
  if (Array.isArray(data.data)) return data.data;
  if (data.cart && Array.isArray(data.cart.items)) return data.cart.items;
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      return extractItems(parsed);
    } catch {
      return [];
    }
  }
  return [];
};

// Robust extractor for summary object
const extractSummary = (data) => {
  if (!data) return null;
  if (data.summary) return data.summary;
  if (data.data?.summary) return data.data.summary;
  if (data.cart?.summary) return data.cart.summary;
  return null;
};

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const reduxCartData = useSelector((state) => state?.CartReducer?.cartdata);
  const isGlobalLoading = useSelector((state) => state?.CartReducer?.isLoading);

  const [localCartData, setLocalCartData] = useState(null);
  const [productStocks, setProductStocks] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState({});
  const [isClearing, setIsClearing] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Initial fetch of user's cart
  useEffect(() => {
    const usertoken = Cookies.get('usertoken');
    if (usertoken) {
      dispatch(GetCartRequest({ usertoken }))
        .then((res) => {
          if (res?.data) {
            setLocalCartData(res.data);
          }
        })
        .finally(() => {
          setInitialLoading(false);
        });
    } else {
      setInitialLoading(false);
    }
  }, [dispatch]);

  // Sync redux state into local state whenever redux state updates
  useEffect(() => {
    if (reduxCartData) {
      setLocalCartData(reduxCartData);
    }
  }, [reduxCartData]);

  const activeCart = localCartData || reduxCartData;
  const items = extractItems(activeCart);
  const summary = extractSummary(activeCart);

  // Fetch available stock for items in cart so the UI can enforce stock limits
  useEffect(() => {
    const fetchStocks = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      for (const item of items) {
        const pId = item?.productId || item?.id || item?._id;
        if (pId && productStocks[pId] === undefined) {
          try {
            const res = await axios.get(`${backendUrl}/products/${pId}`);
            if (res.data?.quantity !== undefined) {
              setProductStocks((prev) => ({ ...prev, [pId]: res.data.quantity }));
            }
          } catch (e) {
            console.error('Could not fetch stock for product', pId, e);
          }
        }
      }
    };

    if (items && items.length > 0) {
      fetchStocks();
    }
  }, [items]);

  // Calculations for summary with fallback to items
  const calculatedSubtotal = items.reduce((acc, item) => {
    const price = getSafePrice(item?.price ?? item?.priceAtAddTime);
    const qty = item?.quantity || 1;
    return acc + price * qty;
  }, 0);

  const subTotal = summary?.subTotal !== undefined ? summary.subTotal : calculatedSubtotal;
  const discount = summary?.discount || 0;
  const deliveryFee = summary?.deliveryFee || 0;
  const tax = summary?.tax !== undefined ? summary.tax : 0;
  const totalAmount = summary?.totalAmount !== undefined 
    ? summary.totalAmount 
    : subTotal - discount + deliveryFee + tax;

  const totalItemCount = items.reduce((acc, item) => acc + (item?.quantity || 1), 0);

  // 1. Update item quantity (+ / -) with strict stock limit and rollback on failure
  const handleQuantity = async (productId, currentQuantity, changeType) => {
    const usertoken = Cookies.get('usertoken');
    if (!usertoken) {
      toast.error('Please login first to update cart');
      return;
    }

    const maxStock = productStocks[productId];

    // Prevent increment if known stock limit is reached
    if (changeType === 'inc' && maxStock !== undefined && currentQuantity >= maxStock) {
      toast.warn(`Cannot add more. Only ${maxStock} items available in stock.`);
      return;
    }

    const newQuantity = changeType === 'inc' ? currentQuantity + 1 : currentQuantity - 1;

    if (newQuantity < 1) {
      handleRemove(productId);
      return;
    }

    // Capture previous cart state for reverting on error
    const previousCart = localCartData || reduxCartData;

    // Optimistic UI update
    setLocalCartData((prev) => {
      if (!prev) return prev;
      const currentItems = extractItems(prev);
      const updatedItems = currentItems.map((i) => {
        const pId = i.productId || i.id || i._id;
        return pId === productId ? { ...i, quantity: newQuantity } : i;
      });
      return {
        ...prev,
        items: updatedItems,
      };
    });

    setUpdatingItems((prev) => ({ ...prev, [productId]: true }));
    try {
      const res = await dispatch(
        UpdateCartItemRequest({
          productId,
          quantity: newQuantity,
          usertoken,
        })
      );

      if (res?.success && res?.data) {
        setLocalCartData(res.data);
      } else {
        // Revert optimistic update immediately on failure
        setLocalCartData(previousCart);
        // If error indicates insufficient stock, record current quantity as max stock
        if (res?.error && res.error.toLowerCase().includes('stock')) {
          setProductStocks((prev) => ({ ...prev, [productId]: currentQuantity }));
        }
        // Sync with backend authoritative cart state
        const refreshRes = await dispatch(GetCartRequest({ usertoken }));
        if (refreshRes?.data) {
          setLocalCartData(refreshRes.data);
        }
      }
    } catch (err) {
      // Revert optimistic update immediately on error
      setLocalCartData(previousCart);
      const refreshRes = await dispatch(GetCartRequest({ usertoken }));
      if (refreshRes?.data) {
        setLocalCartData(refreshRes.data);
      }
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // 2. Remove single item from cart
  const handleRemove = async (productId) => {
    const usertoken = Cookies.get('usertoken');
    if (!usertoken) {
      toast.error('Please login first to modify cart');
      return;
    }

    const previousCart = localCartData || reduxCartData;

    // Optimistic remove
    setLocalCartData((prev) => {
      if (!prev) return prev;
      const currentItems = extractItems(prev);
      const updatedItems = currentItems.filter((i) => {
        const pId = i.productId || i.id || i._id;
        return pId !== productId;
      });
      return {
        ...prev,
        items: updatedItems,
      };
    });

    setUpdatingItems((prev) => ({ ...prev, [productId]: true }));
    try {
      const res = await dispatch(
        RemoveCartItemRequest({
          productId,
          usertoken,
        })
      );
      if (res?.data) {
        setLocalCartData(res.data);
      } else {
        setLocalCartData(previousCart);
      }
    } catch (err) {
      setLocalCartData(previousCart);
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // 3. Clear entire cart
  const handleClearCart = async () => {
    const usertoken = Cookies.get('usertoken');
    if (!usertoken) return;

    if (!window.confirm('Are you sure you want to clear your cart?')) return;

    setIsClearing(true);
    try {
      const res = await dispatch(ClearCartRequest({ usertoken }));
      if (res?.data) {
        setLocalCartData(res.data);
      } else {
        setLocalCartData({ items: [], summary: { subTotal: 0, discount: 0, deliveryFee: 0, tax: 0, totalAmount: 0 } });
      }
    } finally {
      setIsClearing(false);
    }
  };

  // 4. Handle checkout
  const handleCheckOut = () => {
    const usertoken = Cookies.get('usertoken');
    if (!usertoken) {
      toast.error('Please log in first to proceed to checkout');
      return;
    }
    if (items.length === 0) {
      toast.warn('Your cart is empty');
      return;
    }

    setIsCheckingOut(true);
    toast.info('Proceeding to checkout...');
    setTimeout(() => {
      setIsCheckingOut(false);
      router.push('/account/orders');
    }, 1200);
  };

  // Loading skeleton state
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-36 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
            <div className="w-full lg:w-1/3">
              <div className="h-72 bg-gray-200 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (!items || items.length === 0) {
    return <NoItemFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
              <FaShoppingBag className="text-[#2874f0] text-2xl" />
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClearCart}
              disabled={isClearing || isGlobalLoading}
              className="text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              <FaTrash size={12} />
              {isClearing ? 'Clearing...' : 'Clear Cart'}
            </button>
            <Link
              href="/products"
              className="text-xs sm:text-sm font-semibold text-[#2874f0] hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Layout: Items column + Order Summary column */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          
          {/* Cart Items Container */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            {items.map((item, index) => {
              const productId = item?.productId || item?.id || item?._id || `cart-item-${index}`;
              const itemQuantity = item?.quantity || 1;
              const unitPrice = getSafePrice(item?.price ?? item?.priceAtAddTime);
              const itemTotal = unitPrice * itemQuantity;
              const isUpdating = !!updatingItems[productId];
              const imageSrc = item?.productImage || item?.imageSrc || item?.images?.[0] || '/placeholder-image.jpg';
              const productName = item?.productName || item?.name || 'Quick Product';
              const maxStock = productStocks[productId];
              const isMaxStockReached = maxStock !== undefined && itemQuantity >= maxStock;

              return (
                <div 
                  key={productId}
                  className="group relative flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {/* Product Image */}
                  <Link 
                    href={item?.productId ? `/products/${item.productId}` : '#'}
                    className="relative w-full sm:w-32 md:w-36 aspect-square sm:aspect-auto sm:h-32 md:h-36 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-2"
                  >
                    <img 
                      src={imageSrc} 
                      alt={productName} 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex flex-col flex-1 min-w-0 justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        {/* Title & Unit Price */}
                        <div className="min-w-0 flex-1">
                          <Link
                            href={item?.productId ? `/products/${item.productId}` : '#'}
                            className="text-base sm:text-lg font-semibold text-gray-800 hover:text-[#2874f0] transition-colors break-words line-clamp-2"
                          >
                            {productName}
                          </Link>
                          
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-sm text-gray-500">Unit Price:</span>
                            <span className="text-base font-bold text-gray-900">
                              {formatCurrency(unitPrice)}
                            </span>
                          </div>

                          {/* Stock status indicator */}
                          {maxStock !== undefined && (
                            <div className="mt-1">
                              {isMaxStockReached ? (
                                <span className="inline-flex items-center text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                  Max stock available ({maxStock}) reached
                                </span>
                              ) : (
                                <span className="text-xs text-gray-500">
                                  {maxStock} available in stock
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {/* Remove Button */}
                        <button 
                          onClick={() => handleRemove(productId)}
                          disabled={isUpdating}
                          className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors focus:outline-none disabled:opacity-50 cursor-pointer"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <FaTrash size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Row: Quantity Controls & Subtotal */}
                    <div className="flex flex-wrap justify-between items-center gap-4 mt-4 pt-3 border-t border-gray-100">
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-medium">Qty:</span>
                        <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 shadow-xs">
                          <button 
                            onClick={() => handleQuantity(productId, itemQuantity, 'dec')}
                            disabled={isUpdating}
                            className="p-2 text-gray-600 hover:text-black hover:bg-gray-200 transition-colors disabled:opacity-40 rounded-l-md cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <FaMinus size={11} />
                          </button>
                          
                          <span className="text-sm font-semibold w-9 text-center text-gray-900 select-none">
                            {isUpdating ? (
                              <span className="inline-block animate-spin text-xs">⌛</span>
                            ) : (
                              itemQuantity
                            )}
                          </span>

                          <button 
                            onClick={() => handleQuantity(productId, itemQuantity, 'inc')}
                            disabled={isUpdating || isMaxStockReached}
                            className={`p-2 transition-colors rounded-r-md ${
                              isMaxStockReached 
                                ? 'text-gray-300 cursor-not-allowed bg-gray-100' 
                                : 'text-gray-600 hover:text-black hover:bg-gray-200 cursor-pointer'
                            }`}
                            title={isMaxStockReached ? `Maximum available stock (${maxStock}) reached` : 'Increase quantity'}
                            aria-label="Increase quantity"
                          >
                            <FaPlus size={11} />
                          </button>
                        </div>
                      </div>

                      {/* Item Total Price */}
                      <div className="text-right">
                        <span className="text-xs text-gray-500 block">Subtotal:</span>
                        <p className="font-bold text-base sm:text-lg text-gray-900">
                          {formatCurrency(itemTotal)}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-24">
            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm flex flex-col gap-5">
              
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
                Order Summary
              </h2>
              
              <div className="flex flex-col gap-3.5 text-sm text-gray-700">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price ({totalItemCount} items)</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(subTotal)}</span>
                </div>

                {/* Discount */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Discount</span>
                  {discount > 0 ? (
                    <span className="text-[#388e3c] font-semibold">-{formatCurrency(discount)}</span>
                  ) : (
                    <span className="text-gray-500 font-medium">-₹0.00</span>
                  )}
                </div>

                {/* Delivery Fee */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Delivery Charges</span>
                  {deliveryFee > 0 ? (
                    <span className="font-semibold text-gray-900">{formatCurrency(deliveryFee)}</span>
                  ) : (
                    <span className="text-[#388e3c] font-bold">FREE</span>
                  )}
                </div>

                {/* Tax (GST) */}
                {tax > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Taxes & GST</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(tax)}</span>
                  </div>
                )}
                
                <hr className="border-gray-200 my-1" />
                
                {/* Total Price */}
                <div className="flex justify-between items-baseline gap-2 pt-1">
                  <span className="text-base sm:text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#2874f0]">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>

                {/* Savings message */}
                {discount > 0 && (
                  <div className="bg-green-50 text-[#388e3c] text-xs sm:text-sm font-semibold p-2.5 rounded-md text-center mt-1">
                    You will save {formatCurrency(discount)} on this order!
                  </div>
                )}
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckOut}
                disabled={isCheckingOut || totalAmount <= 0}
                className="w-full py-4 rounded-lg bg-[#fb641b] hover:bg-[#e85a14] active:scale-[0.99] text-white font-bold text-base sm:text-lg shadow-sm hover:shadow-md flex justify-center items-center gap-2 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
              >
                {isCheckingOut ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <FaArrowRight size={14} />
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="border-t border-gray-100 pt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-gray-500 font-medium">
                <div className="flex flex-col items-center gap-1">
                  <FaShieldAlt className="text-blue-600 text-base" />
                  <span>100% Safe Payments</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <FaTruck className="text-blue-600 text-base" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <FaUndo className="text-blue-600 text-base" />
                  <span>7 Days Return</span>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
