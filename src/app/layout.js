

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from './../redux-store/ReduxProvider/ReduxProvider';
import { ToastContainer } from "react-toastify";
import AiBot from "../components/ai/AiBoat";

export const metadata = {
  metadataBase: new URL("https://quicksin.in"),

  title: {
    default: "Quick | Modern Full Stack Ecommerce Platform",
    template: "%s | Quick",
  },

  description:
    "Quick is a modern full-stack ecommerce platform built by Bhaskar Joshi. Discover top products, enjoy secure payments, fast delivery, and an extraordinary shopping experience.",

  keywords: [
    "Quick",
    "Ecommerce",
    "Online Shopping",
    "Full Stack Ecommerce",
    "Next.js Ecommerce",
    "React Ecommerce",
    "Bhaskar Joshi",
    "Shopping Platform",
    "Web Store",
    "mera store",
    "Ecommerce App",
    "Electronics",
    "Fashion",
    "Buy Online India",
  ],

  authors: [
    {
      name: "Bhaskar Joshi",
      url: "https://quicksin.in",
    },
  ],

  creator: "Bhaskar Joshi",
  publisher: "Quick",

  alternates: {
    canonical: "https://quicksin.in",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quicksin.in",
    siteName: "Quick",
    title: "Quick | Modern Full Stack Ecommerce Platform",
    description:
      "Shop the latest electronics, fashion, and everyday essentials with Quick, a modern full-stack ecommerce platform.",
    images: [
      {
        url: "/QuickLogo.png",
        width: 1200,
        height: 630,
        alt: "Quick Ecommerce Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Quick | Modern Full Stack Ecommerce Platform",
    description:
      "A powerful full-stack ecommerce platform built by Bhaskar Joshi.",
    images: ["/QuickLogo.png"],
    creator: "@vhbuyio",
  },

  category: "Ecommerce",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://quicksin.in/#organization",
      "name": "Quick",
      "url": "https://quicksin.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quicksin.in/QuickLogo.png"
      },
      "sameAs": [
        "https://twitter.com/vhbuyio",
        "https://www.instagram.com/vhbuyio"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://quicksin.in/#website",
      "url": "https://quicksin.in",
      "name": "Quick",
      "description": "Modern Full Stack Ecommerce Platform",
      "publisher": {
        "@id": "https://quicksin.in/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://quicksin.in/search?query={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Jost:ital,wght@0,100..900;1,100..900&family=ZCOOL+QingKe+HuangYou&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className={` antialiased`}>
        <ReduxProvider>
          {children}
          <AiBot />
          <ToastContainer
            position="bottom-center"
            autoClose={1500}
            hideProgressBar={true}
            closeOnClick
            pauseOnHover
            draggable={false}
            pauseOnFocusLoss={false}
            theme="colored"
            className="!w-80 sm:!w-96 !p-2 !text-sm !rounded-lg !shadow-lg"
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
