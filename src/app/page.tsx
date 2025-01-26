import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className="font-poppins flex justify-center items-center h-[calc(100vh-72px)] flex-col gap-2">
                <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-center px-2">
                    Raih Goal Finansialmu dengan <span className="text-cyan-400">ExpenseTracker</span>
                </h1>
                <p className="sm:font-medium lg:w-[700px] text-center px-6 text-xs font-light md:text-sm lg:text-md">
                    Mengelola pengeluaran, menetapkan anggaran, dan mencapai
                    tujuan finansialmu menjadi lebih mudah dengan
                    ExpenseTracker.
                </p>
                <Link
                    href={"/manage"}
                    className="py-3 px-6 bg-blue-600 rounded-3xl font-medium mt-6
                    hover:bg-blue-800 duration-200 "
                >
                    Mulai Sekarang
                </Link>
            </div>
        </div>
    );
}
