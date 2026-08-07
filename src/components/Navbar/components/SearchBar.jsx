"use client"

import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Search, Loader2, X, TrendingUp, Package, ArrowRight } from "lucide-react"
import { getSuggestions, clearSuggestions } from "@/redux-store/products/action"

const POPULAR_SEARCHES = [
    "Headphones",
    "Gaming Laptop",
    "Running Shoes",
    "Smartwatch",
    "Coffee Machine"
]

export default function SearchBar({ searchfunction }) {
    const dispatch = useDispatch()
    const suggestions = useSelector((state) => state.ProductReducer.suggestions) || []
    const isSuggestionsLoading = useSelector((state) => state.ProductReducer.isSuggestionsLoading)

    const [searchTopic, setSearchTopic] = useState("")
    const [showDropdown, setShowDropdown] = useState(false)
    const timerRef = useRef(null)
    const containerRef = useRef(null)

    const DEBOUNCE_DELAY = 400

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleInputChange = (e) => {
        const val = e.target.value
        setSearchTopic(val)
        setShowDropdown(true)

        if (timerRef.current) clearTimeout(timerRef.current)

        if (!val.trim()) {
            dispatch(clearSuggestions())
            return
        }

        // Debounced dispatch to fetch Elasticsearch suggestions from backend
        timerRef.current = setTimeout(() => {
            dispatch(getSuggestions(val.trim()))
        }, DEBOUNCE_DELAY)
    }

    const handleSearchSubmit = (queryToSubmit) => {
        const targetQuery = queryToSubmit !== undefined ? queryToSubmit : searchTopic
        if (targetQuery && targetQuery.trim()) {
            if (timerRef.current) clearTimeout(timerRef.current)
            setShowDropdown(false)
            dispatch(clearSuggestions())
            if (searchfunction) {
                searchfunction(targetQuery.trim())
            }
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        handleSearchSubmit(searchTopic)
    }

    const handleClear = () => {
        setSearchTopic("")
        if (timerRef.current) clearTimeout(timerRef.current)
        dispatch(clearSuggestions())
        setShowDropdown(false)
    }

    return (
        <form 
            onSubmit={handleFormSubmit}
            className="px-4 py-3 sm:px-6 lg:px-8 mx-auto max-w-7xl flex items-center justify-center relative"
        >
            <div ref={containerRef} className="relative w-full max-w-2xl">
                <div className="relative flex items-center">
                    <Search className="absolute left-3 text-[#facc15] dark:text-yellow-400 w-5 h-5" />
                    
                    <input 
                        type="text" 
                        name="searchTopic" 
                        value={searchTopic}
                        onChange={handleInputChange}
                        onFocus={() => setShowDropdown(true)}
                        placeholder="Search for products, brands and categories..." 
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full py-2.5 pl-10 pr-24 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all text-sm shadow-sm" 
                        autoComplete="off"
                    />

                    <div className="absolute right-2 flex items-center gap-1.5">
                        {searchTopic && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                title="Clear"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                        <button 
                            type="submit" 
                            className="p-1.5 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full transition-colors font-medium shadow-sm flex items-center justify-center"
                            title="Search"
                        >
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Suggestions Dropdown powered by Elasticsearch & Redux */}
                {showDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-lg">
                        
                        <div className="max-h-80 overflow-y-auto p-2">
                            {/* Loading State */}
                            {isSuggestionsLoading && (
                                <div className="py-6 px-4 text-center">
                                    <Loader2 className="w-6 h-6 animate-spin text-yellow-500 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Searching suggestions for &quot;<span className="font-semibold text-gray-900 dark:text-white">{searchTopic}</span>&quot;...
                                    </p>
                                </div>
                            )}

                            {/* Suggestions List from Redux Store */}
                            {!isSuggestionsLoading && searchTopic.trim() && (
                                suggestions && suggestions.length > 0 ? (
                                    <div className="space-y-1">
                                        <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            Suggestions ({suggestions.length})
                                        </div>
                                        {suggestions.map((item, index) => {
                                            const itemTitle = item.title || item.name || item.productName || (typeof item === 'string' ? item : item.id) || `Item ${index + 1}`
                                            const itemCategory = item.category || item.categoryName || item.brand
                                            const itemPrice = item.price ? (typeof item.price === 'number' ? `$${item.price}` : item.price) : null

                                            return (
                                                <button
                                                    key={item.id || index}
                                                    type="button"
                                                    onClick={() => handleSearchSubmit(itemTitle)}
                                                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-950/30 flex items-center justify-between group transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                                                            <Package className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                                                                {itemTitle}
                                                            </p>
                                                            {itemCategory && (
                                                                <p className="text-xs text-gray-400">
                                                                    in <span className="font-medium text-gray-500 dark:text-gray-400">{itemCategory}</span>
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {itemPrice && (
                                                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                                                                {itemPrice}
                                                            </span>
                                                        )}
                                                        <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className="py-6 px-4 text-center">
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            No suggestions found for &quot;<span className="italic">{searchTopic}</span>&quot;
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Press enter to perform a full search.
                                        </p>
                                    </div>
                                )
                            )}

                            {/* Popular Searches when input is empty */}
                            {!searchTopic.trim() && (
                                <div className="p-2 space-y-3">
                                    <div>
                                        <div className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                            <TrendingUp className="w-3.5 h-3.5 text-yellow-500" />
                                            Popular Searches
                                        </div>
                                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                                            {POPULAR_SEARCHES.map((term, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => {
                                                        setSearchTopic(term)
                                                        handleSearchSubmit(term)
                                                    }}
                                                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-yellow-500 hover:text-black dark:hover:bg-yellow-500 dark:hover:text-black rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 transition-colors"
                                                >
                                                    {term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </form>
    )
}