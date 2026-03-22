import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set("usertoken", "", {
    expires: new Date(0),
    path: "/",
    domain: ".quicksin.in", // ✅ must match
    httpOnly: false,       // must match original
    secure: true,          // must match original
    sameSite: "none",      // must match original
  });

  return NextResponse.json({ success: true });
}