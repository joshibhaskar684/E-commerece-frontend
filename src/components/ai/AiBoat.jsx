"use client"
import { FaRobot } from "react-icons/fa";
import AiModal from "../ModalAi/AiModal";
import { useState } from "react";

export default function AiBot(){
    const [ openModal,setOpenModal]=useState(false);

    return(
        <>
        <button 
          onClick={()=>setOpenModal(!openModal)} 
          className="cursor-pointer bg-yellow-500 text-black fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-[90] shadow-xl hover:bg-yellow-600 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <FaRobot className="text-2xl"/>
        </button>

        <AiModal openModal={openModal} setOpenModal={setOpenModal} />
        </>
    )
}