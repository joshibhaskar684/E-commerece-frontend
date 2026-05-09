"use client"

import { SearchIcon } from "lucide-react"

export default function SearchBar({searchfunction}){
    const handle_Search=(e)=>{
        e.preventDefault()
        const FormData=new FormData(e.target.form)
        const searchQuery=FormData.get("searchTopic")
        console.log(searchQuery)
        searchfunction(searchQuery)
    }
    return(
        <form className="p-5 bg-background text-foreground    flex items-center gap-4">
<input type="text" name="searchTopic" placeholder="Search for products, brands and more" className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
<button type="button" onClick={handle_Search} className=" border border-gray-300 p-2 rounded-md"><SearchIcon/></button>

        </form>
    )
}