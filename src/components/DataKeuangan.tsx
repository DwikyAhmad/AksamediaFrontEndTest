"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Transaction {
    amount: number;
    category: string;
    description: string;
}

export default function DataKeuangan() {
    const router = useRouter();
    const [saldo, setSaldo] = useState<number>(0);
    const [listTransaction, setListTransaction] = useState<Transaction[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const transactions = localStorage.getItem("transactions");
        let parsedTransactions: Transaction[] = [];

        if (transactions !== null) {
            parsedTransactions = JSON.parse(transactions);
            let calculatedSaldo = 0;
            for (const transaction of parsedTransactions) {
                if (transaction.category === "Income") {
                    calculatedSaldo += transaction.amount;
                } else {
                    calculatedSaldo -= transaction.amount;
                }
            }
            setSaldo(calculatedSaldo);
        }

        setListTransaction(parsedTransactions);
    }, []);

    const onDelete = (index: number) => {
        const newTransactions = listTransaction.filter((_, i) => i !== index);
        localStorage.setItem("transactions", JSON.stringify(newTransactions));
        window.alert("Transaction deleted successfully");

        router.refresh();
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = listTransaction.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="font-poppins flex items-center justify-center flex-col gap-6">
            <h1 className="mt-12 text-xl md:text-3xl font-semibold">
                Saldo: Rp{saldo.toLocaleString("id-ID")}
            </h1>
            <Link
                href={"/manage/new"}
                className="bg-blue-600 py-2 px-4 rounded-2xl text-sm hover:bg-blue-800 duration-200"
            >
                Tambah Transaksi
            </Link>

            <div className="flex overflow-x-auto w-full px-4 text-sm sm:px-8 sm:text-base">
                <table className="table-auto mt-2 w-full">
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
                        {currentItems.map((transaction, index) => (
                            <tr key={index}>
                                <td className="border px-3 py-2">{index + 1}</td>
                                <td className="border px-3 py-2">
                                    {transaction.category}
                                </td>
                                <td
                                    className={`border px-3 py-2 ${
                                        transaction.category === "Income"
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    Rp{transaction.amount.toLocaleString("id-ID")}
                                </td>
                                <td className="border px-3 py-2">
                                    {transaction.description}
                                </td>
                                <td className="border px-3 py-2 flex gap-2 flex-wrap">
                                    <Link
                                        href={`/manage/${index}`}
                                        className="bg-orange-500 px-3 rounded-md hover:bg-orange-700 duration-150 
                                        text-center w-[75px]"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="bg-red-500 px-3 rounded-md hover:bg-red-700 duration-150 w-[75px]"
                                        onClick={() => onDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(listTransaction.length / itemsPerPage) }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`mx-1 px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
