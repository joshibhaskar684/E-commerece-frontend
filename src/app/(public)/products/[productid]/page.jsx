import ProductDetailsClient from "./ProductDetailsClient";

export async function generateMetadata({ params }) {
  const { productid } = await params;
  const baseUrl = "https://quicksin.in";

  return {
    title: `Product Details | Quick`,
    description: `Shop product #${productid} on Quick. Enjoy secure payments, original quality products, fast shipping, and easy returns.`,
    alternates: {
      canonical: `${baseUrl}/products/${productid}`,
    },
    openGraph: {
      title: `Product Details | Quick`,
      description: `Discover product #${productid} on Quick - Modern Full Stack Ecommerce Platform.`,
      url: `${baseUrl}/products/${productid}`,
      siteName: "Quick",
      images: [
        {
          url: "/QuickLogo.png",
          width: 1200,
          height: 630,
          alt: "Quick Product Details",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Product Details | Quick`,
      description: `Shop product #${productid} on Quick.`,
      images: ["/QuickLogo.png"],
    },
  };
}

export default async function Page({ params }) {
  const { productid } = await params;

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `Product #${productid}`,
    "image": ["https://quicksin.in/QuickLogo.png"],
    "description": "High quality product available on Quick Store.",
    "sku": productid,
    "offers": {
      "@type": "Offer",
      "url": `https://quicksin.in/products/${productid}`,
      "priceCurrency": "INR",
      "price": "999",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailsClient />
    </>
  );
}
