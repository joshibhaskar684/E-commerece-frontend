"use client";

import { Fragment, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import SearchBar from './components/SearchBar'
import AuthModal from '../Modal/AuthModal'
import { FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'
import { LoginMenuData } from './logindata';

export default function Navbar({ tokenPresent }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  const handlelogout = async () => {
    try {
      await axios.post("/api/logout", {}, {
        withCredentials: true,
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const searchfunction = (searchQuery) => {
    router.push(`/search?query=${encodeURIComponent(searchQuery)}&pageno=1&pagesize=12`);
  }

  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState('');

  const handleCart = () => {
    if (!tokenPresent) {
      setPage("login")
      setOpenModal(true)
      toast.error("Please login first")
    } else {
      router.push("/account/cart")
    }
  }

  const LoginData = LoginMenuData;
  const NavData = [
    { label: "Home", link: "/" },
    { label: "Products", link: "/products" },
    { label: "Categories", link: "/categories" },
  ];

  return (
    <>
      <div className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-foreground">
        
        {/* Mobile menu dialog */}
        <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />
          <div className="fixed inset-0 z-50 flex">
            <DialogPanel
              transition
              className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-background text-foreground pb-12 shadow-2xl transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <div className="flex px-4 pt-5 pb-2 justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              <div className="space-y-1 px-4 py-6">
                {NavData.map((item, index) => (
                  <Link 
                    key={index} 
                    href={item.link} 
                    className="block px-3 py-2.5 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-6">
                {tokenPresent ? (
                  <div className="space-y-1">
                    {LoginData.map((item, index) => (
                      <Link
                        key={index}
                        href={item.link}
                        className="block px-3 py-2.5 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <button
                      onClick={() => { setOpen(false); handlelogout(); }}
                      className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button 
                      onClick={() => { setOpen(false); setOpenModal(true); setPage('login'); }} 
                      className="w-full flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-base font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Sign in
                    </button>
                    <button 
                      onClick={() => { setOpen(false); setOpenModal(true); setPage('signup'); }} 
                      className="w-full flex items-center justify-center rounded-md bg-foreground text-background px-4 py-2.5 text-base font-medium shadow-sm hover:bg-foreground/90 transition-colors"
                    >
                      Create account
                    </button>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Desktop Header */}
        <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* Left Section: Mobile Menu & Logo */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-md p-2 -ml-2 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden transition-colors"
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              <Link href="/" className="flex items-center gap-2">
                <span className="sr-only">Your Company</span>
                <img
                  alt="Logo"
                  src="/QuickLogo.png"
                  className="h-8 w-auto"
                />
                <span className="hidden sm:inline-block font-bold text-xl tracking-tight">Quick</span>
              </Link>
            </div>

            {/* Middle Section: Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-1">
              {NavData.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Section: Auth & Cart */}
            <div className="flex items-center justify-end gap-2 sm:gap-4">
              {tokenPresent ? (
                <Menu as="div" className="relative hidden sm:block">
                  <MenuButton className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500">
                    <span className="sr-only">Open user menu</span>
                    <FaUserCircle className="size-7 text-gray-400" />
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-background border border-gray-200 dark:border-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    {LoginData.map((item, index) => (
                      <MenuItem key={index}>
                        <Link
                          href={item.link}
                          className="block px-4 py-2 text-sm text-foreground data-focus:bg-gray-100 dark:data-focus:bg-gray-800 transition-colors"
                        >
                          {item.label}
                        </Link>
                      </MenuItem>
                    ))}
                    <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
                    <MenuItem>
                      <button
                        onClick={() => handlelogout()}
                        className="block w-full text-left px-4 py-2 text-sm font-medium text-red-600 data-focus:bg-red-50 dark:data-focus:bg-red-950/30 transition-colors"
                      >
                        Log out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => { setOpenModal(true); setPage('login'); }}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 h-9 px-4 py-2"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => { setOpenModal(true); setPage('signup'); }}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-foreground text-background hover:bg-foreground/90 h-9 px-4 py-2 shadow-sm"
                  >
                    Create account
                  </button>
                </div>
              )}

              {/* Cart Button */}
              <button 
                onClick={handleCart} 
                className="group flex items-center justify-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ShoppingBagIcon
                  aria-hidden="true"
                  className="size-6 text-foreground shrink-0"
                />
                <span className="ml-1.5 text-sm font-medium">0</span>
                <span className="sr-only">items in cart, view bag</span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Search Bar section */}
        <div className="border-t border-gray-100 dark:border-gray-900 bg-background/50">
           <SearchBar searchfunction={searchfunction} />
        </div>
      </div>

      <AuthModal openModal={openModal} setOpenModal={setOpenModal} page={page} setPage={setPage} />
    </>
  )
}
