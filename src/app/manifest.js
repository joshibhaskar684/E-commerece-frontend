export default function manifest() {
  return {
    name: 'Quick ',
    short_name: 'Quick',
    description: 'A powerful full-stack ecommerce platform built by Bhaskar Joshi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/QuickLogo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/QuickLogo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
