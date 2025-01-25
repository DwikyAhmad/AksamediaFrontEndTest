import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
    const cookieStore = await cookies();

    // Log details of each POST request
    if (request.method === 'POST') {
        console.log(`POST request to ${pathname} from ${request.headers.get('referer')}`);
    }

    if (pathname.startsWith('/manage') && cookieStore.get('isAuthenticated')?.value !== 'true') {
        return NextResponse.redirect(new URL('/login', baseUrl));
    }

    if (pathname === '/login' && cookieStore.get('isAuthenticated')?.value === 'true') {
        return NextResponse.redirect(new URL('/', baseUrl));
    }
}
