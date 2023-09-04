import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = process.env.NODE_ENV === "production" ? ["https://www.khizaramin.com"] : ["http://localhost:3000"];
const API_KEY = process.env.API_KEY;
export function middleware(request: NextRequest) {
    const origin = request.headers.get("origin")
    const bearer = request.headers.get("Authentication")

    if ((origin && !allowedOrigins.includes(origin))){ //|| !bearer || bearer !== API_KEY) {
        return NextResponse.json({ message: 'Authentication Failed' }, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                "Content-Type": 'text/plain'
            }
        })
    }
    return NextResponse.next()
}

export const config = {
    matcher: `/api/:path*`
}