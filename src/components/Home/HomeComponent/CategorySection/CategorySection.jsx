"use client"
import { Avatar } from "@mui/material"
import { CategoryData } from "./CategoryData"
import { useRouter } from "next/navigation"

export default function CategorySection() {
    const router=useRouter();
    return(
        <>
        <div className="grid grid-cols-3 cursor-pointer gap-2 lg:grid-cols-6 mt-10 mb-10">
            {
                CategoryData.map((category)=>{
                    return(
                        <a key={category.id} className="flex flex-col items-center justify-center gap-2" onClick={()=>router.push(category.path)}>
                            <Avatar alt={category.name} src={category.image}  sx={{ width: 76, height: 76 }} />
                             <span className="text-sm font-medium">{category.name}</span>
                        </a>
                    )
                })
            }

        </div>
        </>
    )
}