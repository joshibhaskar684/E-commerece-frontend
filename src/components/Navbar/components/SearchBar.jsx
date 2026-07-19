"use client"

import { SearchIcon } from "lucide-react"

export default function SearchBar({ searchfunction }) {
    const handle_Search = (e) => {
        e.preventDefault()
        const FormData = new window.FormData(e.target.form || e.target.closest('form'))
        const searchQuery = FormData.get("searchTopic")
        if (searchQuery) {
            searchfunction(searchQuery)
        }
    }
    
    return (
        <form 
            onSubmit={handle_Search}
            className="px-4 py-3 sm:px-6 lg:px-8 mx-auto max-w-7xl flex items-center justify-center"
        >
            <div className="relative w-full max-w-2xl flex items-center">
                <SearchIcon className="absolute left-3 text-muted-foreground w-5 h-5 text-gray-400" />
                <input 
                    type="text" 
                    name="searchTopic" 
                    placeholder="Search for products, brands and more..." 
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full py-2.5 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all text-sm" 
                />
                <button 
                    type="submit" 
                    className="absolute right-1.5 p-1.5 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full transition-colors"
                >
                    <SearchIcon className="w-4 h-4" />
                </button>
            </div>
        </form>
    )
}