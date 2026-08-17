export default function robots() {
  const baseUrl = "https://quicksin.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/products/", "/search/", "/policy/"],
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/account/",
          "/cart/",
          "/checkout/",
          "/orders/",
          "/login/",
          "/register/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/products/", "/search/", "/policy/"],
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/account/",
          "/cart/",
          "/checkout/",
          "/orders/",
        ],
      },
      {
        userAgent: "Bingbot",
        allow: ["/", "/products/", "/search/", "/policy/"],
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/account/",
          "/cart/",
          "/checkout/",
          "/orders/",
        ],
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`],
    host: baseUrl,
  };
}