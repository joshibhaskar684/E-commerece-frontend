"use client";
import { RegisterUser } from "@/redux-store/user/action";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from 'react-redux';

export default function Signup({ handleClose, setPage }) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch=useDispatch();

    const handlesubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const mobile = formData.get('mobile');
        const email = formData.get('email');
        const password = formData.get('password');

        const newErrors = {};

        if (!name || name.trim().length < 3) {
            newErrors.name = "Name must be at least 3 characters long.";
        }
        
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobile || !mobileRegex.test(mobile.trim())) {
            newErrors.mobile = "Please enter a valid 10-digit mobile number.";
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.trim())) {
            newErrors.email = "Please enter a valid email address.";
        }
        
        if (!password || password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const data = {
                name: name.trim(),
                mobileno: mobile.trim(),
                email: email.trim(),
                password: password
            }
            await dispatch(RegisterUser(data));
        } catch(error) {
            console.error("Signup error:", error);
        } finally {
            setLoading(false);
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
                        {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
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
                        {errors.mobile && <span className="text-red-500 text-xs">{errors.mobile}</span>}
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
                        {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
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
                        {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <button
                            type="submit"
                            className={`py-2  cursor-pointer  rounded-lg border border-yellow-400 bg-yellow-500 text-foreground font-semibold  transition${loading ? " opacity-50 cursor-not-allowed bg-yellow-400/50" : "hover:opacity-90" }`}
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



