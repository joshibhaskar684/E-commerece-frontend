

import Footer from '../Footer/page';
import ProductListComponent from '../UniversalComponnets/ProductListComponent/ProductListComponent';
import CategorySection from './HomeComponent/CategorySection/CategorySection';
import Collections from './HomeComponent/Collections/Collections';
import Featured from './HomeComponent/Featured/Featured';
import Maincarosel from './HomeComponent/HeroSectionCarsoule/HeroSection';

const products = [
  {
    id: 1,
    brand: "Samsung",
    name: "Galaxy S23 Ultra",
    color: "Phantom Black",
    price: 109999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Samsung Galaxy S23 Ultra front view",
    Original_price: 124999,
    discount: 12
  },
  {
    id: 2,
    brand: "Apple",
    name: "iPhone 14",
    color: "Midnight",
    price: 69999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Apple iPhone 14 front view",
    Original_price: 79999,
    discount: 13
  },
  {
    id: 3,
    brand: "OnePlus",
    name: "OnePlus 11R",
    color: "Galactic Silver",
    price: 39999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "OnePlus 11R front view",
    Original_price: 44999,
    discount: 11
  },
  {
    id: 4,
    brand: "Xiaomi",
    name: "Redmi Note 13 Pro",
    color: "Arctic White",
    price: 24999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Redmi Note 13 Pro front view",
    Original_price: 27999,
    discount: 10
  },
  {
    id: 5,
    brand: "Realme",
    name: "Realme GT Neo 3",
    color: "Nitro Blue",
    price: 31999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Realme GT Neo 3 front view",
    Original_price: 35999,
    discount: 11
  },
  {
    id: 6,
    brand: "Vivo",
    name: "Vivo V29 Pro",
    color: "Himalayan Blue",
    price: 38999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Vivo V29 Pro front view",
    Original_price: 42999,
    discount: 9
  },
  {
    id: 7,
    brand: "Oppo",
    name: "Oppo Reno 10 Pro",
    color: "Glossy Purple",
    price: 36999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Oppo Reno 10 Pro front view",
    Original_price: 40999,
    discount: 10
  },
  {
    id: 8,
    brand: "Motorola",
    name: "Moto Edge 40",
    color: "Eclipse Black",
    price: 29999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Moto Edge 40 front view",
    Original_price: 32999,
    discount: 9
  },
  {
    id: 9,
    brand: "Google",
    name: "Pixel 7",
    color: "Snow",
    price: 59999,
    image: [
      "https://media.istockphoto.com/id/1406527082/photo/unboxing-android-smartphone.jpg?s=612x612&w=0&k=20&c=wKEyEv6ZYict-J5Dxc-HUt2Ys524U-dy_cXo-AIalKU="
    ],
    imageAlt: "Google Pixel 7 front view",
    Original_price: 64999,
    discount: 8
  }
];
export default function MainHomePage(){
    return(
        <>
        <Maincarosel/>
        <CategorySection/>
        {/* <Featured/> */}
        <ProductListComponent SectionName={"New Arrivals"} products={products} Link={"/products/10"} />
        <ProductListComponent SectionName={"Best Sellers"} products={products} Link={"/products/10"} />
        {/* <Collections/> */}
        <ProductListComponent SectionName={"Top Rated"} products={products} Link={"/products/10"} />
        <ProductListComponent SectionName={"Trending"} products={products} Link={"/products/10"} />
        {/* <div className='h-[900px]'></div> */}
        <Footer/>
        </>
    )
}