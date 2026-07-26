"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Loader2, X, TrendingUp, Package, Clock, ArrowRight } from "lucide-react"

// Dummy product dataset for API simulation
const DUMMY_PRODUCTS = [
    { id: 1, name: "Wireless Noise-Canceling Headphones", category: "Electronics", price: "$199.99" },
    { id: 2, name: "Gaming Laptop RTX 4080", category: "Computers", price: "$1,499.00" },
    { id: 3, name: "Ultra HD Smart TV 55-inch", category: "Electronics", price: "$499.50" },
    { id: 4, name: "Mechanical RGB Gaming Keyboard", category: "Accessories", price: "$79.99" },
    { id: 5, name: "Smartwatch Fitness Tracker Series 9", category: "Wearables", price: "$249.00" },
    { id: 6, name: "Classic Organic Cotton T-Shirt", category: "Fashion", price: "$29.99" },
    { id: 7, name: "Slim Fit Stretch Denim Jeans", category: "Fashion", price: "$59.99" },
    { id: 8, name: "Genuine Leather Biker Jacket", category: "Fashion", price: "$189.00" },
    { id: 9, name: "Pro Cushion Running Sports Shoes", category: "Footwear", price: "$89.95" },
    { id: 10, name: "Polarized Classic Sunglasses", category: "Accessories", price: "$39.99" },
    { id: 11, name: "Ergonomic Mesh Office Chair", category: "Furniture", price: "$159.00" },
    { id: 12, name: "Air Fryer XL 5.5L Digital", category: "Home & Kitchen", price: "$99.99" },
    { id: 13, name: "Insulated Stainless Steel Water Bottle", category: "Home & Kitchen", price: "$24.99" },
    { id: 14, name: "Automatic Espresso Coffee Machine", category: "Appliances", price: "$299.99" },
    { id: 15, name: "Ergonomic Wireless Optical Mouse", category: "Accessories", price: "$34.99" }
]

const POPULAR_SEARCHES = [
    "Headphones",
    "Gaming Laptop",
    "Running Shoes",
    "Smartwatch",
    "Coffee Machine"
]

export default function SearchBar({ searchfunction }) {
    const [searchTopic, setSearchTopic] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [countdown, setCountdown] = useState(5)
    
    const DEBOUNCE_DELAY = 5000 // 5 seconds debouncing as requested
    const timerRef = useRef(null)
    const countdownIntervalRef = useRef(null)
    const containerRef = useRef(null)

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

    // Clear timers helper
    const clearTimers = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
    }

    // Trigger debounced dummy API search
    const handleInputChange = (e) => {
        const val = e.target.value
        setSearchTopic(val)
        setShowDropdown(true)

        clearTimers()

        if (!val.trim()) {
            setSuggestions([])
            setIsTyping(false)
            setIsSearching(false)
            return
        }

        setIsTyping(true)
        setIsSearching(false)
        setCountdown(5)

        // Countdown timer visualization for user
        let currentSeconds = 5
        countdownIntervalRef.current = setInterval(() => {
            currentSeconds -= 1
            if (currentSeconds >= 0) {
                setCountdown(currentSeconds)
            } else {
                clearInterval(countdownIntervalRef.current)
            }
        }, 1000)

        // 5-second debounce timer before calling API
        timerRef.current = setTimeout(async () => {
            setIsTyping(false)
            setIsSearching(true)

            // Simulate API response delay (300ms)
            await new Promise((res) => setTimeout(res, 300))

            const query = val.toLowerCase().trim()
            const filtered = DUMMY_PRODUCTS.filter(
                (item) =>
                    item.name.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query)
            )

            setSuggestions(filtered)
            setIsSearching(false)
        }, DEBOUNCE_DELAY)
    }

    const handleSearchSubmit = (queryToSubmit) => {
        const targetQuery = queryToSubmit !== undefined ? queryToSubmit : searchTopic
        if (targetQuery && targetQuery.trim()) {
            clearTimers()
            setIsTyping(false)
            setShowDropdown(false)
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
        setSuggestions([])
        clearTimers()
        setIsTyping(false)
        setIsSearching(false)
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

                {/* Dummy Suggestion Dropdown */}
                {showDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-lg">
                        
                        {/* Status Header for 5s Debounce explanation */}
                        <div className="px-4 py-2 bg-gray-100/70 dark:bg-gray-800/70 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                            <span className="flex items-center gap-1.5 font-medium">
                                <Clock className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
                                API Debounce: <strong className="text-yellow-600 dark:text-yellow-400">5 seconds</strong>
                            </span>
                            {isTyping && (
                                <span className="bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300 px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1">
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
                                    Waiting for typing to stop... ({countdown}s)
                                </span>
                            )}
                            {isSearching && (
                                <span className="bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1">
                                    <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                                    Fetching API suggestions...
                                </span>
                            )}
                            {!isTyping && !isSearching && searchTopic.trim() && (
                                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                    API Called ✓
                                </span>
                            )}
                        </div>

                        {/* Content Body */}
                        <div className="max-h-80 overflow-y-auto p-2">
                            {/* State 1: Typing - waiting for 5s debounce */}
                            {isTyping && (
                                <div className="py-6 px-4 text-center">
                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 mb-2">
                                        <Clock className="w-5 h-5 animate-spin" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Debouncing active...
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        API will trigger in <span className="font-bold text-yellow-600 dark:text-yellow-400">{countdown} seconds</span> after you stop typing.
                                    </p>
                                </div>
                            )}

                            {/* State 2: Fetching API results */}
                            {!isTyping && isSearching && (
                                <div className="py-6 px-4 text-center">
                                    <Loader2 className="w-6 h-6 animate-spin text-yellow-500 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Searching for &quot;<span className="font-semibold text-gray-900 dark:text-white">{searchTopic}</span>&quot;...
                                    </p>
                                </div>
                            )}

                            {/* State 3: Show Suggestions list after API call */}
                            {!isTyping && !isSearching && searchTopic.trim() && (
                                suggestions.length > 0 ? (
                                    <div className="space-y-1">
                                        <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            Matching Suggestions ({suggestions.length})
                                        </div>
                                        {suggestions.map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => handleSearchSubmit(item.name)}
                                                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-950/30 flex items-center justify-between group transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                                                        <Package className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            in <span className="font-medium text-gray-500 dark:text-gray-400">{item.category}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                                                        {item.price}
                                                    </span>
                                                    <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </button>
                                        ))}
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

                            {/* State 4: Default view when input is empty */}
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