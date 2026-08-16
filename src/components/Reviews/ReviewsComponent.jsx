"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "@/redux-store/products/action";
import {
  FaStar,
  FaRegStar,
  FaCheckCircle,
  FaThumbsUp,
  FaThumbsDown,
  FaSearch,
  FaCamera,
  FaTimes,
  FaStore,
  FaSortAmountDown,
  FaPlus,
  FaArrowLeft,
  FaQuoteLeft
} from "react-icons/fa";
import { toast } from "react-toastify";

// Initial Mock Reviews Dataset
const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    productId: "1",
    productName: "Samsung Galaxy S23 Ultra",
    userName: "Aarav Sharma",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    verified: true,
    rating: 5,
    date: "August 12, 2026",
    title: "Absolute beast of a phone! Camera is unbelievable 🚀",
    comment:
      "I've been using this phone for 2 weeks now. The 200MP camera is out of this world, especially for night photography and moon shots. Battery life easily lasts 1.5 days on heavy usage. Build quality feels ultra premium.",
    variant: "Color: Phantom Black | 256GB",
    photos: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80"
    ],
    helpfulCount: 42,
    unhelpfulCount: 2,
    sellerResponse: {
      date: "August 13, 2026",
      comment: "Thank you Aarav! We are thrilled to hear you're loving the camera and battery performance!"
    },
    aspects: { quality: 5, value: 5, shipping: 5 }
  },
  {
    id: "rev-2",
    productId: "2",
    productName: "Apple iPhone 14",
    userName: "Priya Patel",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    verified: true,
    rating: 5,
    date: "August 10, 2026",
    title: "Smooth performance & super reliable camera!",
    comment:
      "Upgraded from iPhone 11 and the jump in display brightness and camera clarity is huge. Action mode stabilization works like a charm. Delivery was fast too, delivered within 48 hours!",
    variant: "Color: Midnight | 128GB",
    photos: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80"
    ],
    helpfulCount: 28,
    unhelpfulCount: 1,
    sellerResponse: null,
    aspects: { quality: 5, value: 4, shipping: 5 }
  },
  {
    id: "rev-3",
    productId: "3",
    productName: "OnePlus 11R",
    userName: "Rohan Verma",
    userAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    verified: true,
    rating: 4,
    date: "August 08, 2026",
    title: "Great flagship killer for the price",
    comment:
      "100W charging fills the battery from 0 to 100 in under 25 minutes! Display is smooth with 120Hz. Only minor downside is the secondary camera macro lens, but main sensor photos are super crisp.",
    variant: "Color: Galactic Silver | 16GB RAM",
    photos: [],
    helpfulCount: 19,
    unhelpfulCount: 3,
    sellerResponse: null,
    aspects: { quality: 4, value: 5, shipping: 5 }
  },
  {
    id: "rev-4",
    productId: "1",
    productName: "Samsung Galaxy S23 Ultra",
    userName: "Sneha Reddy",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    verified: true,
    rating: 5,
    date: "August 05, 2026",
    title: "S-Pen functionality is a game changer for productivity",
    comment:
      "Taking quick notes on the lock screen using the S-Pen has saved me so much time in meetings. Screen display brightness under direct sunlight is incredible.",
    variant: "Color: Green | 512GB",
    photos: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80"
    ],
    helpfulCount: 34,
    unhelpfulCount: 0,
    sellerResponse: {
      date: "August 06, 2026",
      comment: "Glad the S-Pen features are helping with your productivity Sneha!"
    },
    aspects: { quality: 5, value: 5, shipping: 4 }
  },
  {
    id: "rev-5",
    productId: "4",
    productName: "Redmi Note 13 Pro",
    userName: "Vikram Malhotra",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verified: false,
    rating: 3,
    date: "July 29, 2026",
    title: "Good phone overall, but pre-installed software is annoying",
    comment:
      "Hardware is top notch for this price segment — 1.5K AMOLED screen and 67W fast charger included in box. However, MIUI has some preloaded bloatware apps you need to manually uninstall.",
    variant: "Color: Arctic White | 8GB RAM",
    photos: [],
    helpfulCount: 15,
    unhelpfulCount: 7,
    sellerResponse: null,
    aspects: { quality: 4, value: 4, shipping: 3 }
  },
  {
    id: "rev-6",
    productId: "2",
    productName: "Apple iPhone 14",
    userName: "Kavita Rao",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    verified: true,
    rating: 5,
    date: "July 24, 2026",
    title: "Best battery backup on any compact phone!",
    comment:
      "Battery easily lasts full day with screen time around 7 hours. Sound quality from stereo speakers is surprisingly loud and rich.",
    variant: "Color: Starlight | 256GB",
    photos: [],
    helpfulCount: 11,
    unhelpfulCount: 0,
    sellerResponse: null,
    aspects: { quality: 5, value: 4, shipping: 5 }
  }
];

export default function ReviewsComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const productId = searchParams.get("productId");
  const openWriteModal = searchParams.get("write") === "true";

  // Redux product state if product detail page passed ID
  const reduxProduct = useSelector((state) => state.ProductReducer.productdata);

  // Local state management
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [selectedStarFilter, setSelectedStarFilter] = useState("all");
  const [onlyPhotos, setOnlyPhotos] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("mostHelpful");
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxReview, setLightboxReview] = useState(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // User interactions: helpful upvotes
  const [userVoted, setUserVoted] = useState({});

  // Write Review form state
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newVariant, setNewVariant] = useState("Default Variant");
  const [newPhotos, setNewPhotos] = useState("");

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetailsById({ id: productId }));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (openWriteModal) {
      setIsWriteModalOpen(true);
    }
  }, [openWriteModal]);

  // Active Product Title
  const activeProduct = useMemo(() => {
    if (reduxProduct && (reduxProduct.id == productId || reduxProduct._id == productId)) {
      return reduxProduct;
    }
    if (productId) {
      const found = reviews.find((r) => r.productId === productId);
      if (found) return { name: found.productName, brand: "Product", id: productId };
    }
    return null;
  }, [reduxProduct, productId, reviews]);

  // Filtered & Sorted Reviews
  const filteredReviews = useMemo(() => {
    return reviews
      .filter((rev) => {
        if (productId && rev.productId !== productId) return false;
        if (selectedStarFilter !== "all" && rev.rating !== Number(selectedStarFilter)) return false;
        if (onlyPhotos && (!rev.photos || rev.photos.length === 0)) return false;
        if (onlyVerified && !rev.verified) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = rev.title.toLowerCase().includes(q);
          const matchComment = rev.comment.toLowerCase().includes(q);
          const matchUser = rev.userName.toLowerCase().includes(q);
          const matchProduct = rev.productName.toLowerCase().includes(q);
          if (!matchTitle && !matchComment && !matchUser && !matchProduct) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "mostHelpful") return b.helpfulCount - a.helpfulCount;
        if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
        if (sortBy === "highest") return b.rating - a.rating;
        if (sortBy === "lowest") return a.rating - b.rating;
        return 0;
      });
  }, [reviews, productId, selectedStarFilter, onlyPhotos, onlyVerified, searchQuery, sortBy]);

  // Rating Statistics Calculations
  const stats = useMemo(() => {
    const relevant = productId ? reviews.filter((r) => r.productId === productId) : reviews;
    const total = relevant.length;
    if (total === 0) {
      return {
        avgRating: 0,
        totalCount: 0,
        counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        percents: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        recommendPercent: 0,
        photosCount: 0
      };
    }
    const sum = relevant.reduce((acc, r) => acc + r.rating, 0);
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let photosCount = 0;
    relevant.forEach((r) => {
      counts[r.rating] = (counts[r.rating] || 0) + 1;
      if (r.photos && r.photos.length > 0) photosCount += r.photos.length;
    });

    const percents = {};
    for (let i = 1; i <= 5; i++) {
      percents[i] = Math.round((counts[i] / total) * 100);
    }

    const recommendCount = relevant.filter((r) => r.rating >= 4).length;
    const recommendPercent = Math.round((recommendCount / total) * 100);

    return {
      avgRating: (sum / total).toFixed(1),
      totalCount: total,
      counts,
      percents,
      recommendPercent,
      photosCount
    };
  }, [reviews, productId]);

  // All Customer Photos Array
  const allCustomerPhotos = useMemo(() => {
    const relevant = productId ? reviews.filter((r) => r.productId === productId) : reviews;
    const list = [];
    relevant.forEach((rev) => {
      if (rev.photos && rev.photos.length > 0) {
        rev.photos.forEach((photo) => {
          list.push({ photo, review: rev });
        });
      }
    });
    return list;
  }, [reviews, productId]);

  // Toggle Helpful Vote
  const handleHelpful = (id, type) => {
    const currentVote = userVoted[id];
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        let helpfulCount = r.helpfulCount;
        let unhelpfulCount = r.unhelpfulCount;

        if (type === "helpful") {
          if (currentVote === "helpful") {
            helpfulCount--;
            setUserVoted({ ...userVoted, [id]: null });
          } else {
            if (currentVote === "unhelpful") unhelpfulCount--;
            helpfulCount++;
            setUserVoted({ ...userVoted, [id]: "helpful" });
          }
        } else {
          if (currentVote === "unhelpful") {
            unhelpfulCount--;
            setUserVoted({ ...userVoted, [id]: null });
          } else {
            if (currentVote === "helpful") helpfulCount--;
            unhelpfulCount++;
            setUserVoted({ ...userVoted, [id]: "unhelpful" });
          }
        }
        return { ...r, helpfulCount, unhelpfulCount };
      })
    );
  };

  // Submit New Review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newComment.trim() || !newName.trim()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const photoArray = newPhotos
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    const createdReview = {
      id: `rev-${Date.now()}`,
      productId: productId || "1",
      productName: activeProduct?.name || "General E-Commerce Purchase",
      userName: newName,
      userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newName)}`,
      verified: true,
      rating: newRating,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric"
      }),
      title: newTitle,
      comment: newComment,
      variant: newVariant,
      photos: photoArray,
      helpfulCount: 0,
      unhelpfulCount: 0,
      sellerResponse: null,
      aspects: { quality: newRating, value: newRating, shipping: 5 }
    };

    setReviews([createdReview, ...reviews]);
    setIsWriteModalOpen(false);
    toast.success("Thank you! Your review has been submitted successfully.");

    // Reset Form
    setNewTitle("");
    setNewComment("");
    setNewName("");
    setNewEmail("");
    setNewPhotos("");
  };

  // Render Stars helper
  const renderStars = (rating, size = "text-yellow-400", starSize = 16) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= rating ? (
              <FaStar className={`${size}`} style={{ fontSize: `${starSize}px` }} />
            ) : (
              <FaRegStar className="text-gray-300 dark:text-zinc-600" style={{ fontSize: `${starSize}px` }} />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 pb-16">
      
      {/* Top Banner / Header */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                {productId ? (
                  <button
                    onClick={() => router.push("/products/reviews")}
                    className="hover:underline flex items-center gap-1"
                  >
                    <FaArrowLeft size={10} /> All Reviews
                  </button>
                ) : (
                  <span>Verified Customer Ratings</span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {activeProduct ? `${activeProduct.name} - Reviews` : "Customer Reviews & Ratings"}
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Real feedback from verified buyers across India.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {productId && (
                <button
                  onClick={() => router.push(`/products/${productId}`)}
                  className="px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-semibold transition-all flex items-center gap-2"
                >
                  View Product
                </button>
              )}
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <FaPlus size={12} /> Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* OVERVIEW RATING DASHBOARD */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Rating Big Box */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center lg:border-r border-zinc-200 dark:border-zinc-800 lg:pr-8">
            <div className="text-5xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              {stats.avgRating}
              <span className="text-2xl text-zinc-400 font-normal">/5</span>
            </div>
            <div className="my-2">{renderStars(Math.round(Number(stats.avgRating)), "text-yellow-400", 22)}</div>
            <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
              Based on <span className="text-zinc-900 dark:text-zinc-100 font-bold">{stats.totalCount}</span> verified ratings
            </p>
            <div className="mt-4 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-full flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
              <FaCheckCircle /> {stats.recommendPercent}% of customers recommend this item
            </div>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="lg:col-span-5 space-y-2.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats.counts[star] || 0;
              const percent = stats.percents[star] || 0;
              const isSelected = selectedStarFilter === String(star);

              return (
                <button
                  key={star}
                  onClick={() =>
                    setSelectedStarFilter(isSelected ? "all" : String(star))
                  }
                  className={`w-full flex items-center gap-3 p-1.5 rounded-lg transition-all text-left ${
                    isSelected
                      ? "bg-blue-50 dark:bg-blue-950/50 ring-1 ring-blue-500"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <div className="flex items-center gap-1 w-12 text-sm font-semibold shrink-0">
                    <span>{star}</span>
                    <FaStar className="text-yellow-400 text-xs" />
                  </div>

                  <div className="flex-1 h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        star >= 4
                          ? "bg-emerald-500"
                          : star === 3
                          ? "bg-amber-400"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="w-16 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {count} ({percent}%)
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feature Ratings Summary */}
          <div className="lg:col-span-3 space-y-4 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 pt-6 lg:pt-0 lg:pl-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Aspect Satisfaction
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Product Quality</span>
                  <span className="text-blue-600 dark:text-blue-400">4.8 / 5</span>
                </div>
                <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-[96%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Value for Money</span>
                  <span className="text-blue-600 dark:text-blue-400">4.6 / 5</span>
                </div>
                <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-[92%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Delivery & Packaging</span>
                  <span className="text-blue-600 dark:text-blue-400">4.9 / 5</span>
                </div>
                <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-[98%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CUSTOMER PHOTO GALLERY CAROUSEL / GRID */}
        {allCustomerPhotos.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FaCamera className="text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold">
                  Customer Photos & Videos ({allCustomerPhotos.length})
                </h3>
              </div>
              <span className="text-xs text-zinc-500 font-medium">Click to inspect</span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {allCustomerPhotos.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setLightboxImage(item.photo);
                    setLightboxReview(item.review);
                  }}
                  className="relative group shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer"
                >
                  <img
                    src={item.photo}
                    alt={`Customer uploaded ${idx}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                    View
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FILTER BAR & CONTROLS */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-xs"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Sort & Checkbox Filters */}
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyPhotos}
                  onChange={(e) => setOnlyPhotos(e.target.checked)}
                  className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <span>With Photos</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                  className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <span>Verified Buyers</span>
              </label>

              <div className="flex items-center gap-2 text-xs font-semibold">
                <FaSortAmountDown className="text-zinc-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="mostHelpful">Most Helpful</option>
                  <option value="newest">Newest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Star Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-zinc-100 dark:border-zinc-800/60 scrollbar-none">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mr-2">
              Rating:
            </span>
            {["all", "5", "4", "3", "2", "1"].map((val) => {
              const active = selectedStarFilter === val;
              return (
                <button
                  key={val}
                  onClick={() => setSelectedStarFilter(val)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {val === "all" ? "All Stars" : `${val} ★`}
                </button>
              );
            })}
          </div>
        </div>

        {/* REVIEWS LISTING */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
              Showing {filteredReviews.length} {filteredReviews.length === 1 ? "Review" : "Reviews"}
            </h3>
            {(selectedStarFilter !== "all" || onlyPhotos || onlyVerified || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedStarFilter("all");
                  setOnlyPhotos(false);
                  setOnlyVerified(false);
                  setSearchQuery("");
                }}
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {filteredReviews.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-400 text-2xl">
                <FaQuoteLeft />
              </div>
              <h4 className="text-lg font-bold">No reviews match your filters</h4>
              <p className="text-sm text-zinc-500 max-w-md mx-auto">
                Try clearing your search query or selecting a different star rating filter.
              </p>
              <button
                onClick={() => {
                  setSelectedStarFilter("all");
                  setOnlyPhotos(false);
                  setOnlyVerified(false);
                  setSearchQuery("");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4 transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                {/* Header: User Info & Rating */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800/60 pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.userAvatar}
                      alt={rev.userName}
                      className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm">{rev.userName}</h4>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 px-2 py-0.5 rounded-full">
                            <FaCheckCircle className="text-[10px]" /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-400 font-medium">
                        Reviewed on {rev.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {renderStars(rev.rating)}
                    <span className="text-xs font-extrabold px-2 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 rounded-md">
                      {rev.rating}.0
                    </span>
                  </div>
                </div>

                {/* Review Body */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {rev.title}
                  </h3>

                  {rev.variant && (
                    <div className="text-xs font-semibold text-zinc-500 bg-zinc-50 dark:bg-zinc-800/50 px-2.5 py-1 rounded-md inline-block">
                      {rev.variant}
                    </div>
                  )}

                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed pt-1">
                    {rev.comment}
                  </p>
                </div>

                {/* Attached Customer Photos */}
                {rev.photos && rev.photos.length > 0 && (
                  <div className="flex gap-3 pt-2">
                    {rev.photos.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setLightboxImage(img);
                          setLightboxReview(rev);
                        }}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:opacity-90 transition-opacity"
                      >
                        <img src={img} alt="review snap" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Seller Response Section */}
                {rev.sellerResponse && (
                  <div className="bg-blue-50/70 dark:bg-blue-950/30 border-l-4 border-blue-600 rounded-r-xl p-4 text-xs space-y-1">
                    <div className="flex items-center gap-2 font-bold text-blue-700 dark:text-blue-400">
                      <FaStore /> Official Seller Response
                      <span className="text-[10px] font-normal text-zinc-400">
                        • {rev.sellerResponse.date}
                      </span>
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      {rev.sellerResponse.comment}
                    </p>
                  </div>
                )}

                {/* Card Footer: Helpful Actions */}
                <div className="flex items-center justify-between pt-2 text-xs font-semibold text-zinc-500">
                  <span>Was this review helpful?</span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleHelpful(rev.id, "helpful")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                        userVoted[rev.id] === "helpful"
                          ? "bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-600"
                          : "border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <FaThumbsUp />
                      <span>Helpful ({rev.helpfulCount})</span>
                    </button>

                    <button
                      onClick={() => handleHelpful(rev.id, "unhelpful")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                        userVoted[rev.id] === "unhelpful"
                          ? "bg-rose-50 dark:bg-rose-950 border-rose-500 text-rose-600"
                          : "border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <FaThumbsDown />
                      <span>({rev.unhelpfulCount})</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* LIGHTBOX MODAL FOR CUSTOMER PHOTOS */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white dark:bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-all"
            >
              <FaTimes />
            </button>

            <div className="md:w-3/5 bg-black flex items-center justify-center p-4">
              <img
                src={lightboxImage}
                alt="Enlarged review photo"
                className="max-h-[70vh] object-contain rounded-lg"
              />
            </div>

            {lightboxReview && (
              <div className="md:w-2/5 p-6 space-y-4 overflow-y-auto">
                <div className="flex items-center gap-3">
                  <img
                    src={lightboxReview.userAvatar}
                    alt={lightboxReview.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-sm">{lightboxReview.userName}</h4>
                    <span className="text-xs text-zinc-400">{lightboxReview.date}</span>
                  </div>
                </div>

                <div>{renderStars(lightboxReview.rating)}</div>
                <h3 className="font-bold text-base">{lightboxReview.title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {lightboxReview.comment}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WRITE A REVIEW MODAL */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-bold">Write a Review</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Share your experience with the community
                </p>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs font-semibold">
              
              {/* Star Rating Picker */}
              <div className="text-center bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl space-y-2">
                <label className="block text-zinc-500 uppercase tracking-wider text-[11px]">
                  Overall Rating
                </label>
                <div className="flex justify-center gap-2 text-2xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewRating(star)}
                      className="transition-transform hover:scale-125 focus:outline-none"
                    >
                      {star <= (hoverRating || newRating) ? (
                        <FaStar className="text-yellow-400" />
                      ) : (
                        <FaRegStar className="text-zinc-300 dark:text-zinc-600" />
                      )}
                    </button>
                  ))}
                </div>
                <span className="block text-xs font-bold text-blue-600">
                  {hoverRating || newRating === 5
                    ? "Excellent! 🌟"
                    : hoverRating || newRating === 4
                    ? "Good 👍"
                    : hoverRating || newRating === 3
                    ? "Average 😐"
                    : "Poor 👎"}
                </span>
              </div>

              {/* Title Input */}
              <div>
                <label className="block mb-1 text-zinc-700 dark:text-zinc-300">
                  Review Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Incredible camera & lightning fast delivery!"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs font-normal"
                />
              </div>

              {/* Detailed Comment Input */}
              <div>
                <label className="block mb-1 text-zinc-700 dark:text-zinc-300">
                  Detailed Feedback *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="What did you like or dislike? How was the build quality, performance, or packaging?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs font-normal"
                />
              </div>

              {/* User Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-zinc-700 dark:text-zinc-300">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs font-normal"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-zinc-700 dark:text-zinc-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. rahul@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs font-normal"
                  />
                </div>
              </div>

              {/* Image Links Simulator */}
              <div>
                <label className="block mb-1 text-zinc-700 dark:text-zinc-300">
                  Add Photo URLs (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg"
                  value={newPhotos}
                  onChange={(e) => setNewPhotos(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs font-normal"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-md transition-all"
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
