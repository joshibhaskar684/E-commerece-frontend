
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
