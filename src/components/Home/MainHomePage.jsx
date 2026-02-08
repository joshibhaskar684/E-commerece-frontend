

import CategorySection from './HomeComponent/CategorySection/CategorySection';
import Maincarosel from './HomeComponent/HeroSectionCarsoule/HeroSection';
export default function MainHomePage(){
    return(
        <>
        <Maincarosel/>
        <CategorySection/>
        <div className='h-[900px]'></div>
        </>
    )
}