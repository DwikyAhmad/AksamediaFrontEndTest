"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
    const [nama, setNama] = useState("");
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("user") || null;
        if (user !== null) {
            setNama(JSON.parse(user).name);
        }
    }, []);

    const onSubmit = () => {
        const user = localStorage.getItem("user") || null;
        if (user !== null) {
            const parsedUser = JSON.parse(user);
            parsedUser.name = nama;
            localStorage.setItem("user", JSON.stringify(parsedUser));
            window.alert("Profile updated successfully");
            router.replace("/");
        }
    };
    

    return (
        <div className="flex justify-center items-center font-poppins px-2">
            <div className="mt-12 p-4 rounded-lg border w-[500px]">
                <h2 className="text-2xl font-semibold text-center">
                    Edit Profile
                </h2>
                <div className="flex flex-col gap-2 font-medium mt-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nama">Nama</label>
                        <input
                            type="text"
                            id="nama"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className="py-2 px-4 rounded-lg border outline-none text-black"
                            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                        />
                        <p className="text-xs font-light">
                            Enter your desired name
                        </p>
                    </div>

                    <div className="flex justify-between mt-4">
                        <Link
                            href={"/manage"}
                            className="py-2 px-4 outline rounded-lg font-medium
                            hover:bg-blue-900 duration-200 w-[80px] text-center"
                        >
                            Back
                        </Link>
                        <button
                            className="py-2 px-4 bg-blue-800 rounded-lg font-medium
                            hover:bg-blue-900 duration-200 w-[120px]"
                            onClick={onSubmit}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
