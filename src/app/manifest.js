export default function manifest() {
  return {
    name: 'Quick - Modern Full Stack Ecommerce',
    short_name: 'Quick',
    description: 'Quick is a modern full-stack ecommerce platform built by Bhaskar Joshi. Discover products, enjoy secure payments, fast checkout, and a seamless shopping experience.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#000000',
    categories: ['shopping', 'ecommerce', 'lifestyle'],
    icons: [
      {
        src: '/QuickLogo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/QuickLogo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Browse Products',
        short_name: 'Products',
        description: 'Browse all available products on Quick',
        url: '/products',
        icons: [{ src: '/QuickLogo.png', sizes: '192x192' }],
      },
      {
        name: 'Search Items',
        short_name: 'Search',
        description: 'Search products on Quick',
        url: '/search',
        icons: [{ src: '/QuickLogo.png', sizes: '192x192' }],
      },
    ],
  };
}
