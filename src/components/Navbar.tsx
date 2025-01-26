"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import isAuthenticated from "./isAuthenticated";
import { logout } from "./logout";

interface User {
    name: string;
    username: string;
    password: string;
}

export default function Navbar() {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [open, setOpen] = useState(false);
    const [openMobile, setOpenMobile] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState("");

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutsideMenu = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpenMobile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutsideMenu);

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMenu);
        };
    }, []);

    const handleLogout = () => {
        logout();
    };

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            localStorage.currentTheme === "dark" ||
              (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
        );
        
        if (localStorage.currentTheme === "dark") {
            document.documentElement.classList.add("dark");
            setTheme("Dark");
        } else if (localStorage.currentTheme === "light") {
            document.documentElement.classList.remove("dark");
            setTheme("Light");
        } else {
            setTheme("System");
        }
    }, [setTheme]);
    
    const changeTheme = (theme: string) => { 
        if (theme === "Dark") {
            localStorage.currentTheme = "dark";
            document.documentElement.classList.add("dark");
        } else if (theme === "Light") {
            localStorage.currentTheme = "light";
            document.documentElement.classList.remove("dark");
        } else {
            localStorage.removeItem("currentTheme");
            document.documentElement.classList.toggle(
                "dark",
                window.matchMedia("(prefers-color-scheme: dark)").matches
            );
        }
        setTheme(theme);
    }

    return (
        <nav className="flex justify-between items-center px-3 sm:px-8 py-4 min-h-[72px] bg-blue-400 font-semibold font-poppins">
            <Link href={"/"} className="hidden md:flex">
                <h1>ExpenseTracker</h1>
            </Link>
            <ul className="flex gap-6 items-center justify-between max-md:w-full">
                <div className="hidden md:flex gap-6 items-center">
                    <li>
                        <Link
                            href={"/manage"}
                            className="py-1 hover:brightness-90 duration-150"
                        >
                            Manage Keuangan
                        </Link>
                    </li>
                </div>

                <div
                    className="flex md:hidden p-1 hover:bg-blue-500 duration-150 rounded-full relative"
                    onClick={() => setOpenMobile((prev) => !prev)}
                    ref={menuRef}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="1em"
                        height="1em"
                        className="md:hidden flex text-3xl"
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="1.5"
                            d="M20 7H4m16 5H4m16 5H4"
                        />
                    </svg>
                    {openMobile && (
                        <ul
                            className="absolute top-full left-0 min-w-max mt-2 text-black 
                            bg-white rounded-lg shadow-lg py-3 font-medium space-y-1"
                        >
                            <li className="px-4 py-1 hover:bg-slate-300 duration-150">
                                <Link href={"/"}>Home</Link>
                            </li>
                            <li className="px-4 py-1 hover:bg-slate-300 duration-150">
                                <Link href={"/manage"}>Manage</Link>
                            </li>
                        </ul>
                    )}
                </div>

                <div className="flex gap-6 items-center">
                    <select
                        name="mode"
                        id="themes"
                        className="bg-blue-400 outline rounded-3xl py-[2px] w-[100px] px-2 hover:brightness-90 duration-150
                            focus:outline-white"
                        onChange={(e) => changeTheme((e.target as HTMLSelectElement).value)}
                        value={theme}
                    >
                        <option value="Dark">Dark</option>
                        <option value="Light">Light</option>
                        <option value="System">System</option>
                    </select>

                    {isAuth ? (
                        <li
                            className="flex gap-2 py-1 px-3 rounded-3xl items-center outline
                        hover:cursor-pointer hover:bg-blue-500 duration-150 relative"
                            onClick={() => setOpen((prev) => !prev)}
                            ref={dropdownRef}
                        >
                            {user && user.name}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="1em"
                                height="1em"
                                className="text-lg"
                            >
                                <path
                                    fill="currentColor"
                                    d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z"
                                />
                            </svg>
                            {open && (
                                <ul
                                    className="absolute top-full right-0 min-w-max mt-2 text-black
                                bg-white rounded-lg shadow-lg py-3 font-medium space-y-1"
                                >
                                    <li className="px-4 py-1 hover:bg-slate-300 duration-150">
                                        <Link href={'/editProfile'}>Edit Profile</Link>
                                    </li>
                                    <li
                                        className="px-4 py-1 hover:bg-slate-300 duration-150"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            )}
                        </li>
                    ) : (
                        <li>
                            <Link href={"/login"} className="py-1">
                                Login
                            </Link>
                        </li>
                    )}
                </div>
            </ul>
        </nav>
    );
}
