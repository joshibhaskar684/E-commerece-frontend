

import CategorySection from './HomeComponent/CategorySection/CategorySection';
import Collections from './HomeComponent/Collections/Collections';
import Featured from './HomeComponent/Featured/Featured';
import Maincarosel from './HomeComponent/HeroSectionCarsoule/HeroSection';
export default function MainHomePage(){
    return(
        <>
        <Maincarosel/>
        <CategorySection/>
        <Featured/>
        <Collections/>
        <div className='h-[900px]'></div>
        </>
    )
}