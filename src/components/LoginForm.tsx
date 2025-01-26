"use client";

import { useState } from "react";
import { redirectHome } from "./redirectHome";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = () => {
        if (username === "user" && password === "user123") {
            if (localStorage.getItem('user') === null) {
                const user = {
                    name: 'User',
                    username: username,
                    password: password
                }
                localStorage.setItem('user', JSON.stringify(user));
            }
            redirectHome();
        } else {
            alert("Invalid username or password");
        }
    }
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    return (
        <div className="font-poppins flex justify-center items-center h-[calc(100vh-72px)] px-2">
            <div className="flex flex-col gap-3 px-6 py-4 bg-blue-500 rounded-2xl font-medium w-[500px] justify-center">
                <div className="mb-3">
                    <h2 className="font-semibold text-center text-xl">
                        Welcome back to ExpenseTracker
                    </h2>
                    <p className="font-normal text-sm text-center">
                        Manage your finance with ease
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="key: user"
                        className="text-black rounded-md px-2 py-2 font-normal text-sm"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <p className="text-xs font-light">
                        Please enter your username
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="key: user123"
                        className="text-black rounded-md px-2 py-2 font-normal text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <p className="text-xs font-light">
                        Please enter your password
                    </p>
                </div>
                <button
                    className="py-2 px-4 bg-blue-800 rounded-lg font-medium mt-6
                  hover:bg-blue-900 duration-200 w-[120px] self-end"
                    onClick={onSubmit}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
