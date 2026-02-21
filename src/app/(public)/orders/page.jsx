
'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FilterIcon } from 'lucide-react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import OrderItemComponent from '@/components/Orders/OrderItemComponent/OrderItemComponents'

export default function page(){
    const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 3,
    name: 'Zip Tote Basket',
    href: '#',
    color: 'White and black',
    price: '$140.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-03.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
  },
]
    return(
        <>
        <h1 className='text-foreground p-4 text-3xl font-bold'>
          Orders
        </h1>
  <div className="bg-background text-foreground gap-2   flex flex-col md:flex-row p-10 justify-between">
      <div className="flex flex-col gap-2 w-full overflow-y-auto h-full">
        {products.map(product => (
          <OrderItemComponent key={product.id} product={product} />
        ))}
      </div>
</div>
        </>
    )
}