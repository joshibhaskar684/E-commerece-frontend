import MainHomePage from "../../components/Home/MainHomePage";

export const metadata = {
  title: "Quick | Online Shopping for Electronics, Fashion, Home & More",
  description:
    "Explore trending electronics, stylish apparel, and high-quality home goods on Quick. Experience fast shipping, incredible deals, and a seamless shopping journey.",
  keywords: [
    "Quick Online Store",
    "Buy Electronics Online",
    "Fashion Shopping",
    "Best Deals India",
    "Mera Store",
    "Quick Shop",
  ],
  alternates: {
    canonical: "https://quicksin.in",
  },
  openGraph: {
    title: "Quick | Online Shopping for Electronics, Fashion & More",
    description:
      "Explore trending electronics, stylish apparel, and high-quality home goods on Quick.",
    url: "https://quicksin.in",
    siteName: "Quick",
    images: [
      {
        url: "/QuickLogo.png",
        width: 1200,
        height: 630,
        alt: "Quick Homepage",
      },
    ],
    type: "website",
  },
};

export default function page() {
  return <MainHomePage />;
}