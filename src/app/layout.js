
import "./globals.css";
import ReduxProvider from './../redux-store/ReduxProvider/ReduxProvider';


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
        <ReduxProvider>
        {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
