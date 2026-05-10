"use client";

import Cookies from "js-cookie";
import {  Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState ,useEffect} from "react";
import { useDispatch ,useSelector} from "react-redux";
import { getProducts, getProductswithQuery } from "@/redux-store/products/action";
import Sidebar from "@/components/Products/Sidebar/Sidebar";
import ProductCard from "@/components/Products/ProductCard/ProductCard";

export default function page(){
       const dispatch=useDispatch();   
       const searchParams = useSearchParams();
     const [totalPage,setTotalPages]=useState(12);
        const [pageno,setPageno]=useState(Number(searchParams.get("pageno")) || 1);
        const [selectedId ,setSelectedId]=useState('');
        const [pagesize,setPagesize]=useState(Number(searchParams.get("pagesize")) || 12);
        const router=useRouter();
        const query=searchParams.get("query") || null;
console.log(query,"query jhofyuifu")
       
    const products=useSelector((state)=>state.ProductReducer.products);

    console.log(products,"products");
    useEffect(()=>{
handleProductLoading();
    },[pageno,pagesize]
    );
    useEffect(()=>{
handleProductLoading();
    },[query])

    const handleProductLoading=()=>{
      if(!query){

        dispatch(getProducts({pageno,pagesize}));
        return;
      }
       dispatch(getProductswithQuery({pageno,pagesize,query}));
      

    }
    
    const handleViewMore=(id)=>{
        try{
        setSelectedId(id);
        router.push(`/admin/productss/${id}`);
    }
    catch(e){

    }finally{
    }
    }
        

     useEffect(()=>{
        setTotalPages(products?.totalPages)
       },[products]);

     const handlePaginationChange = (_, page) => {
        setPageno(page);

        const params = new URLSearchParams(searchParams.toString());
        params.set("pageno", page);

        router.push(`?${params.toString()}`);
    };

    return (
        <>
         <div className="bg-background ">
       <div className="sticky top-32 z-1 bg-background">
       <Sidebar />
       </div>
        <div className="grid grid-cols-1 gap-5">
            <div className="w-full">
<h1 className="font-bold text-2xl p-5"> Products </h1>

            </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-5">

 {
    products?.content?.map((item,index)=>(
        <ProductCard product={item} key={index} router={router} handleViewMore={handleViewMore} selectedId={selectedId}/>
    ))
} 

            </div>

<div className="w-full grid grid-cols-1 gap-5 p-5 place-items-center ">
 <Pagination
                           count={totalPage}
                           page={pageno}
                           onChange={handlePaginationChange}
                           color="primary"
                           sx={{
                               "& .MuiPaginationItem-root": {
                                   backgroundColor: "transparent",
                                   color: "var(--foreground)", // ensures text is visible
                               },
                               "& .Mui-selected": {
                                   backgroundColor: "primary.main", // selected page still colored
                                   color: "#fff",
                               },
                           }}
                       />
             </div>
        </div>

        
        
        </div>
        </>
    )
}
