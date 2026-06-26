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

export default function Page() {
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

  useEffect(() => {
    fetchProductdetails();
  }, []);

  /* =========================
      LOADING SKELETON
  ========================== */

  if (loading) {
    return (
     <>
     <ProductSkeleton/>
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

              {/* Action Buttons (Flipkart Style) */}
              <div className="flex gap-2 w-full mt-4">
                <button
                  disabled={!product?.quantity > 0}
                  className="flex-1 py-4 bg-[#ff9f00] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base rounded-sm shadow-sm flex items-center justify-center gap-2"
                >
                  <FaShoppingCart className="text-lg" />
                  ADD TO CART
                </button>

                <button
                  disabled={!product?.quantity > 0}
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
              
              {/* Flipkart Assured equivalent badge (Optional Visual) */}
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

            {/* Offers Section (Simulated Flipkart layout) */}
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
                <button className="text-blue-600 text-sm font-semibold bg-white shadow-sm border border-gray-200 px-4 py-2 rounded-sm hover:shadow-md transition-all">
                  Rate Product
                </button>
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

        {/* =========================
            RECOMMENDATIONS ROW
        ========================== */}
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


// "use client";
// import Maincarosel from "@/components/Products/productdetailsComponents/HeroSection"
// import ProductListComponent from "@/components/UniversalComponnets/ProductListComponent/ProductListComponent";
// import { getProductDetailsById } from "@/redux-store/products/action";
// import { Rating, Slider } from "@mui/material";

// import { ProductionQuantityLimits, SearchOff } from "@mui/icons-material";
// import { useEffect, useState } from "react";
// import { FaCashRegister, FaHeadset, FaLocationArrow, FaMapMarked, FaRecycle, FaRupeeSign, FaStar, FaStore, FaTimes, FaTimesCircle, FaTruckPickup } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";

// import { useParams, useRouter } from "next/navigation";



// const products = [
//   {
//     id: 1,
//     brand: "Samsung",
//     name: "Galaxy S23 Ultra",
//     color: "Phantom Black",
//     price: 109999,
//     image: [
//       "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
//     ],
//     imageAlt: "Samsung Galaxy S23 Ultra front view",
//     Original_price: 124999,
//     discount: 12
//   },
//   {
//     id: 2,
//     brand: "Apple",
//     name: "iPhone 14",
//     color: "Midnight",
//     price: 69999,
//     image: [
//       "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
//     ],
//     imageAlt: "Apple iPhone 14 front view",
//     Original_price: 79999,
//     discount: 13
//   },
//   {
//     id: 3,
//     brand: "OnePlus",
//     name: "OnePlus 11R",
//     color: "Galactic Silver",
//     price: 39999,
//     image: [
//       "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
//     ],
//     imageAlt: "OnePlus 11R front view",
//     Original_price: 44999,
//     discount: 11
//   },
//   {
//     id: 4,
//     brand: "Xiaomi",
//     name: "Redmi Note 13 Pro",
//     color: "Arctic White",
//     price: 24999,
//     image: [
//       "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
//     ],
//     imageAlt: "Redmi Note 13 Pro front view",
//     Original_price: 27999,
//     discount: 10
//   },
//   {
//     id: 5,
//     brand: "Realme",
//     name: "Realme GT Neo 3",
//     color: "Nitro Blue",
//     price: 31999,
//     image: [
//       "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
//     ],
//     imageAlt: "Realme GT Neo 3 front view",
//     Original_price: 35999,
//     discount: 11
//   },
//   {
//     id: 6,
//     brand: "Vivo",
//     name: "Vivo V29 Pro",
//     color: "Himalayan Blue",
//     price: 38999,
//     image: [
//       "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
//     ],
//     imageAlt: "Vivo V29 Pro front view",
//     Original_price: 42999,
//     discount: 9
//   },
//   {
//     id: 7,
//     brand: "Oppo",
//     name: "Oppo Reno 10 Pro",
//     color: "Glossy Purple",
//     price: 36999,
//     image: [
//       "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
//     ],
//     imageAlt: "Oppo Reno 10 Pro front view",
//     Original_price: 40999,
//     discount: 10
//   },
//   {
//     id: 8,
//     brand: "Motorola",
//     name: "Moto Edge 40",
//     color: "Eclipse Black",
//     price: 29999,
//     image: [
//       "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
//     ],
//     imageAlt: "Moto Edge 40 front view",
//     Original_price: 32999,
//     discount: 9
//   },
//   {
//     id: 9,
//     brand: "Google",
//     name: "Pixel 7",
//     color: "Snow",
//     price: 59999,
//     image: [
//       "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
//     ],
//     imageAlt: "Google Pixel 7 front view",
//     Original_price: 64999,
//     discount: 8
//   }
// ];


// export default function page() {
//   const params = useParams();
//   const id = params.productid;
//   const dispatch = useDispatch();
// const router=useRouter();

//   const [fetch ,setFetch]=useState(false);
//   const product = useSelector((state) => state.ProductReducer.productdata);


//   const fetchProductdetails=async()=>{
//     setFetch(true);
//     try{
//      await dispatch(getProductDetailsById({ id }));
//     }
//     catch(e){

//     }finally{
//       setFetch(false);
//     }
//   }
//   useEffect(() => {
// fetchProductdetails();
//   }, []);

//   if (product &&fetch) {
//     return (
//       <>
//         <div className="bg-background grid grid-cols-1 mt-1 animate-pulse">

//           {/* Top Section */}
//           <div className="bg-background grid grid-cols-1 md:grid-cols-2 gap-4 h-full">

//             {/* Left - Image Skeleton */}
//             <div className="bg-gray-300 w-full h-[400px] rounded-lg" />

//             {/* Right - Product Info Skeleton */}
//             <div className="bg-background p-2 flex flex-col space-y-4">

//               <div className="h-6 w-40 bg-gray-300 rounded" />
//               <div className="h-6 w-60 bg-gray-200 rounded" />

//               <div className="h-8 w-20 bg-gray-300 rounded-full" />

//               <div className="h-6 w-48 bg-gray-300 rounded" />

//               {/* Delivery Section */}
//               <div className="space-y-3 mt-4">
//                 <div className="h-5 w-40 bg-gray-300 rounded" />
//                 <div className="h-10 w-full bg-gray-200 rounded" />
//                 <div className="h-10 w-full bg-gray-200 rounded" />
//                 <div className="h-10 w-full bg-gray-200 rounded" />
//               </div>

//               {/* Buttons */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//                 <div className="h-12 w-full bg-gray-300 rounded" />
//                 <div className="h-12 w-full bg-gray-400 rounded" />
//               </div>

//             </div>
//           </div>

//           <hr className="text-foreground/10 mt-10" />

//           {/* Features Section */}
//           <div className="grid grid-cols-3 mt-10 mb-10 p-4 gap-4">
//             <div className="h-16 bg-gray-200 rounded" />
//             <div className="h-16 bg-gray-200 rounded" />
//             <div className="h-16 bg-gray-200 rounded" />
//           </div>

//           <hr className="text-foreground/10 mt-1" />

//           {/* Similar Products Skeleton */}
//           <div className="mt-10 space-y-4">
//             <div className="h-8 w-48 bg-gray-300 rounded" />
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <div className="h-60 bg-gray-200 rounded" />
//               <div className="h-60 bg-gray-200 rounded" />
//               <div className="h-60 bg-gray-200 rounded" />
//               <div className="h-60 bg-gray-200 rounded" />
//             </div>
//           </div>

//           {/* Details Section */}
//           <div className="bg-background p-2 mt-10 space-y-4">
//             <div className="h-8 w-32 bg-gray-300 rounded" />
//             <div className="h-4 w-full bg-gray-200 rounded" />
//             <div className="h-4 w-full bg-gray-200 rounded" />
//             <div className="h-4 w-5/6 bg-gray-200 rounded" />
//             <div className="h-4 w-3/4 bg-gray-200 rounded" />
//           </div>

//           {/* Ratings Section */}
//           <div className="p-2 mt-5 bg-background space-y-6">
//             <div className="h-8 w-48 bg-gray-300 rounded" />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-3">
//                 <div className="h-5 w-32 bg-gray-300 rounded" />
//                 <div className="h-4 w-48 bg-gray-200 rounded" />
//               </div>

//               <div className="space-y-3">
//                 <div className="h-4 w-full bg-gray-200 rounded" />
//                 <div className="h-4 w-full bg-gray-200 rounded" />
//                 <div className="h-4 w-full bg-gray-200 rounded" />
//                 <div className="h-4 w-full bg-gray-200 rounded" />
//                 <div className="h-4 w-full bg-gray-200 rounded" />
//               </div>
//             </div>

//             <div className="h-12 w-full bg-gray-300 rounded" />
//           </div>

//         </div>

//         {/* Recently Viewed Skeleton */}
//         <div className="mt-10 space-y-4 animate-pulse">
//           <div className="h-8 w-48 bg-gray-300 rounded" />
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="h-60 bg-gray-200 rounded" />
//             <div className="h-60 bg-gray-200 rounded" />
//             <div className="h-60 bg-gray-200 rounded" />
//             <div className="h-60 bg-gray-200 rounded" />
//           </div>
//         </div>

//         {/* Best Products Skeleton */}
//         <div className="mt-10 space-y-4 animate-pulse">
//           <div className="h-8 w-48 bg-gray-300 rounded" />
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="h-60 bg-gray-200 rounded" />
//             <div className="h-60 bg-gray-200 rounded" />
//             <div className="h-60 bg-gray-200 rounded" />
//             <div className="h-60 bg-gray-200 rounded" />
//           </div>
//         </div>

//       </>
//     )
//   }
//   if (!fetch) {
//     return (
//       <>
//   <div className="min-h-[70vh] flex items-center justify-center bg-background px-6">
//         <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-sm p-10 max-w-lg w-full text-center transition-all duration-300">
          
//           {/* Modern Illustration Area */}
//           <div className="flex justify-center mb-8 relative">
//             <div className="bg-zinc-50 dark:bg-zinc-800 p-8 rounded-full relative ">
//               <SearchOff className="text-zinc-300 dark:text-zinc-600 w-20 h-20" />
//             </div>
//             {/* Subtle Decorative Yellow Ring */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-dashed border-yellow-400 rounded-full animate-[spin_10s_linear_infinite]" />
//           </div>
  
//           {/* Text Content */}
//           <div className="space-y-3">
//             <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
//               Sorry, no results found!
//             </h2>
//             <p className="text-muted-foreground text-sm md:text-base max-w-xs mx-auto leading-relaxed">
//               Please check the spelling or try searching for something else. We couldn't find what you’re looking for.
//             </p>
//           </div>
  
//           {/* Action Buttons */}
//           <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
//             <button 
//               onClick={() => router.push("/")}
//               className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase text-xs tracking-wider px-8 py-3.5 rounded-sm transition-all shadow-md active:scale-95"
//             >
//               Continue Shopping
//             </button>
            
//             <button 
//               onClick={() => window.location.reload()}
//               className="border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-foreground font-bold uppercase text-xs tracking-wider px-8 py-3.5 rounded-sm transition-all"
//             >
//               Clear Filters
//             </button>
//           </div>
  
//           {/* Helpful Hint */}
//           <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800">
//             <p className="text-[11px] text-zinc-400 uppercase font-semibold tracking-widest">
//               Need help? Contact our 24/7 Support
//             </p>
//           </div>
//         </div>
//       </div>
//       </>
//     );
//   }


//   return (
//     <>
//       <div className="bg-background grid grid-cols-1 mt-1 ">


//         <div className="bg-background  grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
//           <div className="bg-background ">
//             <Maincarosel product={product?.images} />
//           </div>
//           <div className="bg-background p-2 flex flex-col ">
//             <h1 className="text-xl font-bold text-foreground md:line-clamp-1 mb-2">{product?.brand}</h1>
//             <h1 className="text-xl text-foreground md:line-clamp-1">{product?.name}</h1>
//             <div>
//               <div className="flex gap-2 mt-2">
//                 <span className="text-sm cursor-pointer px-2 py-1 border border-foreground bg-foreground text-background rounded-full mr-2">{product.color}</span>
//               </div>
//               <p className="text-lg font-bold text-foreground mt-2">{product?.price} <span className="line-through text-sm font-normal text-gray-500 ml-2">{product.originalPrice}</span> <span className="text-green-600 text-sm font-bold ml-2">{product.discount}% OFF</span></p>
//               <div className="grid grid-cols-1 mt-4">
//                 <h1 className="text-md text-lg font-bold text-foreground "> Delivery Details</h1>
//                 <div className=" flex flex-col">
//                   <div className=" flex items-center gap-2 mt-2 bg-foreground/10 p-2 rounded">
//                     <FaMapMarked className="inline-block text-sm text-foreground mr-1" /> <p className="text-sm font-bold">Location Not Set</p>
//                   </div>
//                   <div className=" flex items-center gap-2 mt-2 bg-foreground/10 p-2 rounded">
//                     <FaTruckPickup className="inline-block text-sm text-foreground mr-1" /> <p className="text-sm font-bold">Delivery with in 2-3 days</p>
//                   </div>
//                   <div className=" flex items-center gap-2 mt-2 bg-foreground/10 p-2 rounded">
//                     <FaStore className="inline-block text-sm text-foreground mr-1" /> <p className="text-sm font-bold">Fulfilled by {product?.store}</p>
//                   </div>

//                 </div>
//               </div>
//             </div>


//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
//               <button className="bg-background cursor-pointer border-foreground/40 border hover:bg-foreground hover:text-background font-bold text-foreground px-4 py-2 rounded ">Add to Cart</button>
//               <button className="bg-yellow-500 cursor-pointer text-foreground px-4 py-2 rounded font-bold border-foreground/40   border">Buy Now</button>
//             </div>
//           </div>


//         </div>
//         <hr className="text-foreground/10 mt-10" />
//         <div className="grid grid-cols-3 mt-10 mb-10  p-4 rounded-lg text-center">
//           <div className="flex flex-col items-center justify-center gap-2 px-2">
//             <FaRecycle className="text-lg text-foreground" />
//             <p className="text-xs font-semibold leading-tight">
//               {product?.returnDay}-Day Return
//             </p>
//           </div>

//           <div className="flex flex-col items-center justify-center gap-2 px-2">
//             <FaRupeeSign className="text-lg text-foreground" />
//             <p className="text-xs font-semibold leading-tight">
//               Cash on Delivery
//             </p>
//           </div>

//           <div className="flex flex-col items-center justify-center gap-2 px-2">
//             <FaHeadset className="text-lg text-foreground" />
//             <p className="text-xs font-semibold leading-tight">
//               24×7 Customer Support
//             </p>
//           </div>

//         </div>

//         <hr className="text-foreground/10 mt-1" />


//         <ProductListComponent SectionName={"Similar Products"} products={products} Link={"/products/10"} />

//         <div className="bg-background p-2 mt-10 ">
//           <div className="md:p-5  ">
//             <h1 className="text-2xl font-extrabold">Details</h1>
//             <div className="flex flex-col">
//               <p className="text-foreground text-sm mt-2 text-justify">{product?.description}</p>
//               <div>
//                 {product?.specifications && Object.entries(product?.specifications).length > 0 && (
//                   <div>
//                     {Object.entries(product?.specifications).map(([key, value], index) => (
//                       <div key={index} className="flex gap-2 mt-2">
//                         <h1 className="text-sm font-bold text-foreground">{key}:</h1>
//                         <p className="text-sm text-foreground">{value?.toString()}</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-2 mt-5 bg-background">
//           <h1 className="font-extrabold text-2xl md:p-5">
//             Rating & Reviews
//           </h1>

//           <div className="md:p-5 grid grid-cols-1 md:grid-cols-2 gap-6 py-2">

//             {/* Left Side - Overall Rating */}
//             <div className="flex flex-col gap-2">
//               <Rating name="read-only" value={4.2} precision={0.1} readOnly />
//               <p className="text-sm text-muted-foreground">
//                 2,000 ratings & 2,000 reviews
//               </p>
//             </div>

//             {/* Right Side - Rating Breakdown */}
//             <div className="flex flex-col gap-3">

//               {[5, 4, 3, 2, 1].map((star) => (
//                 <div key={star} className="flex items-center gap-3">

//                   {/* Star Number */}
//                   <div className="flex items-center gap-1 w-10">
//                     <span>{star}</span>
//                     <FaStar className="text-yellow-500 text-sm" />
//                   </div>

//                   {/* Progress Bar */}
//                   <div className="flex-1">
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className="bg-yellow-500 h-2 rounded-full"
//                       ></div>
//                     </div>
//                   </div>

//                   {/* Percentage */}
//                   <span className="text-sm text-muted-foreground w-10 text-right">
//                     60%
//                   </span>
//                 </div>
//               ))}

//             </div>


//           </div>
//           <div className=" flex items-center justify-center">
//             <button className="bg-background border-foreground/40  cursor-pointer w-full mt-4 border hover:bg-foreground hover:text-background font-bold text-foreground p-4 rounded transition-colors duration-200">View Reviews</button>
//           </div>
//         </div>
//       </div>
//       <ProductListComponent SectionName={"Recently Viewed"} products={products} Link={"/products/10"} />

//       <ProductListComponent SectionName={"Best Products"} products={products} Link={"/products/10"} />
//     </>
//   )
// }
