"use client";

import Maincarosel from "@/components/Products/productdetailsComponents/HeroSection";
import ProductListComponent from "@/components/UniversalComponnets/ProductListComponent/ProductListComponent";
import { getProductDetailsById } from "@/redux-store/products/action";

import { Rating } from "@mui/material";
import { SearchOff } from "@mui/icons-material";

import { useEffect, useState } from "react";

import {
  FaHeadset,
  FaMapMarkedAlt,
  FaRecycle,
  FaRupeeSign,
  FaStar,
  FaStore,
  FaTruck,
  FaShoppingCart,
  FaBolt,
  FaTag
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import ProductSkeleton from "@/components/Products/Skleton/ProductdetailsSkelton";
import { AddToCartRequest } from "@/redux-store/cart/action";
import Cookies from "js-cookie";

export default function ProductDetailsClient() {
  const params = useParams();
  const id = params.productid;

  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const product = useSelector(
    (state) => state.ProductReducer.productdata
  );

  const products = [];

  const fetchProductdetails = async () => {
    setLoading(true);

    try {
      await dispatch(getProductDetailsById({ id }));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const addToCart = async () => {
    const token = Cookies.get("usertoken");
    await dispatch(AddToCartRequest({ id, usertoken: token }));
  };

  const BuyNow = async () => {
    const token = Cookies.get("usertoken");
    await dispatch(AddToCartRequest({ id, usertoken: token }));
  };

  useEffect(() => {
    fetchProductdetails();
  }, [id]);

  /* =========================
      LOADING SKELETON
  ========================== */

  if (loading) {
    return (
      <>
        <ProductSkeleton />
      </>
    );
  }

  /* =========================
      NO PRODUCT FOUND
  ========================== */

  if (!product || !product?.id) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-100 px-6">
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-10 max-w-lg w-full text-center">
          <div className="flex justify-center mb-6 relative">
            <div className="bg-gray-50 p-6 rounded-full">
              <SearchOff className="text-gray-400 w-16 h-16" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-500 mb-8">
            The item you are looking for is currently unavailable or does not exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/")}
              className="bg-[#2874f0] hover:bg-[#1b63d9] text-white font-semibold px-8 py-3 rounded-sm shadow-sm"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.location.reload()}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3 rounded-sm"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto pt-4 px-2 sm:px-4">
        
        {/* =========================
            MAIN PRODUCT CARD
        ========================== */}
        <div className="bg-white rounded-sm shadow-sm flex flex-col md:flex-row">
          
          {/* LEFT COLUMN: Image & CTAs */}
          <div className="w-full md:w-[40%] lg:w-[45%] p-4 flex flex-col relative border-r border-gray-100">
            <div className="sticky top-20">
              
              {/* Product Carousel */}
              <div className="border border-gray-100 rounded-sm p-2 mb-4">
                <Maincarosel product={product?.images || []} />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 w-full mt-4">
                <button
                  disabled={!product?.quantity > 0}
                  onClick={addToCart}
                  className="flex-1 py-4 bg-[#ff9f00] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base rounded-sm shadow-sm flex items-center justify-center gap-2"
                >
                  <FaShoppingCart className="text-lg" />
                  ADD TO CART
                </button>

                <button
                  disabled={!product?.quantity > 0}
                  onClick={BuyNow}
                  className="flex-1 py-4 bg-[#fb641b] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base rounded-sm shadow-sm flex items-center justify-center gap-2"
                >
                  <FaBolt className="text-lg" />
                  BUY NOW
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Product Details */}
          <div className="w-full md:w-[60%] lg:w-[55%] p-4 sm:p-6 lg:p-8 text-gray-800">
            
            {/* Breadcrumbs / Category */}
            <div className="text-xs text-gray-500 mb-2 flex items-center gap-1 font-medium">
              <span>Home</span> {'>'} <span>Brand</span> {'>'} <span className="font-semibold text-gray-800">{product?.brand}</span>
            </div>

            {/* Title */}
            <h1 className="text-lg sm:text-xl font-medium leading-snug">
              {product?.name}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 bg-[#388e3c] text-white px-2 py-0.5 rounded-sm text-xs font-bold shadow-sm">
                <span>{product?.averageRating || 0}</span>
                <FaStar className="text-[10px]" />
              </div>
              <span className="text-sm text-gray-500 font-medium">
                {product?.totalReviews || 0} Ratings & Reviews
              </span>
              
              <span className="ml-2 italic text-blue-600 font-bold text-xs bg-blue-50 px-2 py-0.5 rounded-full">
                ✓ Assured
              </span>
            </div>

            {/* Price Section */}
            <div className="mt-4 flex items-end gap-3">
              <h1 className="text-3xl font-semibold text-black">
                ₹{product?.price}
              </h1>
              {product?.originalPrice && (
                <span className="line-through text-gray-500 text-base font-medium mb-1">
                  ₹{product?.originalPrice}
                </span>
              )}
              {product?.discountPercentage > 0 && (
                <span className="text-[#388e3c] text-sm font-bold mb-1">
                  {product?.discountPercentage}% off
                </span>
              )}
            </div>

            {/* Out of stock warning */}
            {product?.quantity <= 0 && (
              <div className="mt-2 text-red-600 font-medium text-sm">
                Currently Out of Stock
              </div>
            )}

            {/* Offers Section */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3">Available offers</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <FaTag className="text-[#388e3c] mt-1 shrink-0" size={12} />
                  <span><strong className="font-semibold">Bank Offer:</strong> 5% Cashback on Axis Bank Card <span className="text-blue-600 cursor-pointer">T&C</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <FaTag className="text-[#388e3c] mt-1 shrink-0" size={12} />
                  <span><strong className="font-semibold">Special Price:</strong> Get extra 10% off (price inclusive of cashback/coupon) <span className="text-blue-600 cursor-pointer">T&C</span></span>
                </li>
              </ul>
            </div>

            {/* Divider */}
            <hr className="my-6 border-gray-200" />

            {/* Highlights & Services */}
            <div className="grid grid-cols-12 gap-4 text-sm">
              
              {/* Warranty / Services */}
              <div className="col-span-4 text-gray-500 font-medium">Services</div>
              <div className="col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <FaRecycle className="text-blue-600 text-lg" />
                  <span>{product?.returnDay || 7} Days Return Policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRupeeSign className="text-blue-600 text-lg" />
                  <span>Cash on Delivery available</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaHeadset className="text-blue-600 text-lg" />
                  <span>24×7 Customer Support</span>
                </div>
              </div>

              {/* Delivery */}
              <div className="col-span-4 text-gray-500 font-medium mt-4">Delivery</div>
              <div className="col-span-8 mt-4">
                <div className="flex items-center gap-2">
                  <FaTruck className="text-gray-600" />
                  <span className="font-semibold border-b border-dashed border-gray-400 cursor-pointer">Delivery in {product?.deliveryDays || 3} Days</span>
                </div>
              </div>

              {/* Color Selection */}
              {product?.color && (
                <>
                  <div className="col-span-4 text-gray-500 font-medium mt-4">Color</div>
                  <div className="col-span-8 mt-4">
                    <div className="inline-flex items-center gap-2 border-2 border-blue-500 p-1 px-3 rounded-sm cursor-pointer bg-blue-50">
                      <div className="w-4 h-4 rounded-full bg-gray-800 shadow-sm border border-white" style={{backgroundColor: product.color.toLowerCase()}}></div>
                      <span className="font-medium text-sm">{product?.color}</span>
                    </div>
                  </div>
                </>
              )}
              
              {/* Seller */}
              <div className="col-span-4 text-gray-500 font-medium mt-4">Seller</div>
              <div className="col-span-8 mt-4 text-blue-600 font-medium cursor-pointer flex items-center gap-2">
                <FaStore className="text-gray-600" />
                Seller ID: {product?.sellerId}
              </div>
            </div>

            {/* Divider */}
            <hr className="my-6 border-gray-200" />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Product Description</h3>
              <p className="text-sm leading-relaxed text-gray-700 text-justify">
                {product?.description}
              </p>
            </div>

            {/* Divider */}
            <hr className="my-6 border-gray-200" />

            {/* Specifications Table */}
            {product?.specifications && Object.entries(product?.specifications).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="border border-gray-200 rounded-sm text-sm">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-medium text-gray-700">
                    General Details
                  </div>
                  <div className="divide-y divide-gray-100">
                    {Object.entries(product?.specifications).map(([key, value], index) => (
                      <div key={index} className="grid grid-cols-12 px-4 py-3">
                        <div className="col-span-4 text-gray-500 capitalize">{key}</div>
                        <div className="col-span-8 text-gray-800 break-words">{String(value)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Divider */}
            <hr className="my-6 border-gray-200" />

            {/* Ratings & Reviews */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
                <span>Ratings & Reviews</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => router.push(`/products/reviews?productId=${id}`)}
                    className="text-gray-700 text-xs sm:text-sm font-semibold bg-white shadow-sm border border-gray-200 px-3 py-1.5 rounded-sm hover:shadow-md transition-all"
                  >
                    All Reviews
                  </button>
                  <button
                    onClick={() => router.push(`/products/reviews?productId=${id}&write=true`)}
                    className="text-blue-600 text-xs sm:text-sm font-semibold bg-white shadow-sm border border-gray-200 px-3 py-1.5 rounded-sm hover:shadow-md transition-all"
                  >
                    Rate Product
                  </button>
                </div>
              </h3>
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mt-6">
                
                {/* Big Score */}
                <div className="text-center sm:w-1/3">
                  <div className="text-4xl font-semibold flex items-center justify-center gap-1">
                    {product?.averageRating || 0} <FaStar className="text-gray-300 text-3xl" />
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    {product?.totalReviews || 0} Ratings &<br/> {Math.floor((product?.totalReviews || 0) * 0.4)} Reviews
                  </p>
                </div>

                {/* Progress Bars */}
                <div className="flex-1 w-full space-y-2 border-l border-gray-200 pl-8">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-3 text-xs font-medium">
                      <div className="flex items-center gap-1 w-6">
                        {star} <FaStar className="text-gray-400 text-[10px]" />
                      </div>
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${star >= 4 ? 'bg-[#388e3c]' : star === 3 ? 'bg-[#ff9f00]' : 'bg-[#ff6161]'}`} 
                          style={{ width: `${star * 15}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RECOMMENDATIONS ROW */}
        <div className="mt-6 space-y-4">
          <div className="bg-white p-4 shadow-sm rounded-sm">
            <ProductListComponent
              SectionName={"Similar Products"}
              products={products}
              Link={"/products/10"}
            />
          </div>

          <div className="bg-white p-4 shadow-sm rounded-sm">
            <ProductListComponent
              SectionName={"Recently Viewed"}
              products={products}
              Link={"/products/10"}
            />
          </div>

          <div className="bg-white p-4 shadow-sm rounded-sm">
            <ProductListComponent
              SectionName={"Best Products"}
              products={products}
              Link={"/products/10"}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
