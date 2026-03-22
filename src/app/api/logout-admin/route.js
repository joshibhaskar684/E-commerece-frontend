import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("admintoken", "", {
    expires: new Date(0),
    path: "/",
    domain: ".quicksi.in", // ✅ must match original
    httpOnly: false,       // match original
    secure: true,          // match original
    sameSite: "none",      // match original
  });

  return response;
}