export default function ProductCard({product,router}){
    return(
         <a onClick={()=>router.push(`/products/${product.id}`)} className="group border cursor-pointer  border-foreground/10 p-2 bg-background">
              <img
                alt={product.imageAlt}
                src={product.images[0]}
                className="aspect-square w-full rounded-lg bg-background object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              
              <h3 className="mt-4 text-foreground line-clamp-1 font-extrabold">brand</h3>
              <h3 className="mt-1 text-sm text-foreground line-clamp-1">{product.name}</h3>
               <div className="mt-1 min-h-[48px]">
      <p className="text-sm font-bold text-foreground flex flex-wrap items-center gap-2 mb-2">
        <span className=" text-lg font-medium">₹{product.price}</span>
        <span className="line-through text-gray-500 font-normal">
          ₹{product.originalPrice}
        </span>
        <span className="text-green-600 font-bold whitespace-nowrap">
          {product.discount}% OFF
        </span>
      </p>
    </div>
              {/* <p className="mt-1 text-lg font-medium text-foreground">₹{product.price}</p> */}
            </a>
    )
}
