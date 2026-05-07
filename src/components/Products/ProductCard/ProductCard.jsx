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
      className="group border cursor-pointer border-foreground/10 p-2 bg-background"
    >
      <img
        alt={product?.name}
        src={product?.image}
        className="aspect-square w-full rounded-lg bg-background object-cover group-hover:opacity-75 xl:aspect-7/8"
      />

      {/* Brand */}
      <h3 className="mt-4 text-foreground line-clamp-1 font-extrabold">
        {product?.brand}
      </h3>

      {/* Name */}
      <h3 className="mt-1 text-sm text-foreground line-clamp-1">
        {product?.name}
      </h3>

      {/* Price section */}
      <div className="mt-1 min-h-[48px]">
        <p className="text-sm font-bold text-foreground flex flex-wrap items-center gap-2 mb-2">
          <span className="text-lg font-medium">₹{product?.price}</span>

          {product?.originalPrice && (
            <span className="line-through text-gray-500 font-normal">
              ₹{product?.originalPrice}
            </span>
          )}

          {discount > 0 && (
            <span className="text-green-600 font-bold whitespace-nowrap">
              {discount}% OFF
            </span>
          )}
        </p>
      </div>
    </div>
  );
}