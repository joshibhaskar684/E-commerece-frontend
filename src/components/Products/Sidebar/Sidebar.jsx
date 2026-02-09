"use client"
import { useState } from "react";
import Filter from "./components/Filter";
import SortOption from "./components/SortOption";

export default function Sidebar(){
    const [open, setOpen] = useState(false);

    return(
        <div className="flex items-center justify-between  gap-4 p-5">
<SortOption/>
<Filter open={open} setOpen={setOpen}/>

        </div>
    )
}