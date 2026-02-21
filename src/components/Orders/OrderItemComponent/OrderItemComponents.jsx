export default function OrderItemComponent({product}){
    return(
        <>
        <a href="/orders/10" className=" border border-foreground/10 rounded bg-foreground/10 flex ">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="w-24 h-24 object-cover rounded m-2"
        />
        <div  className="grid grid-cols-1 p-2">

<h1 className="text-sm font-bold  line-clamp-1">Brand</h1>
<h3 className="text-xs  line-clamp-1">{product.name}</h3>
<h3 className="text-xs font-bold  line-clamp-1">Delivery Excepted By :</h3>
<h3 className="text-xs  line-clamp-1">Status:</h3>  
{/* <h3 className="text-xs border line-clamp-1">{product.deliveryDate}</h3> */}
            </div>
        </a>
        </>
    )
}