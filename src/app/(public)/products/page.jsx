import ProductsClient from "./ProductsClient";

export const metadata = {
  title: "Products Catalog | Quick - Shop Electronics, Fashion & Accessories",
  description:
    "Browse our complete catalog of high-quality electronics, trendy fashion items, home essentials, and exclusive deals at Quick.",
  keywords: [
    "Quick Products",
    "Buy Electronics Online",
    "Fashion Catalog",
    "Online Store Products",
    "Quick Ecommerce",
    "Discount Shopping India",
  ],
  alternates: {
    canonical: "https://quicksin.in/products",
  },
  openGraph: {
    title: "Products Catalog | Quick",
    description:
      "Browse our complete catalog of high-quality electronics, trendy fashion items, home essentials, and exclusive deals.",
    url: "https://quicksin.in/products",
    siteName: "Quick",
    images: [
      {
        url: "/QuickLogo.png",
        width: 1200,
        height: 630,
        alt: "Quick Products Catalog",
      },
    ],
    type: "website",
  },
};

export default function page() {
  return <ProductsClient />;
}
