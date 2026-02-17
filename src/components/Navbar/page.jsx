'use client'

import { Fragment, useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { navigation } from './components/navigation'
import { useRouter } from 'next/navigation'
import SearchBar from './components/SearchBar'
import { Avatar, Modal } from '@mui/material'
import AuthModal from '../Modal/AuthModal'
import Cookies from 'js-cookie'
import { FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tokenPresent, setTokenPresent] = useState(false);
  const router = useRouter();


  // useEffect(() => {  
  //   const usertoken=Cookies.get("usertoken");
  //  {usertoken?setTokenPresent(true):setTokenPresent(false)}
  //  },[])

  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState('');

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="bg-background text-foreground  sticky top-0 z-1">
        {/* Mobile menu */}
        <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-background text-foreground  pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <div className="flex px-4 pt-5 pb-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-foreground"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Links */}
              {/* <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-foreground data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pt-10 pb-8">
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-background text-foreground  object-cover group-hover:opacity-75"
                          />
                          <a href={item.href} className="mt-6 block font-medium text-foreground ">
                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-foreground">
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a href={item.href} className="-m-2 block p-2 text-foreground">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup> */}

              {/* <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {/* {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a href={page.href} className="-m-2 block p-2 font-medium text-foreground">
                      {page.name}
                    </a>
                  </div>
                ))} *
              </div> */}

              {
                tokenPresent?(
               <div className="space-y-6 border-t border-gray-200 px-4 py-6">
  <div className="flex flex-col space-y-3">
    <a
      href="/account"
      className="font-bold text-xl text-gray-800 hover:text-yellow transition"
    >
      Profile
    </a>
    <a
      href="/setting"
      className="font-bold text-xl text-gray-800 hover:text-yellow transition"
    >
      Setting
    </a>
    <a
      href="/orders"
      className="font-bold text-xl text-gray-800 hover:text-yellow transition"
    >
      Orders
    </a>
    <button
      onClick={() => {setTokenPresent(false)}}
      className="font-bold text-xl text-red-600 hover:text-red-800 transition text-left"
    >
      Logout
    </button>
  </div>
</div>

            ):( 
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <button  onClick={()=>{setOpenModal(true), setPage('login')}} className="-m-2 cursor-pointer block p-2 font-medium text-foreground">
                  Sign in
                </button>
              </div>
              <div className="flow-root">
                <button onClick={()=>{setOpenModal(true), setPage('signup')}} className="-m-2 cursor-pointer block p-2 font-medium text-foreground">
                  Create account
                </button>
              </div>
            </div>)
              }

              {/* 
{
  tokenPresent&&
               <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-3xl text-gray-700"
              >
                <FaUserCircle />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
}
            {!tokenPresent&&
              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <button  onClick={()=>{setOpenModal(true), setPage('login')}} className="-m-2 cursor-pointer block p-2 font-medium text-foreground">
                  Sign in
                </button>
              </div>
              <div className="flow-root">
                <button onClick={()=>{setOpenModal(true), setPage('signup')}} className="-m-2 cursor-pointer block p-2 font-medium text-foreground">
                  Create account
                </button>
              </div>
            </div>
            } */}

            </DialogPanel>
          </div>
        </Dialog>

        <header className="relative bg-background text-foreground ">


          <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="relative rounded-md bg-background text-foreground  p-2 text-foreground lg:hidden"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon aria-hidden="true" className="size-6" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <a href="/">
                    <span className="sr-only">Your Company</span>
                    <img
                      alt=""
                      src="/QuickLogo.png"
                      className="h-8 w-auto"
                    />
                  </a>
                </div>

                {/* Flyout menus */}
                {/* <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-foreground transition-colors duration-200 ease-out hover:text-foreground data-open:text-indigo-600">
                          {category.name}
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-indigo-600"
                          />
                        </PopoverButton>
                      </div>
                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full z-20 w-full bg-background text-foreground  text-sm text-foreground transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow *}
                        <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-background text-foreground  shadow-sm" />
                        <div className="relative bg-background text-foreground ">
                          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div key={item.name} className="group relative text-base sm:text-sm">
                                    <img
                                      alt={item.imageAlt}
                                      src={item.imageSrc}
                                      className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                    />
                                    <a href={item.href} className="mt-6 block font-medium text-foreground">
                                      <span aria-hidden="true" className="absolute inset-0 z-10" />
                                      {item.name}
                                    </a>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p id={`${section.name}-heading`} className="font-medium text-foreground">
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <a href={item.href} className="hover:text-foreground">
                                            {item.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-foreground hover:text-foreground"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup> */}


                <div className="ml-auto flex justify-end items-center">
                  {tokenPresent ? (<div className="hidden lg:flex">
                    <Menu as="div" className="relative ml-3 ">
                      <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {/* <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                /> */}
                        <Avatar
                          sx={{ bgcolor: 'yellow' }} // MUI theme color
                          className="w-8 h-8 rounded-full outline outline-1 outline-white/10 text-white font-bold text-2xl"
                        >
                          B
                        </Avatar>
                      </MenuButton>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                      >
                        <MenuItem>
                          <Link
                            href="/account/order"
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                            Order
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                            Settings
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <button
                            // onClick={handleLogOut}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                            Log out
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Menu></div>
                  ) : (
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <button
                        onClick={() => {
                          setOpenModal(true);
                          setPage('login');
                        }}
                        className="text-sm font-medium text-foreground cursor-pointer hover:text-foreground"
                      >
                        Sign in
                      </button>
                      <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                      <button
                        onClick={() => {
                          setOpenModal(true);
                          setPage('signup');
                        }}
                        className="text-sm font-medium cursor-pointer text-foreground hover:text-foreground"
                      >
                        Create account
                      </button>
                    </div>
                  )}



                  {/* Search */}
                  {/* <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-foreground hover:text-foreground">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                  </a>
                </div> */}

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <a href="/cart" className="group -m-2 flex items-center p-2" >
                      <ShoppingBagIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-foreground group-hover:text-foreground"
                      />
                      <span className="ml-2 text-sm font-medium text-foreground group-hover:text-foreground">0</span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <SearchBar />
      </div>

      <AuthModal openModal={openModal} setOpenModal={setOpenModal} page={page} setPage={setPage} />
    </>

  )
}
