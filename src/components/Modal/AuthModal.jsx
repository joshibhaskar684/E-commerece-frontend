"use client";

import Modal from "@mui/material/Modal";
import Login from "../Login/page";
import Signup from "../signup/page";
import { Box } from "@mui/material";

export default function AuthModal({ openModal,setOpenModal, page, setPage }) {
const handleClose = () => {
setOpenModal(openModal?false:true);
}
  
    const renderContent = () => {
        if (page === 'login') return < Login setPage={setPage} handleClose={handleClose} />;
        if (page === 'signup') return <Signup setPage={setPage} handleClose={handleClose} />;
        return <div>Page Not Found</div>;
    };
    return (
        <>
            <Modal open={openModal} onClose={handleClose}>
                 <div className="flex items-center justify-center min-h-screen p-4">
        
        {/* Modal Box */}
        <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6">
          {renderContent()}
        </div>
      </div>

            </Modal>
        </>

    );
}
