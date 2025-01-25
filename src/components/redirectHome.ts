'use server'

import { cookies } from 'next/headers'

import { redirect } from "next/navigation";

export async function redirectHome() {
  const cookieStore = await cookies()
  cookieStore.set("isAuthenticated", "true")
  return redirect("/");
}