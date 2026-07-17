export default function ProductCard({ product, router }) {
  const discount =
    product?.originalPrice && product?.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer h-full"
    >
      <div className="relative aspect-square w-full bg-zinc-50 dark:bg-zinc-800/50 overflow-hidden flex items-center justify-center p-6">
        <img
          alt={product?.name}
          src={product?.image}
          className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-300 group-hover:scale-110"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm z-10">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Brand */}
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 line-clamp-1">
          {product?.brand || "Brand"}
        </h3>

        {/* Name */}
        <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug mb-3">
          {product?.name}
        </h2>

        <div className="flex-1"></div>

        {/* Price section */}
        <div className="flex flex-wrap items-baseline gap-2 mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800/50">
          <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            ₹{product?.price}
          </span>
          {product?.originalPrice && (
            <span className="text-xs sm:text-sm font-medium text-zinc-400 dark:text-zinc-500 line-through">
              ₹{product?.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}