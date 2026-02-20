"use client"
export default function ProductListComponent({SectionName, products ,Link}) {
  return (
    <>
<div className="mt-10 bg-background text-foreground grid grid-cols-1 p-2 md:p-6 ">
<div className="flex items-center justify-between  p-3">

  <h2 className="text-xl font-bold">
    {SectionName}
  </h2>

  <a href={Link} className="bg-yellow-500 hover:bg-yellow-600 text-foreground rounded px-3 py-1 text-sm font-semibold transition-colors duration-200">
    View All
  </a>

</div>

   
      <div className="p-2 grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 gap-2 border border-foreground/10 rounded">
{
    products.map((product,index) => (

        <div className="grid grid-cols-1 cursor-pointer h-full" key={index}>
  
  <img
    src={product.image[0]}
    alt={product.imageAlt}
    className="w-full object-cover rounded"
  />

  <div className="py-3 flex flex-col h-full">

    <h1 className="text-xs font-bold">
      {product.brand}
    </h1>

    <h3 className="text-sm line-clamp-1">
      {product.name}
    </h3>

    {/* Price Section */}
    <div className="mt-2 min-h-[48px]">
      <p className="text-sm font-bold text-foreground flex flex-wrap items-center gap-2 mb-2">
        <span>₹ {product.price}</span>
        <span className="line-through text-gray-500 font-normal">
          ₹ {product.Original_price}
        </span>
        <span className="text-green-500 font-medium whitespace-nowrap">
          {product.discount}% off
        </span>
      </p>
    </div>

    {/* Button */}
    <button className="bg-background w-full mt-auto border hover:bg-foreground hover:text-background font-bold text-foreground px-4 py-2 rounded transition-colors duration-200">
      Add to Cart
    </button>

  </div>
</div>

        // <div className="grid grid-cols-1 cursor-pointer  " key={index}>
        //     <img src={product.image[0]}></img>
        //     <div className="py-3">
        //         <h1 className="text-xs font-bold ">{product.brand}</h1>
        //         <h3 className="text-sm line-clamp-1">{product.name}</h3>
        //           <p className="text-sm font-bold text-foreground mt-2 flex flex-wrap ">₹ {product.price} <span className="line-through text-sm font-normal text-gray-500 ml-2">₹ {product.Original_price}</span> <span className="text-green-500 whitespace-nowrap text-sm font-medium ml-2">{product.discount}% off</span></p>
        //         <button className="bg-background w-full mt-2 cursor-pointer border hover:bg-foreground hover:text-background font-bold text-foreground px-4 py-2 rounded ">Add to Cart</button>
         
        //          </div>

        //     </div>
    ))
}

    </div>
</div>
    </>
    )}