'use server'

import { cookies } from "next/headers";

export default async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.get("isAuthenticated")?.value === "true";
}
