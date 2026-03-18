
import Navbar from "@/components/Navbar/page";
import { cookies } from "next/headers";


export default async function layout({children}){
    const cookieStore=await cookies();
    
 const token = cookieStore.get('usertoken')?.value ?? null;
 
return(
    <>
    <Navbar tokenPresent={token}/>
    {children}
    </>
)
}