'use client'

import { useState } from 'react'
import { FaCut, FaMinus, FaPlus } from 'react-icons/fa'

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 3,
    name: 'Zip Tote Basket',
    price: '$140.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-03.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
  },
]

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [cartProducts, setCartProducts] = useState(products)

  const handleCheckOut = () => {
    setLoading(true)
  }

  const handleQuantity = (id, type) => {
    setCartProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, quantity: type === 'inc' ? product.quantity + 1 : Math.max(product.quantity - 1, 1) }
          : product
      )
    )
  }

  const handleRemove = id => {
    setCartProducts(prev => prev.filter(product => product.id !== id))
  }

  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + parseFloat(product.price.replace('$', '')) * product.quantity,
    0
  )

  return (
    <div className="bg-background text-foreground gap-8   flex flex-col md:flex-row p-10 justify-between">
      <div className="flex flex-col gap-4 w-full overflow-y-auto h-full">
        {cartProducts.map(product => (
          <div key={product.id} className="border border-foreground/10 bg-foreground/10 p-2 rounded flex w-full">
            <img src={product.imageSrc} alt={product.imageAlt} className="w-32 h-32 object-cover rounded" />
            <div className="p-2 flex flex-col overflow-hidden gap-2 flex-1">
              <p className="line-clamp-1 font-semibold">{product.name}</p>
              <p className="line-clamp-1">{product.price}</p>
              <div className="flex flex-col gap-2 md:flex-row justify-between mt-auto">
                <div className="flex flex-row gap-4 items-center">
                  <FaPlus
                    className="text-foreground cursor-pointer border border-foreground p-1 rounded"
                    size={20}
                    onClick={() => handleQuantity(product.id, 'inc')}
                  />
                  <p>{product.quantity}</p>
                  <FaMinus
                    className="text-foreground cursor-pointer border border-foreground p-1 rounded"
                    size={20}
                    onClick={() => handleQuantity(product.id, 'dec')}
                  />
                </div>
                <div
                  className="border bg-foreground text-background rounded border-foreground p-2 cursor-pointer line-clamp-1 text-center"
                  onClick={() => handleRemove(product.id)}
                >
                  Remove
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded border-foreground/10 bg-foreground/10 p-4 w-full md:w-80 h-fit flex flex-col gap-4">
        <p className="text-2xl font-bold">CheckOut</p>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p>Original Price</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Total Discount</p>
            <p>$0.00</p>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <p>Total Price</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
        </div>
        <button
          onClick={handleCheckOut}
          className={`border border-foreground bg-foreground text-background cursor-pointer rounded p-2 mt-4 ${loading ? 'animate-pulse' : ''}`}
        >
          {loading ? 'Processing...' : 'Checkout'}
        </button>
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
