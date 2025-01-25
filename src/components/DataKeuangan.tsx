"use client";

import Link from "next/link";

export default function DataKeuangan() {
    let saldo = localStorage.getItem("saldo");

    if (saldo === null) {
        localStorage.setItem("saldo", "0");
        saldo = "0";
    }

    return (
        <div className="font-poppins flex items-center justify-center flex-col gap-6">
            <h1 className="mt-12 text-3xl font-semibold">Saldo: Rp. {saldo}</h1>
            <Link
                href={"/manage/new"}
                className="bg-blue-600 py-2 px-4 rounded-2xl text-sm hover:bg-blue-800 duration-200"
            >
                Tambah Transaksi
            </Link>

            <table className="table-auto mt-2">
                <thead>
                    <tr>
                        <th className="border px-3 text-left py-2">No.</th>
                        <th className="border px-3 text-left py-2">Category</th>
                        <th className="border px-3 text-left py-2">Amount</th>
                        <th className="border px-3 text-left py-2">
                            Description
                        </th>
                        <th className="border px-3 text-left py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-3 py-2">1</td>
                        <td className="border px-3 py-2">Expenses</td>
                        <td className="border px-3 py-2">Rp. 10000</td>
                        <td className="border px-3 py-2">Makanan</td>
                        <td className="border px-3 py-2 flex gap-2">
                            <button className="bg-orange-500 px-3 rounded-md hover:bg-orange-700 duration-150">Edit</button>
                            <button className="bg-red-500 px-3 rounded-md hover:bg-red-700 duration-150">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-3 py-2">2</td>
                        <td className="border px-3 py-2">Income</td>
                        <td className="border px-3 py-2">Rp. 5000</td>
                        <td className="border px-3 py-2">Gaji</td>
                        <td className="border px-3 py-2 flex gap-2">
                            <button className="bg-orange-500 px-3 rounded-md hover:bg-orange-700 duration-150">Edit</button>
                            <button className="bg-red-500 px-3 rounded-md hover:bg-red-700 duration-150">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
