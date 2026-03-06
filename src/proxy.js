import { NextResponse } from "next/server";

export async function proxy(request){
    const UserToken=request.cookies.get("usertoken")?.value;
 const url = request.nextUrl.clone();

 const {pathname} = url;
 if(pathname.startsWith("/student")){

    if(!UserToken){
  return NextResponse.redirect(new URL("/", request.url));
    }
    else{
        return NextResponse.next();
    }
 }

    return NextResponse.next();
}


export const config={
  matcher:["/profile/:path*"],
  
}
