

import "./globals.css";
import ReduxProvider from './../redux-store/ReduxProvider/ReduxProvider';
import { ToastContainer } from "react-toastify";
import AiBot from "../components/ai/AiBoat";

export const metadata = {
  metadataBase: new URL("https://yourdomain.com"),

  title: {
    default: "Quick | Modern Full Stack Ecommerce Platform",
    template: "%s | Quick",
  },

  description:
    "Quick is a modern full-stack ecommerce platform built by Bhaskar Joshi. Discover products, secure payments, fast checkout, and a seamless shopping experience.",

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
  ],

  authors: [
    {
      name: "Bhaskar Joshi",
      url: "https://yourdomain.com",
    },
  ],

  creator: "Bhaskar Joshi",
  publisher: "Quick",

  alternates: {
    canonical: "https://yourdomain.com",
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
    url: "https://yourdomain.com",
    siteName: "Quick",
    title: "Quick | Modern Full Stack Ecommerce Platform",
    description:
      "Shop the latest products with Quick, a modern full-stack ecommerce platform built using cutting-edge web technologies.",
    images: [
      {
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
    creator: "@yourtwitterhandle",
  },

  category: "Ecommerce",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Jost:ital,wght@0,100..900;1,100..900&family=ZCOOL+QingKe+HuangYou&display=swap" rel="stylesheet"/>
  </head>

      <body
        className={` antialiased`}
      >
        <ReduxProvider>
        {children}
        <AiBot />
         <ToastContainer
  position="bottom-center"           // bottom center
  autoClose={1500}                  // shorter auto close
  hideProgressBar={true}            // hide progress bar for minimal look
  closeOnClick
  pauseOnHover
  draggable={false}                  // simpler, cleaner
  pauseOnFocusLoss={false}
  theme="colored"
  className="!w-80 sm:!w-96 !p-2 !text-sm !rounded-lg !shadow-lg"
/>
        </ReduxProvider>
      </body>
    </html>
  );
}
