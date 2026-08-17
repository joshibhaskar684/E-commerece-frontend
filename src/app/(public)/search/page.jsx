import SearchClient from "./SearchClient";

export const metadata = {
  title: "Search Products | Quick",
  description: "Search across thousands of electronics, fashion items, and home essentials on Quick.",
  alternates: {
    canonical: "https://quicksin.in/search",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Search Products | Quick",
    description: "Search across thousands of electronics, fashion items, and home essentials on Quick.",
    url: "https://quicksin.in/search",
    siteName: "Quick",
    images: [
      {
        url: "/QuickLogo.png",
        width: 1200,
        height: 630,
        alt: "Quick Search",
      },
    ],
  },
};

export default function page() {
  return <SearchClient />;
}
