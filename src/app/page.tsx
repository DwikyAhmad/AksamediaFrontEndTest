import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className="font-poppins flex justify-center items-center h-[calc(100vh-72px)] flex-col gap-2">
                <h1 className="font-bold text-3xl">
                    Raih Goal Finansialmu dengan ExpenseTracker
                </h1>
                <p className="font-medium">
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
