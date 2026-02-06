
import Navbar from "@/components/Navbar/page";


export default function layout({children}){
return(
    <>
    <Navbar/>
    {children}
    </>
)
}