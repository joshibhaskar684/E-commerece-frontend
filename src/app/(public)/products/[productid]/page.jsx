

"use client";

import Maincarosel from "@/components/Products/productdetailsComponents/HeroSection";
import ProductListComponent from "@/components/UniversalComponnets/ProductListComponent/ProductListComponent";
import { getProductDetailsById } from "@/redux-store/products/action";

import { Rating } from "@mui/material";
import { SearchOff } from "@mui/icons-material";

import { useEffect, useState } from "react";

import {
  FaHeadset,
  FaMapMarked,
  FaRecycle,
  FaRupeeSign,
  FaStar,
  FaStore,
  FaTruckPickup,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";

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
      LOADING
  ========================== */

  if (loading) {
    return (
      <div className="min-h-screen animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="h-[450px] bg-gray-200 rounded-lg" />

          <div className="space-y-4">
            <div className="h-6 w-40 bg-gray-200 rounded" />
            <div className="h-8 w-72 bg-gray-200 rounded" />
            <div className="h-10 w-48 bg-gray-200 rounded" />

            <div className="space-y-3 pt-5">
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-5">
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
      NO PRODUCT
  ========================== */

  if (!product || !product?.id) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-background px-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-sm p-10 max-w-lg w-full text-center">

          <div className="flex justify-center mb-8 relative">
            <div className="bg-zinc-50 dark:bg-zinc-800 p-8 rounded-full">
              <SearchOff className="text-zinc-300 dark:text-zinc-600 w-20 h-20" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Product Not Found
            </h2>

            <p className="text-muted-foreground text-sm md:text-base">
              The product you are looking for does not exist.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push("/")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase text-xs tracking-wider px-8 py-3.5 rounded-sm"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => window.location.reload()}
              className="border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-foreground font-bold uppercase text-xs tracking-wider px-8 py-3.5 rounded-sm"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
<div className="bg-background mt-2">

  {/* =========================
      HERO SECTION
  ========================== */}

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-10">

    {/* LEFT */}
    <div className="w-full">
      <div className="sticky top-20">
        <Maincarosel product={product?.images || []} />
      </div>
    </div>

    {/* RIGHT */}
    <div className="flex flex-col">

      {/* CATEGORY + STOCK */}
      <div className="flex flex-wrap items-center gap-3 mb-4">

        <span className="bg-blue-500/10 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
          {product?.brand}
        </span>

        {product?.quantity>0 ? (
          <span className="bg-green-500/10 text-green-600 px-4 py-1.5 rounded-full text-xs font-bold">
            In Stock
          </span>
        ) : (
          <span className="bg-red-500/10 text-red-500 px-4 py-1.5 rounded-full text-xs font-bold">
            Out of Stock
          </span>
        )}
      </div>

      {/* PRODUCT NAME */}
      <h1 className="text-2xl sm:text-3xl xl:text-4xl font-black leading-tight text-foreground">
        {product?.name}
      </h1>

      {/* SLUG */}
      {product?.slug && (
        <p className="text-muted-foreground mt-2 text-sm">
          #{product?.slug}
        </p>
      )}

      {/* RATINGS */}
      <div className="flex flex-wrap items-center gap-3 mt-5">

        <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1.5 rounded-full font-bold shadow-sm">
          <span>{product?.averageRating || 0}</span>
          <FaStar className="text-sm" />
        </div>

        <Rating
          value={product?.averageRating || 0}
          precision={0.1}
          readOnly
        />

        <span className="text-sm text-muted-foreground">
          {product?.totalReviews || 0} Reviews
        </span>
      </div>

      {/* PRICE */}
      <div className="mt-6 flex flex-wrap items-end gap-3">

        <h1 className="text-4xl sm:text-5xl font-black text-foreground">
          ₹{product?.price}
        </h1>

        {product?.originalPrice && (
          <span className="line-through text-muted-foreground text-lg sm:text-xl">
            ₹{product?.originalPrice}
          </span>
        )}

        {product?.discountPercentage > 0 && (
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow">
            {product?.discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* COLOR */}
      {product?.color && (
        <div className="mt-6">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
            Color
          </h3>

          <div className="inline-flex items-center gap-2 bg-background border border-foreground/10 px-4 py-2 rounded-2xl shadow-sm">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500"></div>
            <span className="font-semibold text-sm">
              {product?.color}
            </span>
          </div>
        </div>
      )}

      {/* DELIVERY CARDS */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* CARD */}
        <div className="bg-blue-500/10 border border-blue-500/10 rounded-2xl p-4 flex gap-4 hover:shadow-lg transition-all">

          <div className="bg-blue-500 text-white p-3 rounded-xl h-fit">
            <FaTruckPickup className="text-lg" />
          </div>

          <div>
            <h3 className="font-bold text-foreground text-sm sm:text-base">
              Fast Delivery
            </h3>

            <p className="text-sm text-muted-foreground mt-1">
              Delivery within {product?.deliveryDays || 3} days
            </p>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-green-500/10 border border-green-500/10 rounded-2xl p-4 flex gap-4 hover:shadow-lg transition-all">

          <div className="bg-green-500 text-white p-3 rounded-xl h-fit">
            <FaRecycle className="text-lg" />
          </div>

          <div>
            <h3 className="font-bold text-foreground text-sm sm:text-base">
              Easy Returns
            </h3>

            <p className="text-sm text-muted-foreground mt-1">
              {product?.returnDay || 0} Days Return Policy
            </p>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-yellow-500/10 border border-yellow-500/10 rounded-2xl p-4 flex gap-4 hover:shadow-lg transition-all">

          <div className="bg-yellow-500 text-black p-3 rounded-xl h-fit">
            <FaRupeeSign className="text-lg" />
          </div>

          <div>
            <h3 className="font-bold text-foreground text-sm sm:text-base">
              Payment Options
            </h3>

            <p className="text-sm text-muted-foreground mt-1">
              Cash on Delivery Available
            </p>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-4 flex gap-4 hover:shadow-lg transition-all">

          <div className="bg-foreground text-background p-3 rounded-xl h-fit">
            <FaHeadset className="text-lg" />
          </div>

          <div>
            <h3 className="font-bold text-foreground text-sm sm:text-base">
              Support
            </h3>

            <p className="text-sm text-muted-foreground mt-1">
              24×7 Customer Support
            </p>
          </div>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

        <button
          disabled={!product?.inStock}
          className="w-full py-4 rounded-2xl border-2 border-foreground/10 bg-background hover:bg-foreground hover:text-background transition-all duration-300 font-bold text-sm sm:text-base shadow-sm active:scale-[0.98]"
        >
          Add To Cart
        </button>

        <button
          disabled={!product?.inStock}
          className="w-full py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black transition-all duration-300 font-black text-sm sm:text-base shadow-lg active:scale-[0.98]"
        >
          Buy Now
        </button>

      </div>

      {/* EXTRA INFO */}
      <div className="mt-8 flex flex-wrap gap-3">

        <div className="bg-background border border-foreground/10 px-4 py-2 rounded-full text-sm shadow-sm">
          Quantity :{" "}
          <span className="font-bold">
            {product?.quantity || 0}
          </span>
        </div>

        <div className="bg-background border border-foreground/10 px-4 py-2 rounded-full text-sm shadow-sm">
          Seller ID :{" "}
          <span className="font-bold">
            {product?.sellerId}
          </span>
        </div>

        <div className="bg-background border border-foreground/10 px-4 py-2 rounded-full text-sm shadow-sm">
          Shop ID :{" "}
          <span className="font-bold">
            {product?.shopId}
          </span>
        </div>

      </div>

    </div>
  </div>

  {/* =========================
      DESCRIPTION
  ========================== */}

  <div className="mt-14">

    <div className="flex items-center gap-3 mb-6">
      <div className="w-2 h-8 rounded-full bg-yellow-500"></div>

      <h1 className="text-2xl sm:text-3xl font-black">
        Product Details
      </h1>
    </div>

    <div className="bg-background border border-foreground/10 rounded-3xl p-5 sm:p-8 shadow-sm">

      <p className="text-sm sm:text-base leading-7 text-muted-foreground text-justify">
        {product?.description}
      </p>

    </div>
  </div>

  {/* =========================
      SPECIFICATIONS
  ========================== */}

  {product?.specifications &&
    Object.entries(product?.specifications).length > 0 && (

      <div className="mt-14">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 rounded-full bg-blue-500"></div>

          <h1 className="text-2xl sm:text-3xl font-black">
            Specifications
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {Object.entries(product?.specifications).map(
            ([key, value], index) => (

              <div
                key={index}
                className="bg-background border border-foreground/10 rounded-2xl p-5 hover:shadow-md transition-all"
              >

                <div className="flex items-start justify-between gap-4">

                  <h3 className="font-bold capitalize text-sm sm:text-base text-foreground">
                    {key}
                  </h3>

                  <p className="text-sm text-muted-foreground text-right break-words">
                    {String(value)}
                  </p>

                </div>

              </div>
            )
          )}

        </div>
      </div>
    )}

  {/* =========================
      RATINGS
  ========================== */}

  <div className="mt-14 mb-10">

    <div className="flex items-center gap-3 mb-6">
      <div className="w-2 h-8 rounded-full bg-green-500"></div>

      <h1 className="text-2xl sm:text-3xl font-black">
        Ratings & Reviews
      </h1>
    </div>

    <div className="bg-background border border-foreground/10 rounded-3xl p-5 sm:p-8">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

          <h1 className="text-6xl font-black text-foreground">
            {product?.averageRating || 0}
          </h1>

          <Rating
            value={product?.averageRating || 0}
            precision={0.1}
            readOnly
            className="mt-3"
          />

          <p className="text-muted-foreground mt-3">
            Based on {product?.totalReviews || 0} reviews
          </p>

        </div>

        {/* RIGHT */}
        <div className="space-y-4">

          {[5, 4, 3, 2, 1].map((star) => (
            <div
              key={star}
              className="flex items-center gap-3"
            >

              <div className="flex items-center gap-1 w-10 font-bold">
                {star}
                <FaStar className="text-yellow-500 text-sm" />
              </div>

              <div className="flex-1 h-3 bg-foreground/10 rounded-full overflow-hidden">
                <div className="bg-yellow-500 h-full w-[70%] rounded-full"></div>
              </div>

              <span className="text-sm text-muted-foreground">
                70%
              </span>

            </div>
          ))}

        </div>

      </div>

      <button className="w-full mt-8 py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all shadow-md active:scale-[0.98]">
        View Reviews
      </button>

    </div>
  </div>
</div>

  <ProductListComponent
        SectionName={"Similar Products"}
        products={products}
        Link={"/products/10"}
      />

      <ProductListComponent
        SectionName={"Recently Viewed"}
        products={products}
        Link={"/products/10"}
      />

      <ProductListComponent
        SectionName={"Best Products"}
        products={products}
        Link={"/products/10"}
      />
    </>
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
