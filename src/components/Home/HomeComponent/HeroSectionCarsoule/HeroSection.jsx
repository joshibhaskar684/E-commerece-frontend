
"use client"
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Maincarouseldata } from './Carsoule';
import { useRouter } from 'next/navigation';

const Maincarosel = () => {
    const navigate = useRouter(); // ✅ correct placement

    const items = Maincarouseldata.map((item, index) => (
        <div className="item" key={index}>
            <img
                className="cursor-pointer"
                src={item.image}
                alt=""
                onClick={() => navigate.push(item.path)}
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
        />
    );
};

export default Maincarosel;