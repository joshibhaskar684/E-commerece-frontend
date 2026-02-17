"use client";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function Signup({ handleClose, setPage }) {
    const [loading, setLoading] = useState(false);

    const handlesubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            mobile: formData.get('mobile'),
            email: formData.get('email'),
            password: formData.get('password')
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
    <div className="flex min-h-full items-start sm:items-center justify-center p-4">
            <div className="bg-foreground w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 transition-all duration-300">

                <h1 className="text-background text-2xl sm:text-3xl font-bold text-center mb-6">
                    Sign Up
                </h1>

                <form onSubmit={handlesubmit} className="flex flex-col gap-4 w-full">

                    <div className="flex flex-col gap-1">
                        <label className="text-background text-sm">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Enter your name"
                            className="px-4 py-2 rounded-lg border border-background/40 bg-transparent text-background focus:outline-none focus:ring-2 focus:ring-yellow transition"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-background text-sm">Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            required
                            placeholder="Enter mobile number"
                            className="px-4 py-2 rounded-lg border border-background/40 bg-transparent text-background focus:outline-none focus:ring-2 focus:ring-yellow transition"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-background text-sm">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Enter your email"
                            className="px-4 py-2 rounded-lg border border-background/40 bg-transparent text-background focus:outline-none focus:ring-2 focus:ring-yellow transition"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-background text-sm">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Enter password"
                            className="px-4 py-2 rounded-lg border border-background/40 bg-transparent text-background focus:outline-none focus:ring-2 focus:ring-yellow transition"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <button
                            type="submit"
                            className="py-2  cursor-pointer  rounded-lg border border-yellow-400 bg-yellow-500 text-foreground font-semibold hover:opacity-90 transition"
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleClose()}
                            className="py-2  cursor-pointer  rounded-lg border border-background text-background hover:bg-background hover:text-foreground transition"
                        >
                            Close
                        </button>
                    </div>

                    <div className="relative flex items-center my-4">
                        <div className="flex-grow border-t border-background/30"></div>
                        <span className="mx-3 text-background text-sm">OR</span>
                        <div className="flex-grow border-t border-background/30"></div>
                    </div>

                    <button
                        type="button"
                        className="py-2  cursor-pointer  rounded-lg border border-background text-background flex items-center justify-center gap-2 hover:bg-background hover:text-foreground transition"
                    >
                        <FaGoogle />
                        Continue with Google
                    </button>

                    <p className="text-xs text-background/70 text-center mt-4 ">
                        By clicking, you agree to our<a href="/legal/term" className=" text-yellow-400 cursor-pointer hover:underline"> terms & conditions </a>  and <a className=" text-yellow-400 cursor-pointer hover:underline" href="legal/privacy">privacy policy</a>
                    </p>

                    <p className="text-sm text-background text-center">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setPage('login')}
                            className="text-yellow-400 cursor-pointer hover:underline"
                        >
                            Login
                        </button>
                    </p>

                </form>
            </div>
        </div>

        </div>
    );
}




// "use client";
// import {useState}from "react";
// import { FaGoogle } from "react-icons/fa";
// export default function Signup({handleClose,setPage}) {
//     const [loading,setLoading]=useState(false);
//     const handlesubmit=(e)=>{
//         e.preventDefault();
//         const formData=new FormData(e.target);
//         const data ={
//             name:formData.get('name'),
//             mobile:formData.get('mobile'),
//             email:formData.get('email'),
//             password:formData.get('password')
//         }
//     }
//     return(
//         <div className="bg-foreground text-foreground p-4">
//             <h1 className="text-background text-2xl font-bold">Sign Up</h1>
//         <div className="item-centre  border-7 z-50 ">
//             <form onSubmit={handlesubmit} className="flex flex-col gap-4  h-full w-full ">
//                 <label  className="text-background">Name :</label>
// <input type="text" name="name" required className="text-background border" placeholder="enter"/>
// <label className="text-background">Mobile :</label>
// <input type="text" name="mobile" className="text-background border" required placeholder="enter"/>
// <label className="text-background">Email :</label>
// <input type="text" name="email" className="text-background border " required placeholder="enter"/>
// <label className="text-background">Password :</label>
// <input type="text" className="text-background border" name="password  " required placeholder="enter"/>
// <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     <button type="submit" className={loading?"border text-background  border-background":"border text-background border-background"}>{loading ?"Submiting...":"Submit "}</button>

// <button type="button" onClick={()=>handleClose()} className={loading?"border text-background border-background":"border text-background border-background"}>Close</button>

// </div>
// <button className=" border border-background  text-background flex items-center justify-center gap-2">
//     <FaGoogle/>
//     Continue with Google
// </button>
// <div>
//     <p className="text-background">By Clicking you are agree with our term and condition</p>
// </div>
// <div>
//     <p className="text-background">Already have an account ? <button onClick={()=>setPage('login')} className="text-blue-500 cursor-pointer">Login</button></p>
// </div>


//                 </form>




//             </div>
//         </div>
//     )
// }