"use client"
import { FaRobot } from "react-icons/fa";
import AiModal from "../ModalAi/AiModal";
import { useState } from "react";

export default function AiBot(){
    const [ openModal,setOpenModal]=useState(false);

    return(
        <>
        <button onClick={()=>setOpenModal(true)} className="cursor-pointer border bg-yellow-500 fixed bottom-5 right-5 w-12 h-12 rounded-full flex items-center justify-center">
          <FaRobot className="text-3xl "/>
        </button>

<AiModal openModal={openModal} setOpenModal={setOpenModal} />
        </>
    )
}