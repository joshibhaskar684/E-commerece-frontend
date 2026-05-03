import Link from "next/link";

export default function OrderItemComponent({ product }) {
  return (
    <Link
      href={`/account/orders/${product.id}`}
      className="border border-foreground/10 rounded-lg bg-foreground/5 flex hover:bg-foreground/10 transition"
    >
      <img
        src={product.imageSrc}
        alt={product.imageAlt}
        className="w-24 h-24 object-cover rounded-l-lg"
      />

      <div className="p-3 flex flex-col justify-center gap-1">
        <h1 className="text-sm font-bold line-clamp-1">
          Brand Name
        </h1>

        <h3 className="text-xs line-clamp-1">
          {product.name}
        </h3>

        <h3 className="text-xs text-blue-500">
          Status: Delivered
        </h3>

        <h3 className="text-xs text-yellow-500">
          Delivery Expected By: 2–3 days
        </h3>
      </div>
    </Link>
  );
}