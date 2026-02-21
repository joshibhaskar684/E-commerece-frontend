import Sidebar from "@/components/Products/Sidebar/Sidebar"

const products = [
  {
    id: 1,
    Original_price:"90",
discount:"64",
    name: 'Earthen Bottle',
     href: '/products/10',
    price: '48',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    Original_price:"90",
discount:"64",
    name: 'Nomad Tumbler',
   href: '/products/10',
    price: '35',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    Original_price:"90",
discount:"64",
    name: 'Focus Paper Refill',
    href: '/products/10',
    price: '89',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    Original_price:"90",
discount:"64",
    name: 'Machined Mechanical Pencil',
     href: '/products/10',
    price: '35',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 5,
    Original_price:"90",
discount:"64",
    name: 'Focus Card Tray',
  href: '/products/10',
    price: '64',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg',
    imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
  },
  {
    id: 6,
    Original_price:"90",
discount:"64",
    name: 'Focus Multi-Pack',
 href: '/products/10',
    price: '39',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-06.jpg',
    imageAlt: 'Stack of 3 small drab green cardboard paper card refill boxes with white text.',
  },
  {
    id: 7,
    Original_price:"90",
discount:"64",
    name: 'Brass Scissors',
 href: '/products/10',
    price: '50',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-07.jpg',
    imageAlt: 'Brass scissors with geometric design, black steel finger holes, and included upright brass stand.',
  },
  {
    id: 8,
    name: 'Focus Carry Pouch',
Original_price:"90",
discount:"64",
     href: '/products/10',
    price: '32',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg',
    imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
  },
  {
    id: 9,
    name: 'Focus Carry Pouch',
Original_price:"90",
discount:"64",
     href: '/products/10',
    price: '32',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg',
    imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
  },{
    id: 10,
    Original_price:"90",
discount:"64",
    name: 'Focus Carry Pouch',
    href: '/products/10',
    price: '32',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg',
    imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
  },
]

export default function page() {
  return (
    <div className="bg-background ">
       <div className="sticky top-32 z-1 bg-background">
                 <Sidebar/>
                  </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-2  divide-foreground/10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 ">
          {products.map((product) => (
            
            <a key={product.id} href={product.href} className="group border  border-foreground/10 p-2 bg-background">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-lg bg-background object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              
              <h3 className="mt-4 text-foreground line-clamp-1 font-extrabold">brand</h3>
              <h3 className="mt-1 text-sm text-foreground line-clamp-1">{product.name}</h3>
               <div className="mt-1 min-h-[48px]">
      <p className="text-sm font-bold text-foreground flex flex-wrap items-center gap-2 mb-2">
        <span className=" text-lg font-medium">₹{product.price}</span>
        <span className="line-through text-gray-500 font-normal">
          ₹{product.Original_price}
        </span>
        <span className="text-green-600 font-bold whitespace-nowrap">
          {product.discount}% OFF
        </span>
      </p>
    </div>
              {/* <p className="mt-1 text-lg font-medium text-foreground">₹{product.price}</p> */}
            </a>
            
          ))}
        </div>

      </div>
    </div>
  )
}
