'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FilterIcon } from 'lucide-react'
import { navigation } from './FilterData'
import { BrandsData } from './BrandsData';
import { ColorData } from './ColorData';


export default function Filter({ApplyFilters,activeBrandsId,setActiveBrandsId,activeBrand,setActiveBrand,activeColor,setActiveColor,color,setColor,brands,setBrands,ClearAllFilter, open, selectedItem, setSelectedItem, setOpen, activeCategory, setActiveCategory, activeSection, setActiveSection }) {



  return (
    <div>


      <button
        onClick={() => setOpen(true)}
        className="rounded-md flex bg-background px-2.5 py-1.5 text-sm font-semibold text-foreground border hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background gap-2"
      >
        <FilterIcon className="size-5" aria-hidden="true" />
        Filters
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-background/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden hide-scrollbar">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-auto bg-background shadow-xl hide-scrollbar">
                  <div className="flex-1 overflow-y-auto hide-scrollbar px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-foreground">Filters</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-foreground hover:text-foreground/75"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>


                    <div className="p-4 py-5 w-full max-w-sm space-y-4">

                      {navigation.categories.map((category) => (
                        <div
                          key={category.id}
                          className="rounded-lg border border-gray-200 bg-foreground shadow-sm"
                        >
                          {/* CATEGORY */}
                          <button
                            onClick={() => {
                              setActiveCategory(category.id === activeCategory ? null : category.id);
                              setActiveSection(null);
                              setSelectedItem(null);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 text-left
          font-semibold transition ${activeCategory === category.id
                                ? " text-background"
                                : "text-background"
                              }`}
                          >
                            {category.name}
                            <span className="text-sm">
                              {activeCategory === category.id ? "−" : "+"}
                            </span>
                          </button>

                          {/* SECTIONS */}
                          {activeCategory === category.id && (
                            <div className="px-4 py-3 space-y-3">
                              {category.sections.map((section) => (
                                <div key={section.id}>
                                  {/* SECTION */}
                                  <button
                                    onClick={() => {
                                      setActiveSection(section.id);
                                      setActiveBrand(section.id);
                                      setSelectedItem(null);
                                    }}
                                    className={`w-full text-left text-sm font-medium py-1
                  ${activeSection === section.id
                                        ? "text-background"
                                        : "text-background/50 hover:text-gray-900"
                                      }`}
                                  >
                                    {section.name}
                                  </button>

                                  {/* ITEMS */}
                                  {activeSection === section.id && (
                                    <div className="mt-2 ml-2 space-y-2">
                                      {section.items.map((item) => (
                                        <label
                                          key={item.name}
                                          className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-gray-900"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={selectedItem === item.name}
                                            onChange={() => setSelectedItem(item.name)}
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600
                                   focus:ring-blue-500"
                                          />
                                          {item.name}
                                        </label>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}



<div className="rounded-lg border border-gray-200 bg-foreground shadow-sm">
  {/* CATEGORY HEADER */}
  <button
    onClick={() =>
      setActiveColor(activeColor === ColorData.id ? null : ColorData.id)
    }
    className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-background transition"
  >
    {ColorData.name}
    <span className="text-sm">
      {activeColor === ColorData.id ? "−" : "+"}
    </span>
  </button>

  {/* COLOR ITEMS */}
  {activeColor === ColorData.id && (
    <div className="px-4 py-3 space-y-2">
      {ColorData.items.map((item) => (
        <label
          key={item.name}
          className="flex items-center gap-2 cursor-pointer text-sm
                     text-background/70 hover:text-background transition"
        >
          <input
            type="checkbox"
            checked={color === item.name}
            onChange={() => setColor(item.name)}
            className="h-4 w-4 rounded border-gray-300
                       text-blue-600 focus:ring-blue-500"
          />
          {item.name}
        </label>
      ))}
    </div>
  )}
</div>



{
  BrandsData.map((items)=>activeBrand===items.id &&
<div className="rounded-lg border border-gray-200 bg-foreground shadow-sm" key={items.id}>
  {/* CATEGORY HEADER */}
  <button
  onClick={()=>setActiveBrandsId(activeBrand===activeBrandsId?null:activeBrand)}
    className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-background transition"
  >
    Brands
    <span className="text-sm">
      {activeBrand ===activeBrandsId ? "−" : "+"}
    </span>
  </button>

  {/* COLOR ITEMS */}
  {activeBrand ===activeBrandsId  && (
    <div className="px-4 py-3 space-y-2">
      {items.items.map((item) => (
        <label
          key={item.name}
          className="flex items-center gap-2 cursor-pointer text-sm
                     text-background/70 hover:text-background transition"
        >
          <input
            type="checkbox"
            checked={brands === item.name}
            onChange={() => setBrands(item.name)}
            className="h-4 w-4 rounded border-gray-300
                       text-blue-600 focus:ring-blue-500"
          />
          {item.name}
        </label>
      ))}
    </div>
  )}
</div>)
}


                     


                    </div>

                  </div>
                  <div className='flex flex-row bg-background h-20 overflow-hidden z-10 p-4 justify-between bottom-0 sticky border-t border-foreground/10 backdrop-blur-md'>
  <button onClick={()=>ClearAllFilter()} className='bg-foreground text-background px-6 py-2 rounded-xl border border-foreground shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-medium'>
    Clear All
  </button>

  <button onClick={()=>ApplyFilters()} className='bg-background text-foreground px-6 py-2 rounded-xl border border-foreground shadow-sm hover:bg-foreground hover:text-background hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-medium'>
    Apply
  </button>
</div>


                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>

    </div>
  )
}
