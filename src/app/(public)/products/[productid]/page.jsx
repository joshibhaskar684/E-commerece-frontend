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
            TOP SECTION
        ========================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT */}
          <div>
            <Maincarosel product={product?.images || []} />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col">

            {/* BRAND */}
            <h1 className="text-lg font-bold text-muted-foreground uppercase">
              {product?.brand}
            </h1>

            {/* NAME */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
              {product?.name}
            </h2>

            {/* RATING */}
            <div className="flex items-center gap-3 mt-4">
              <Rating
                value={product?.averageRating || 0}
                precision={0.1}
                readOnly
              />

              <p className="text-sm text-muted-foreground">
                ({product?.totalReviews || 0} Reviews)
              </p>
            </div>

            {/* COLOR */}
            {product?.color && (
              <div className="mt-4">
                <span className="px-4 py-2 rounded-full border text-sm font-semibold">
                  {product?.color}
                </span>
              </div>
            )}

            {/* PRICE */}
            <div className="mt-5 flex items-center flex-wrap gap-3">

              <h1 className="text-3xl font-extrabold text-foreground">
                ₹{product?.price}
              </h1>

              {product?.originalPrice && (
                <span className="line-through text-gray-500 text-lg">
                  ₹{product?.originalPrice}
                </span>
              )}

              {product?.discountPercentage > 0 && (
                <span className="text-green-600 font-bold text-lg">
                  {product?.discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* STOCK */}
            <div className="mt-4">
              {product?.inStock ? (
                <span className="text-green-600 font-semibold">
                  In Stock ({product?.quantity} Available)
                </span>
              ) : (
                <span className="text-red-500 font-semibold">
                  Out of Stock
                </span>
              )}
            </div>

            {/* DELIVERY */}
            <div className="mt-8">

              <h2 className="text-xl font-bold mb-4">
                Delivery Details
              </h2>

              <div className="space-y-3">

                <div className="flex items-center gap-3 bg-foreground/10 p-3 rounded-lg">
                  <FaMapMarked />
                  <p className="font-medium">
                    Delivery Available Across India
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-foreground/10 p-3 rounded-lg">
                  <FaTruckPickup />
                  <p className="font-medium">
                    Delivery within {product?.deliveryDays || 3} days
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-foreground/10 p-3 rounded-lg">
                  <FaStore />
                  <p className="font-medium">
                    Seller ID : {product?.sellerId}
                  </p>
                </div>

              </div>
            </div>

            {/* BUTTONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

              <button
                disabled={!product?.inStock}
                className="bg-background border border-foreground/40 hover:bg-foreground hover:text-background font-bold py-3 rounded transition disabled:opacity-50"
              >
                Add to Cart
              </button>

              <button
                disabled={!product?.inStock}
                className="bg-yellow-500 hover:bg-yellow-400 font-bold py-3 rounded transition disabled:opacity-50"
              >
                Buy Now
              </button>

            </div>

          </div>
        </div>

        {/* =========================
            FEATURES
        ========================== */}

        <div className="grid grid-cols-3 mt-12 mb-12 p-4 border-y">

          <div className="flex flex-col items-center justify-center gap-2">
            <FaRecycle className="text-xl" />

            <p className="text-sm font-semibold text-center">
              {product?.returnDay || 0} Day Return
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <FaRupeeSign className="text-xl" />

            <p className="text-sm font-semibold text-center">
              Cash on Delivery
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <FaHeadset className="text-xl" />

            <p className="text-sm font-semibold text-center">
              24×7 Support
            </p>
          </div>

        </div>

        {/* =========================
            DESCRIPTION
        ========================== */}

        <div className="mt-10">

          <h1 className="text-2xl font-extrabold mb-5">
            Product Details
          </h1>

          <p className="text-foreground/80 leading-7 text-justify">
            {product?.description}
          </p>

        </div>

        {/* =========================
            SPECIFICATIONS
        ========================== */}

        {product?.specifications &&
          Object.entries(product?.specifications).length > 0 && (
            <div className="mt-10">

              <h1 className="text-2xl font-extrabold mb-5">
                Specifications
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {Object.entries(product?.specifications).map(
                  ([key, value], index) => (
                    <div
                      key={index}
                      className="flex justify-between border rounded-lg p-4 bg-foreground/5"
                    >
                      <span className="font-bold capitalize">
                        {key}
                      </span>

                      <span className="text-muted-foreground">
                        {String(value)}
                      </span>
                    </div>
                  )
                )}

              </div>
            </div>
          )}

        {/* =========================
            RATINGS
        ========================== */}

        <div className="mt-12">

          <h1 className="text-2xl font-extrabold mb-6">
            Ratings & Reviews
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div>
              <div className="flex items-center gap-3">

                <h1 className="text-5xl font-bold">
                  {product?.averageRating || 0}
                </h1>

                <div>
                  <Rating
                    value={product?.averageRating || 0}
                    precision={0.1}
                    readOnly
                  />

                  <p className="text-sm text-muted-foreground mt-1">
                    {product?.totalReviews || 0} Reviews
                  </p>
                </div>

              </div>
            </div>

            {/* STATIC BREAKDOWN */}
            <div className="space-y-3">

              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">

                  <div className="flex items-center gap-1 w-10">
                    <span>{star}</span>
                    <FaStar className="text-yellow-500 text-sm" />
                  </div>

                  <div className="flex-1 bg-gray-200 h-2 rounded-full">
                    <div className="bg-yellow-500 h-2 rounded-full w-[70%]" />
                  </div>

                  <span className="text-sm text-muted-foreground">
                    70%
                  </span>

                </div>
              ))}

            </div>

          </div>

          <button className="w-full mt-8 border border-foreground/30 hover:bg-foreground hover:text-background transition py-4 rounded font-bold">
            View Reviews
          </button>

        </div>
      </div>

      {/* =========================
          RELATED PRODUCTS
      ========================== */}

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