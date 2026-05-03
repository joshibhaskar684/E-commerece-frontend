"use client";

import OrderItemComponent from "@/components/Orders/OrderItemComponent/OrderItemComponents";

export default function Page() {
  const products = [
    {
      id: 1,
      name: "Throwback Hip Bag",
      href: "#",
      color: "Salmon",
      price: "$90.00",
      quantity: 1,
      imageSrc:
        "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
      imageAlt: "Salmon orange fabric pouch",
    },
    {
      id: 2,
      name: "Medium Stuff Satchel",
      href: "#",
      color: "Blue",
      price: "$32.00",
      quantity: 1,
      imageSrc:
        "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt: "Blue satchel bag",
    },
  ];

  return (
    <>
      <h1 className="text-foreground p-4 text-3xl font-bold">
        Orders
      </h1>

      <div className="bg-background text-foreground flex flex-col md:flex-row p-6 md:p-10 gap-4">
        <div className="flex flex-col gap-3 w-full">
          {products.map((product) => (
            <OrderItemComponent key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}