"use client";
import Maincarosel from "@/components/Products/productdetailsComponents/HeroSection"
import ProductListComponent from "@/components/UniversalComponnets/ProductListComponent/ProductListComponent";
import { getProductDetailsById } from "@/redux-store/products/action";
import { Rating, Slider } from "@mui/material";

import { ProductionQuantityLimits, SearchOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FaCashRegister, FaHeadset, FaLocationArrow, FaMapMarked, FaRecycle, FaRupeeSign, FaStar, FaStore, FaTimes, FaTimesCircle, FaTruckPickup } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { useParams, useRouter } from "next/navigation";


// const product = {
//   id: 1,
//   brand: "Realme",
//   name: "Realme P2 Pro 5g (Glacier Blue, 128 GB)  (8 GB RAM)",
//   images: [
//     "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU=",
//     "https://media.istockphoto.com/id/2207778462/photo/supreme-court-of-india-located-in-new-delhi-india.jpg?s=612x612&w=0&k=20&c=MGzVpxie9TfHpKyo6oQNM4i_M6GpJWJ6mT3-MnjcS2c=",
//     "https://media.istockphoto.com/id/2210970630/photo/us-tariff-on-india-import-trade-war-cargo-shipping-container.jpg?s=612x612&w=0&k=20&c=LzraUkokMF-QK5dlk0DfLVsAyhUBi0mbd0pCcIPRKgE=",
//     "https://media.istockphoto.com/id/1007178836/photo/indian-supreme-court.jpg?s=612x612&w=0&k=20&c=sVUxnP1WCkC62og2fjbzgdUMleD3WoeOzbBgNiJ9y_Y=",
//     "https://media.istockphoto.com/id/2200128716/photo/ai-powers-big-data-analysis-and-automation-workflows-showcasing-neural-networks-and-data.jpg?s=612x612&w=0&k=20&c=z7kdn14AJhMX8JlenABkc3mT-df-V0JhxJzqnQ8Q81w="
//   ],
//   color: "Glacier Blue",
//   price: "₹ 17,999",
//   Original_price: "₹ 19,999",
//   store: "Rahul Gandhi",
//   discount: "10",
//   rating: 4.5,
// qunatity:"4",
//   return_day: "0",
//   reviews: 1000,
//   description: "The Realme P2 Pro 5G is a budget-friendly smartphone that offers a powerful performance with its MediaTek Dimensity 920 processor and 8GB of RAM. It features a large 6.43-inch AMOLED display with a high refresh rate, providing a smooth and immersive viewing experience. The phone also boasts a versatile camera setup, including a 64MP main sensor, allowing users to capture stunning photos and videos. With its long-lasting battery and fast charging capabilities, the Realme P2 Pro 5G is an excellent choice for those seeking a feature-packed smartphone at an affordable price.",
//   attributes: [
//     { key: "Display", value: "6.43-inch AMOLED display with a high refresh rate" },
//     { key: "Processor", value: "MediaTek Dimensity 920 processor" },
//     { key: "Camera", value: "64MP main sensor" },
//   ]

// }

const products = [
  {
    id: 1,
    brand: "Samsung",
    name: "Galaxy S23 Ultra",
    color: "Phantom Black",
    price: 109999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Samsung Galaxy S23 Ultra front view",
    Original_price: 124999,
    discount: 12
  },
  {
    id: 2,
    brand: "Apple",
    name: "iPhone 14",
    color: "Midnight",
    price: 69999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Apple iPhone 14 front view",
    Original_price: 79999,
    discount: 13
  },
  {
    id: 3,
    brand: "OnePlus",
    name: "OnePlus 11R",
    color: "Galactic Silver",
    price: 39999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "OnePlus 11R front view",
    Original_price: 44999,
    discount: 11
  },
  {
    id: 4,
    brand: "Xiaomi",
    name: "Redmi Note 13 Pro",
    color: "Arctic White",
    price: 24999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Redmi Note 13 Pro front view",
    Original_price: 27999,
    discount: 10
  },
  {
    id: 5,
    brand: "Realme",
    name: "Realme GT Neo 3",
    color: "Nitro Blue",
    price: 31999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Realme GT Neo 3 front view",
    Original_price: 35999,
    discount: 11
  },
  {
    id: 6,
    brand: "Vivo",
    name: "Vivo V29 Pro",
    color: "Himalayan Blue",
    price: 38999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Vivo V29 Pro front view",
    Original_price: 42999,
    discount: 9
  },
  {
    id: 7,
    brand: "Oppo",
    name: "Oppo Reno 10 Pro",
    color: "Glossy Purple",
    price: 36999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Oppo Reno 10 Pro front view",
    Original_price: 40999,
    discount: 10
  },
  {
    id: 8,
    brand: "Motorola",
    name: "Moto Edge 40",
    color: "Eclipse Black",
    price: 29999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Moto Edge 40 front view",
    Original_price: 32999,
    discount: 9
  },
  {
    id: 9,
    brand: "Google",
    name: "Pixel 7",
    color: "Snow",
    price: 59999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Google Pixel 7 front view",
    Original_price: 64999,
    discount: 8
  }
];


export default function page() {
  const params = useParams();
  const id = params.productid;
  const dispatch = useDispatch();
const router=useRouter();

  const [fetch ,setFetch]=useState(false);
  const store = useSelector((state) => state.ProductReducer);

  const product = store?.data || [];

  const fetchProductdetails=async()=>{
    setFetch(true);
    try{
     await dispatch(getProductDetailsById({ id }));
    }
    catch(e){

    }finally{
      setFetch(false);
    }
  }
  useEffect(() => {
fetchProductdetails();
  }, []);

  if (product.length === 0 &&fetch) {
    return (
      <>
        <div className="bg-background grid grid-cols-1 mt-1 animate-pulse">

          {/* Top Section */}
          <div className="bg-background grid grid-cols-1 md:grid-cols-2 gap-4 h-full">

            {/* Left - Image Skeleton */}
            <div className="bg-gray-300 w-full h-[400px] rounded-lg" />

            {/* Right - Product Info Skeleton */}
            <div className="bg-background p-2 flex flex-col space-y-4">

              <div className="h-6 w-40 bg-gray-300 rounded" />
              <div className="h-6 w-60 bg-gray-200 rounded" />

              <div className="h-8 w-20 bg-gray-300 rounded-full" />

              <div className="h-6 w-48 bg-gray-300 rounded" />

              {/* Delivery Section */}
              <div className="space-y-3 mt-4">
                <div className="h-5 w-40 bg-gray-300 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="h-12 w-full bg-gray-300 rounded" />
                <div className="h-12 w-full bg-gray-400 rounded" />
              </div>

            </div>
          </div>

          <hr className="text-foreground/10 mt-10" />

          {/* Features Section */}
          <div className="grid grid-cols-3 mt-10 mb-10 p-4 gap-4">
            <div className="h-16 bg-gray-200 rounded" />
            <div className="h-16 bg-gray-200 rounded" />
            <div className="h-16 bg-gray-200 rounded" />
          </div>

          <hr className="text-foreground/10 mt-1" />

          {/* Similar Products Skeleton */}
          <div className="mt-10 space-y-4">
            <div className="h-8 w-48 bg-gray-300 rounded" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="h-60 bg-gray-200 rounded" />
              <div className="h-60 bg-gray-200 rounded" />
              <div className="h-60 bg-gray-200 rounded" />
              <div className="h-60 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-background p-2 mt-10 space-y-4">
            <div className="h-8 w-32 bg-gray-300 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>

          {/* Ratings Section */}
          <div className="p-2 mt-5 bg-background space-y-6">
            <div className="h-8 w-48 bg-gray-300 rounded" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="h-5 w-32 bg-gray-300 rounded" />
                <div className="h-4 w-48 bg-gray-200 rounded" />
              </div>

              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
              </div>
            </div>

            <div className="h-12 w-full bg-gray-300 rounded" />
          </div>

        </div>

        {/* Recently Viewed Skeleton */}
        <div className="mt-10 space-y-4 animate-pulse">
          <div className="h-8 w-48 bg-gray-300 rounded" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-60 bg-gray-200 rounded" />
            <div className="h-60 bg-gray-200 rounded" />
            <div className="h-60 bg-gray-200 rounded" />
            <div className="h-60 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Best Products Skeleton */}
        <div className="mt-10 space-y-4 animate-pulse">
          <div className="h-8 w-48 bg-gray-300 rounded" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-60 bg-gray-200 rounded" />
            <div className="h-60 bg-gray-200 rounded" />
            <div className="h-60 bg-gray-200 rounded" />
            <div className="h-60 bg-gray-200 rounded" />
          </div>
        </div>

      </>
    )
  }
  if (!fetch) {
    return (
      <>
  <div className="min-h-[70vh] flex items-center justify-center bg-background px-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-sm p-10 max-w-lg w-full text-center transition-all duration-300">
          
          {/* Modern Illustration Area */}
          <div className="flex justify-center mb-8 relative">
            <div className="bg-zinc-50 dark:bg-zinc-800 p-8 rounded-full relative ">
              <SearchOff className="text-zinc-300 dark:text-zinc-600 w-20 h-20" />
            </div>
            {/* Subtle Decorative Yellow Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-dashed border-yellow-400 rounded-full animate-[spin_10s_linear_infinite]" />
          </div>
  
          {/* Text Content */}
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Sorry, no results found!
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xs mx-auto leading-relaxed">
              Please check the spelling or try searching for something else. We couldn't find what you’re looking for.
            </p>
          </div>
  
          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => router.push("/")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase text-xs tracking-wider px-8 py-3.5 rounded-sm transition-all shadow-md active:scale-95"
            >
              Continue Shopping
            </button>
            
            <button 
              onClick={() => window.location.reload()}
              className="border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-foreground font-bold uppercase text-xs tracking-wider px-8 py-3.5 rounded-sm transition-all"
            >
              Clear Filters
            </button>
          </div>
  
          {/* Helpful Hint */}
          <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <p className="text-[11px] text-zinc-400 uppercase font-semibold tracking-widest">
              Need help? Contact our 24/7 Support
            </p>
          </div>
        </div>
      </div>
      </>
    );
  }


  return (
    <>
      <div className="bg-background grid grid-cols-1 mt-1 ">


        <div className="bg-background  grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <div className="bg-background ">
            <Maincarosel product={product?.images} />
          </div>
          <div className="bg-background p-2 flex flex-col ">
            <h1 className="text-xl font-bold text-foreground md:line-clamp-1 mb-2">{product.brand}</h1>
            <h1 className="text-xl text-foreground md:line-clamp-1">{product.name}</h1>
            <div>
              <div className="flex gap-2 mt-2">
                <span className="text-sm cursor-pointer px-2 py-1 border border-foreground bg-foreground text-background rounded-full mr-2">{product.color}</span>
              </div>
              <p className="text-lg font-bold text-foreground mt-2">{product.price} <span className="line-through text-sm font-normal text-gray-500 ml-2">{product.originalPrice}</span> <span className="text-green-600 text-sm font-bold ml-2">{product.discount}% OFF</span></p>
              <div className="grid grid-cols-1 mt-4">
                <h1 className="text-md text-lg font-bold text-foreground "> Delivery Details</h1>
                <div className=" flex flex-col">
                  <div className=" flex items-center gap-2 mt-2 bg-foreground/10 p-2 rounded">
                    <FaMapMarked className="inline-block text-sm text-foreground mr-1" /> <p className="text-sm font-bold">Location Not Set</p>
                  </div>
                  <div className=" flex items-center gap-2 mt-2 bg-foreground/10 p-2 rounded">
                    <FaTruckPickup className="inline-block text-sm text-foreground mr-1" /> <p className="text-sm font-bold">Delivery with in 2-3 days</p>
                  </div>
                  <div className=" flex items-center gap-2 mt-2 bg-foreground/10 p-2 rounded">
                    <FaStore className="inline-block text-sm text-foreground mr-1" /> <p className="text-sm font-bold">Fulfilled by {product.store}</p>
                  </div>

                </div>
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <button className="bg-background cursor-pointer border-foreground/40 border hover:bg-foreground hover:text-background font-bold text-foreground px-4 py-2 rounded ">Add to Cart</button>
              <button className="bg-yellow-500 cursor-pointer text-foreground px-4 py-2 rounded font-bold border-foreground/40   border">Buy Now</button>
            </div>
          </div>


        </div>
        <hr className="text-foreground/10 mt-10" />
        <div className="grid grid-cols-3 mt-10 mb-10  p-4 rounded-lg text-center">
          <div className="flex flex-col items-center justify-center gap-2 px-2">
            <FaRecycle className="text-lg text-foreground" />
            <p className="text-xs font-semibold leading-tight">
              {product.returnDay}-Day Return
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 px-2">
            <FaRupeeSign className="text-lg text-foreground" />
            <p className="text-xs font-semibold leading-tight">
              Cash on Delivery
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 px-2">
            <FaHeadset className="text-lg text-foreground" />
            <p className="text-xs font-semibold leading-tight">
              24×7 Customer Support
            </p>
          </div>

        </div>

        <hr className="text-foreground/10 mt-1" />


        <ProductListComponent SectionName={"Similar Products"} products={products} Link={"/products/10"} />

        <div className="bg-background p-2 mt-10 ">
          <div className="md:p-5  ">
            <h1 className="text-2xl font-extrabold">Details</h1>
            <div className="flex flex-col">
              <p className="text-foreground text-sm mt-2 text-justify">{product.description}</p>
              <div>
                {product.specifications && Object.entries(product.specifications).length > 0 && (
                  <div>
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <h1 className="text-sm font-bold text-foreground">{key}:</h1>
                        <p className="text-sm text-foreground">{value?.toString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 mt-5 bg-background">
          <h1 className="font-extrabold text-2xl md:p-5">
            Rating & Reviews
          </h1>

          <div className="md:p-5 grid grid-cols-1 md:grid-cols-2 gap-6 py-2">

            {/* Left Side - Overall Rating */}
            <div className="flex flex-col gap-2">
              <Rating name="read-only" value={4.2} precision={0.1} readOnly />
              <p className="text-sm text-muted-foreground">
                2,000 ratings & 2,000 reviews
              </p>
            </div>

            {/* Right Side - Rating Breakdown */}
            <div className="flex flex-col gap-3">

              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">

                  {/* Star Number */}
                  <div className="flex items-center gap-1 w-10">
                    <span>{star}</span>
                    <FaStar className="text-yellow-500 text-sm" />
                  </div>

                  {/* Progress Bar */}
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                      ></div>
                    </div>
                  </div>

                  {/* Percentage */}
                  <span className="text-sm text-muted-foreground w-10 text-right">
                    60%
                  </span>
                </div>
              ))}

            </div>


          </div>
          <div className=" flex items-center justify-center">
            <button className="bg-background border-foreground/40  cursor-pointer w-full mt-4 border hover:bg-foreground hover:text-background font-bold text-foreground p-4 rounded transition-colors duration-200">View Reviews</button>
          </div>
        </div>
      </div>
      <ProductListComponent SectionName={"Recently Viewed"} products={products} Link={"/products/10"} />

      <ProductListComponent SectionName={"Best Products"} products={products} Link={"/products/10"} />
    </>
  )
}


// import { StarIcon } from '@heroicons/react/20/solid'

// const product = {
//   name: 'Basic Tee 6-Pack',
//   price: '$192',
//   href: '#',
//   breadcrumbs: [
//     { id: 1, name: 'Men', href: '#' },
//     { id: 2, name: 'Clothing', href: '#' },
//   ],
//   images: [
//     {
//       src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
//       alt: 'Two each of gray, white, and black shirts laying flat.',
//     },
//     {
//       src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
//       alt: 'Model wearing plain black basic tee.',
//     },
//     {
//       src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
//       alt: 'Model wearing plain gray basic tee.',
//     },
//     {
//       src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
//       alt: 'Model wearing plain white basic tee.',
//     },
//   ],
//   colors: [
//     { id: 'white', name: 'White', classes: 'bg-white checked:outline-gray-400' },
//     { id: 'gray', name: 'Gray', classes: 'bg-gray-200 checked:outline-gray-400' },
//     { id: 'black', name: 'Black', classes: 'bg-gray-900 checked:outline-gray-900' },
//   ],
//   sizes: [
//     { name: 'XXS', inStock: false },
//     { name: 'XS', inStock: true },
//     { name: 'S', inStock: true },
//     { name: 'M', inStock: true },
//     { name: 'L', inStock: true },
//     { name: 'XL', inStock: true },
//     { name: '2XL', inStock: true },
//     { name: '3XL', inStock: true },
//   ],
//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   highlights: [
//     'Hand cut and sewn locally',
//     'Dyed with our proprietary colors',
//     'Pre-washed & pre-shrunk',
//     'Ultra-soft 100% cotton',
//   ],
//   details:
//     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// }
// const reviews = { href: '#', average: 4, totalCount: 117 }

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function page() {
//   return (
//     <div className="bg-white">
//       <div className="pt-6">
//         <nav aria-label="Breadcrumb">
//           <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
//             {product.breadcrumbs.map((breadcrumb) => (
//               <li key={breadcrumb.id}>
//                 <div className="flex items-center">
//                   <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
//                     {breadcrumb.name}
//                   </a>
//                   <svg
//                     fill="currentColor"
//                     width={16}
//                     height={20}
//                     viewBox="0 0 16 20"
//                     aria-hidden="true"
//                     className="h-5 w-4 text-gray-300"
//                   >
//                     <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
//                   </svg>
//                 </div>
//               </li>
//             ))}
//             <li className="text-sm">
//               <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
//                 {product.name}
//               </a>
//             </li>
//           </ol>
//         </nav>

//         {/* Image gallery */}
//         <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
//           <img
//             alt={product.images[0].alt}
//             src={product.images[0].src}
//             className="row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden"
//           />
//           <img
//             alt={product.images[1].alt}
//             src={product.images[1].src}
//             className="col-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
//           />
//           <img
//             alt={product.images[2].alt}
//             src={product.images[2].src}
//             className="col-start-2 row-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
//           />
//           <img
//             alt={product.images[3].alt}
//             src={product.images[3].src}
//             className="row-span-2 aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-3/4"
//           />
//         </div>

//         {/* Product info */}
//         <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
//           <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
//             <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
//           </div>

//           {/* Options */}
//           <div className="mt-4 lg:row-span-3 lg:mt-0">
//             <h2 className="sr-only">Product information</h2>
//             <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

//             {/* Reviews */}
//             <div className="mt-6">
//               <h3 className="sr-only">Reviews</h3>
//               <div className="flex items-center">
//                 <div className="flex items-center">
//                   {[0, 1, 2, 3, 4].map((rating) => (
//                     <StarIcon
//                       key={rating}
//                       aria-hidden="true"
//                       className={classNames(
//                         reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
//                         'size-5 shrink-0',
//                       )}
//                     />
//                   ))}
//                 </div>
//                 <p className="sr-only">{reviews.average} out of 5 stars</p>
//                 <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
//                   {reviews.totalCount} reviews
//                 </a>
//               </div>
//             </div>

//             <form className="mt-10">
//               {/* Colors */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-900">Color</h3>

//                 <fieldset aria-label="Choose a color" className="mt-4">
//                   <div className="flex items-center gap-x-3">
//                     {product.colors.map((color) => (
//                       <div key={color.id} className="flex rounded-full outline -outline-offset-1 outline-black/10">
//                         <input
//                           defaultValue={color.id}
//                           defaultChecked={color === product.colors[0]}
//                           name="color"
//                           type="radio"
//                           aria-label={color.name}
//                           className={classNames(
//                             color.classes,
//                             'size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3',
//                           )}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </fieldset>
//               </div>

//               {/* Sizes */}
//               <div className="mt-10">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-sm font-medium text-gray-900">Size</h3>
//                   <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
//                     Size guide
//                   </a>
//                 </div>

//                 <fieldset aria-label="Choose a size" className="mt-4">
//                   <div className="grid grid-cols-4 gap-3">
//                     {product.sizes.map((size) => (
//                       <label
//                         key={size.id}
//                         aria-label={size.name}
//                         className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
//                       >
//                         <input
//                           defaultValue={size.id}
//                           defaultChecked={size === product.sizes[2]}
//                           name="size"
//                           type="radio"
//                           disabled={!size.inStock}
//                           className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
//                         />
//                         <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">
//                           {size.name}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               </div>

//               <button
//                 type="submit"
//                 className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
//               >
//                 Add to bag
//               </button>
//             </form>
//           </div>

//           <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
//             {/* Description and details */}
//             <div>
//               <h3 className="sr-only">Description</h3>

//               <div className="space-y-6">
//                 <p className="text-base text-gray-900">{product.description}</p>
//               </div>
//             </div>

//             <div className="mt-10">
//               <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

//               <div className="mt-4">
//                 <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
//                   {product.highlights.map((highlight) => (
//                     <li key={highlight} className="text-gray-400">
//                       <span className="text-gray-600">{highlight}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             <div className="mt-10">
//               <h2 className="text-sm font-medium text-gray-900">Details</h2>

//               <div className="mt-4 space-y-6">
//                 <p className="text-sm text-gray-600">{product.details}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
