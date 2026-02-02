
import "./globals.css";


export const metadata = {
  title: "Quick",
  description: "Full Stack Ecommerece app Built By Bhaskar Joshi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
