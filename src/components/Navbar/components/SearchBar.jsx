"use client"

import { SearchIcon } from "lucide-react"

export default function SearchBar({}){
    return(
        <form className="p-5 bg-background text-foreground  sticky top-0 z-1  flex items-center gap-4">
<input type="text" placeholder="Search for products, brands and more" className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
<button type="submit" className=" border border-gray-300 p-2 rounded-md"><SearchIcon/></button>

        </form>
    )
}