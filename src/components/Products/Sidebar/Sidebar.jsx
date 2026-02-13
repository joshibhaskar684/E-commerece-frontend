"use client"
import { useState } from "react";
import Filter from "./components/Filter";
import SortOption from "./components/SortOption";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";

export default function Sidebar(){
    const [open, setOpen] = useState(false);

    const [activeCategory, setActiveCategory] = useState(null);
const [activeSection, setActiveSection] = useState(null);
const [selectedItem, setSelectedItem] = useState(null);
const [color, setColor] = useState(null);
const [brands, setBrands] = useState(null);
const [activeColor, setActiveColor] = useState(null);
const [activeBrand, setActiveBrand] = useState(null);
const [activeBrandsId, setActiveBrandsId] = useState(null);

const ClearAllFilter=()=>{
    setActiveCategory(null);
    setActiveSection(null);
    setSelectedItem(null);
    setColor(null);
    setBrands(null);
    setActiveColor(null);
    setActiveBrand(null);
}


const ApplyFilters=()=>{
    if(activeCategory===null && activeSection===null && selectedItem===null && color===null && brands===null && activeColor===null && activeBrand===null && activeBrandsId===null){
toast.error("Please select a filter")
        return;
    }
    console.log(
        activeCategory,
        activeSection,
        selectedItem,
        color,
        brands,
       
    )
}


    return(
        <div className="flex items-center justify-between  gap-4 p-5">
<SortOption/>
<Filter open={open}
 setOpen={setOpen} 
 activeCategory={activeCategory} 
 setActiveCategory={setActiveCategory}
 activeSection={activeSection}
 setActiveSection={setActiveSection}
 selectedItem={selectedItem}
 setSelectedItem={setSelectedItem}
 color={color}
 setColor={setColor}
 brands={brands}
 setBrands={setBrands}
 activeColor={activeColor}
 setActiveColor={setActiveColor}
activeBrand={activeBrand}
ClearAllFilter={ClearAllFilter}
setActiveBrand={setActiveBrand}
setActiveBrandsId={setActiveBrandsId}
activeBrandsId={activeBrandsId}
ApplyFilters={ApplyFilters}
 />

        </div>
    )
}