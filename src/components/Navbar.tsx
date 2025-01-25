"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import isAuthenticated from "./isAuthenticated";

interface User {
    name: string;
    username: string;
    password: string;
}

export default function Navbar() {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        isAuthenticated().then((res) => {
            if (res) {
                const user = localStorage.getItem("user");
                if (user !== null) {
                    setUser(JSON.parse(user));
                }
            }
            setIsAuth(res);
        });
    }, []);

    return (
        <nav className="flex justify-between items-center px-8 py-6 bg-blue-400 font-semibold font-poppins">
            <Link href={"/"}>
                <h1>ExpenseTracker</h1>
            </Link>
            <ul className="flex gap-8 items-center">
                <li>Dark Mode</li>
                <li>
                    <Link href={"/manage"}>Manage Keuangan</Link>
                </li>
                {isAuth ? (
                    <li>
                        {user && user.name}
                    </li>
                ) : (
                    <li>
                        <Link href={"/login"}>Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}
