
"use client"
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useRouter } from 'next/navigation';

const Maincarosel = ({product}) => {
    const navigate = useRouter(); // ✅ correct placement

    const items = product.map((item, index) => (
        <div className="item flex justify-center items-center" key={index} style={{ width: "auto" }}>
            <img
                src={item}
                alt=""
                 className="cursor-pointer h-[300px] w-auto object-contain"
            />
        </div>
    ));

    return (
        <AliceCarousel
           
            items={items}
        disableButtonsControls
           autoPlay
           infinite
           autoPlayInterval={2000}
autoWidth
      centerMode
        />
    );
};

export default Maincarosel;