'use client'

import NoItemFound from '@/components/Cart/NoItemFound';
import { useState } from 'react'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { GetCartRequest } from '@/redux-store/Cart/action';


// Assuming this comes from props, context, or an API


// Helper function to safely extract numbers from price strings (e.g., "$12.99" -> 12.99)
const getSafePrice = (priceStr) => {
  if (!priceStr) return 0;
  // Removes any character that isn't a digit or a decimal point
  const numericString = priceStr.toString().replace(/[^0-9.]/g, '');
  return parseFloat(numericString) || 0;
};

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [cartProducts, setCartProducts] = useState(()=>useSelector((state) => state?.CartReducer?.cartdata));
const dispatch = useDispatch();

  useEffect(()=>{
  const usertoken = Cookies.get('usertoken');
dispatch(GetCartRequest({usertoken}));
},[])









  // 1. Safety Check: If data is completely null or empty, show NoItemFound
  if (!cartProducts || cartProducts?.length === 0) {
    return <NoItemFound />
  }

  // 2. Safely calculate total price with optional chaining and fallbacks
  const totalPrice = cartProducts?.reduce((acc, product) => {
    const price = getSafePrice(product?.price);
    const quantity = product?.quantity || 1; // Fallback to 1 if quantity is missing
    return acc + (price * quantity);
  }, 0) || 0;

  const handleCheckOut = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false) }, 2000)
  }

  const handleQuantity = (id, type) => {
    setCartProducts(prev =>
      prev?.map(product =>
        product?.id === id
          ? { 
              ...product, 
              quantity: type === 'inc' 
                ? (product?.quantity || 1) + 1 
                : Math.max((product?.quantity || 1) - 1, 1) 
            }
          : product
      )
    )
  }

  const handleRemove = id => {
    setCartProducts(prev => prev?.filter(product => product?.id !== id))
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Shopping Cart
          </h1>
          <span className="text-foreground/60 font-medium text-sm sm:text-base">
            {cartProducts?.length || 0} {cartProducts?.length === 1 ? 'item' : 'items'} in your cart
          </span>
        </div>

        {/* Layout: Stacks on mobile, splits 2/3 and 1/3 on Desktop */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Cart Items Container */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4 sm:gap-6">
            {cartProducts?.map(product => (
              <div 
                key={product?.id} 
                className="group relative flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border border-foreground/10 bg-background shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Product Image: Responsive sizing */}
                <div className="relative w-full sm:w-32 md:w-40 aspect-square sm:aspect-auto sm:h-32 md:h-40 flex-shrink-0 rounded-xl overflow-hidden bg-foreground/5">
                  <img 
                    src={product?.imageSrc || '/placeholder-image.jpg'} 
                    alt={product?.imageAlt || product?.name || 'Product Image'} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                {/* Product Details: min-w-0 prevents text from breaking the flex container */}
                <div className="flex flex-col flex-1 min-w-0 justify-between">
                  
                  <div className="flex justify-between items-start gap-4">
                    {/* Title & Price Container */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold break-words line-clamp-2">
                        {product?.name || 'Unknown Product'}
                      </h3>
                      <p className="text-sm sm:text-base text-foreground/60 mt-1 sm:mt-2">
                        {product?.price || '$0.00'}
                      </p>
                    </div>
                    
                    {/* Remove Button: Top right on desktop, stays visible on mobile */}
                    <button 
                      onClick={() => handleRemove(product?.id)}
                      className="flex-shrink-0 p-2 sm:p-2.5 text-red-500 bg-red-500/5 hover:bg-red-500/15 rounded-full transition-colors sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label="Remove item"
                    >
                      <FaTrash size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  {/* Quantity & Subtotal: Wraps nicely on extra small screens */}
                  <div className="flex flex-wrap justify-between items-center gap-4 mt-4 sm:mt-auto pt-4 sm:pt-0 border-t border-foreground/5 sm:border-transparent">
                    
                    {/* Pill-shaped Quantity Toggles */}
                    <div className="flex items-center gap-2 sm:gap-3 border border-foreground/20 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 bg-background shadow-sm">
                      <button 
                        onClick={() => handleQuantity(product?.id, 'dec')}
                        className="text-foreground/60 hover:text-foreground p-1 sm:p-1.5 transition-colors focus:outline-none focus:ring-1 focus:ring-foreground rounded-full"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="text-sm sm:text-base font-medium w-6 sm:w-8 text-center select-none">
                        {product?.quantity || 1}
                      </span>
                      <button 
                        onClick={() => handleQuantity(product?.id, 'inc')}
                        className="text-foreground/60 hover:text-foreground p-1 sm:p-1.5 transition-colors focus:outline-none focus:ring-1 focus:ring-foreground rounded-full"
                        aria-label="Increase quantity"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>

                    {/* Item Subtotal Price */}
                    <p className="font-bold text-base sm:text-lg md:text-xl">
                      ${(getSafePrice(product?.price) * (product?.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary Sidebar */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-8">
            <div className="border border-foreground/10 rounded-3xl p-5 sm:p-6 md:p-8 bg-foreground/5 flex flex-col gap-5 sm:gap-6 shadow-sm">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Order Summary</h2>
              
              <div className="flex flex-col gap-3 sm:gap-4 text-sm sm:text-base text-foreground/80">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-foreground font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Discount</span>
                  <span className="text-green-600 font-medium">-$0.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Estimated Tax</span>
                  <span className="text-foreground font-medium">Calculated at checkout</span>
                </div>
                
                <hr className="border-foreground/10 my-1 sm:my-2" />
                
                <div className="flex flex-wrap justify-between items-end gap-2 text-foreground">
                  <span className="text-base sm:text-lg md:text-xl font-bold">Total Price</span>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black break-words">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckOut}
                disabled={loading || totalPrice === 0}
                className={`group relative w-full py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg flex justify-center items-center gap-2 overflow-hidden transition-all duration-300 mt-2
                  ${(loading || totalPrice === 0)
                    ? 'bg-foreground/50 text-background/80 cursor-not-allowed' 
                    : 'bg-foreground text-background hover:bg-foreground/90 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]'
                  }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}












// 'use client'

// import { useState } from 'react'
// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
// import { FaCut, FaMinus, FaPlus } from 'react-icons/fa'

// const products = [
//   {
//     id: 1,
//     name: 'Throwback Hip Bag',
//     href: '#',
//     color: 'Salmon',
//     price: '$90.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
//     imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
//   },
//   {
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
//   {
//     id: 3,
//     name: 'Zip Tote Basket',
//     href: '#',
//     color: 'White and black',
//     price: '$140.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-03.jpg',
//     imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
//   },
// ]

// export default function page() {

//   const [loading , setLoading] = useState(false)  
//   const handleCheckOut=()=>{
//     setLoading(true)
//   }

//   return (
//  <div className='bg-background text-foreground gap-2  border border-red-300 flex flex-col md:flex-row p-10 justify-between'>
// <div className='flex flex-col gap-2 w-full  overflow-y-auto h-full'>

//  <div className='border border-foreground p-2 flex w-full '>

// <img src="QuickLogo.png" alt="item-image" className='w-30 h-30'></img>

// <div className='p-2 flex flex-col  overflow-hidden'>
// <a className='line-clamp-1'>item name dfgertav,mdegck d,ecgmnxfvm dfgnvnaknkvjbkbvkjbgvjbsjbvjfhgdfh sj hsrgvafgh fjhds
// </a>
// <a className='line-clamp-1'>item price</a>
// <div className='flex flex-col gap-2 md:flex-row  justify-between '>
// <div className="flex flex-row gap-4 items-center ">
//    <FaPlus className='text-foreground cursor-pointer border border-md border-foreground' size={20}></FaPlus>
//  <p>3</p>
//  <FaMinus className='text-foreground cursor-pointer border border-md border-foreground' size={20}></FaMinus>
// </div>
// <div className='border bg-foreground text-background border-foreground p-1 cursor-pointer overflow-hidden line-clamp-1 '>
//   Remove
// </div>
//   </div>
// </div>

// </div>
//  <div className='border border-foreground p-2 flex w-full '>

// <img src="QuickLogo.png" alt="item-image" className='w-30 h-30'></img>

// <div className='p-2 flex flex-col  overflow-hidden'>
// <a className='line-clamp-1'>item name dfgertav,mdegck d,ecgmnxfvm dfgnvnaknkvjbkbvkjbgvjbsjbvjfhgdfh sj hsrgvafgh fjhds
// </a>
// <a className='line-clamp-1'>item price</a>
// <div className='flex flex-col gap-2 md:flex-row  justify-between '>
// <div className="flex flex-row gap-4 items-center ">
//    <FaPlus className='text-foreground cursor-pointer border border-md border-foreground' size={20}></FaPlus>
//  <p>3</p>
//  <FaMinus className='text-foreground cursor-pointer border border-md border-foreground' size={20}></FaMinus>
// </div>
// <div className='border bg-foreground text-background border-foreground p-1 cursor-pointer overflow-hidden line-clamp-1 '>
//   Remove
// </div>
//   </div>
// </div>

// </div>
// <div className='border border-foreground p-2 flex w-full '>

// <img src="QuickLogo.png" alt="item-image" className='w-30 h-30'></img>

// <div className='p-2 flex flex-col  overflow-hidden'>
// <a className='line-clamp-1'>item name dfgertav,mdegck d,ecgmnxfvm dfgnvnaknkvjbkbvkjbgvjbsjbvjfhgdfh sj hsrgvafgh fjhds
// </a>
// <a className='line-clamp-1'>item price</a>
// <div className='flex flex-col gap-2 md:flex-row  justify-between '>
// <div className="flex flex-row gap-4 items-center ">
//    <FaPlus className='text-foreground cursor-pointer border border-md border-foreground' size={20}></FaPlus>
//  <p>3</p>
//  <FaMinus className='text-foreground cursor-pointer border border-md border-foreground' size={20}></FaMinus>
// </div>
// <div className='border bg-foreground text-background border-foreground p-1 cursor-pointer overflow-hidden line-clamp-1 '>
//   Remove
// </div>
//   </div>
// </div>

// </div>
// <div className='border border-foreground p-2 flex w-full '>

// <img src="QuickLogo.png" alt="item-image" className='w-30 h-30'></img>

// <div className='p-2 flex flex-col  overflow-hidden'>
// <a className='line-clamp-1'>item name dfgertav,mdegck d,ecgmnxfvm dfgnvnaknkvjbkbvkjbgvjbsjbvjfhgdfh sj hsrgvafgh fjhds
// </a>
// <a className='line-clamp-1'>item price</a>
// <div className='flex flex-col gap-2 md:flex-row  justify-between '>
// <div className="flex flex-row gap-4 items-center ">
//    <FaPlus className='text-foreground cursor-pointer border border-md border-foreground' size={20}></FaPlus>
//  <p>3</p>
//  <FaMinus className='text-foreground cursor-pointer border border-md border-foreground' size={20}></FaMinus>
// </div>
// <div className='border bg-foreground text-background border-foreground p-1 cursor-pointer overflow-hidden line-clamp-1 '>
//   Remove
// </div>
//   </div>
// </div>

// </div>

// <div className='border border-foreground p-2 flex w-full '>

// <img src="QuickLogo.png" alt="item-image" className='w-30 h-30'></img>

// <div className='p-2 flex flex-col  overflow-hidden'>
// <a className='line-clamp-1'>item name dfgertav,mdegck d,ecgmnxfvm dfgnvnaknkvjbkbvkjbgvjbsjbvjfhgdfh sj hsrgvafgh fjhds
// </a>
// <a className='line-clamp-1'>item price</a>
// <div className='flex flex-col gap-2 md:flex-row  justify-between '>
// <div className="flex flex-row gap-4 items-center ">
//    <FaPlus className='text-foreground cursor-pointer border border-md border-foreground' size={20}></FaPlus>
//  <p>3</p>
//  <FaMinus className='text-foreground cursor-pointer border border-md border-foreground' size={20}></FaMinus>
// </div>
// <div className='border bg-foreground text-background border-foreground p-1 cursor-pointer overflow-hidden line-clamp-1 '>
//   Remove
// </div>
//   </div>
// </div>

// </div>
// </div>


// <div className='border border-foreground p-2 w-full md:w-100 h-100'>
 
//  <a className='text-2xl font-bold'> CheckOut </a>
//  <div>
//    <div className="flex justify-between"><p>Original Price </p>234235<p></p></div>
// <div className="flex justify-between"><p>Total Discount  </p>234235<p></p></div>
// <hr/>

// <div className="flex justify-between"><p>Total Price  </p>234235<p></p></div>

//  </div>
//  <div>
//   <button onClick={()=>handleCheckOut()} className={loading ? 'border border-foreground animate-pulse' :'border border-foreground ' }>{loading?'Processing..':'Checkout'}</button>
//   </div>


//  </div>

//  </div>
//   )
// }
