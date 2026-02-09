import { FeaturedData } from './FeaturedData';
export default function Featured(){
    return(
        <>
        <div>
            <h2 className="text-2xl text-foreground font-bold mb-4 p-4">Featured Products</h2>
             <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 place-items-center mb-10 p-4 ">
                {
                    FeaturedData.map((product)=>{
                        return(
                            <a key={product.id} className="flex border border-yellow-400 h-full w-full rounded-md flex-col items-center justify-center gap-2 p-4" href={product.path}>
                                <img alt={product.name} src={product.image}  className="w-40 h-40  rounded-md" />
                                 <span className="text-sm font-sm">{product.name}</span>
                            </a>
                        )
                    })
                }
                </div>
       

        </div>
        </>
    )
}