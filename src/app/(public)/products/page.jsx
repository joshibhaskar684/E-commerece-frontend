"use client";

import Cookies from "js-cookie";
import {  Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState ,useEffect} from "react";
import { useDispatch ,useSelector} from "react-redux";
import { getProducts, getProductswithCategory } from "@/redux-store/products/action";
import Sidebar from "@/components/Products/Sidebar/Sidebar";
import ProductCard from "@/components/Products/ProductCard/ProductCard";

export default function page(){
       const dispatch=useDispatch();   
       const searchParams = useSearchParams();
     const [totalPage,setTotalPages]=useState(12);
        const [pageno,setPageno]=useState(Number(searchParams.get("pageno")) || 1);
        const [selectedId ,setSelectedId]=useState('');
const [sortOption, setSortOption] = useState(null);
        const [pagesize,setPagesize]=useState(Number(searchParams.get("pagesize")) || 12);
        const router=useRouter();
        const category=searchParams.get("category") || null;
console.log(category,"category jhofyuifu")
       
    const products=useSelector((state)=>state.ProductReducer.products);

    console.log(products,"products");
    useEffect(()=>{
handleProductLoading();
    },[pageno,pagesize,sortOption]
    );

    const handleProductLoading=()=>{
      if(!category){

        dispatch(getProducts({pageno,pagesize,sortOption}));
        return;
      }
       dispatch(getProductswithCategory({pageno,pagesize,category,sortOption}));
      

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
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 pb-12 transition-colors duration-200">
          
          {/* Header & Sidebar Controls */}
          <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-16 sm:top-[72px] z-10 shadow-sm">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Products</h1>
                <div className="flex-shrink-0">
                  <Sidebar sortOption={sortOption} setSortOption={setSortOption} />
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
               {products?.content?.map((item, index) => (
                   <ProductCard product={item} key={index} router={router} handleViewMore={handleViewMore} selectedId={selectedId}/>
               ))} 
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm w-fit mx-auto">
               <Pagination
                   count={totalPage}
                   page={pageno}
                   onChange={handlePaginationChange}
                   color="standard"
                   sx={{
                       "& .MuiPaginationItem-root": {
                           backgroundColor: "transparent",
                           color: "var(--foreground)", 
                           fontWeight: 500,
                       },
                       "& .Mui-selected": {
                           backgroundColor: "#18181b !important", 
                           color: "#fff !important",
                       },
                       ".dark & .Mui-selected": {
                           backgroundColor: "#fafafa !important",
                           color: "#18181b !important",
                       }
                   }}
               />
            </div>
          </div>
        </div>
    )
}


// "use client";
// import Sidebar from "@/components/Products/Sidebar/Sidebar"
// import { ProductionQuantityLimits, SearchOff } from "@mui/icons-material";

// import { getProducts } from "@/redux-store/products/action";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import ProductCard from "@/components/Products/ProductCard/ProductCard";
// import { useRouter } from 'next/navigation';
// import { FaShoppingBag } from "react-icons/fa";

// export default function page() {

//   const dispatch = useDispatch();
//   const store = useSelector((state) => state.ProductReducer);
//   const products = store?.data || [];
//   const router = useRouter();
//   const [fetch,setFetch]=useState(false);
  
//   const fetchProduct=async()=>{
//        try{
//     setFetch(true);
//     await dispatch(getProducts());
//     console.log(store);
//   }
//   catch(e){
//     console.log(e);
//   }
//     finally{
//       setFetch(false);
//     }
//   } 



//   useEffect(() => {
   
// fetchProduct();
//   }, []);



// //  if (!fetch) {
// //   return (
// //     <>
// //     </>
// //   );
// // }
//   // if (products?.length == 0&&fetch) {
//   //   return (
      
//   //   )
//   // }

//   return (
//     <div className="bg-background ">
//       <div className="sticky top-32 z-1 bg-background">
//         <Sidebar />
//       </div>
//       <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//         <h2 className="sr-only">Products</h2>

//         <div className="grid grid-cols-2  divide-foreground/10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 ">
//           {products?.map((product) => (
//             <ProductCard key={product.id} product={product} router={router} />

//           ))}
//         </div>

//       </div>
//     </div>
//   )
// }
