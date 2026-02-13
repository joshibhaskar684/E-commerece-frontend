
import "./globals.css";
import ReduxProvider from './../redux-store/ReduxProvider/ReduxProvider';
import { ToastContainer } from "react-toastify";


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
