"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface Transaction {
    amount: number;
    category: string;
    description: string;
}

export default function DataKeuangan() {
    const router = useRouter();

    let saldo = 0;
    const transactions = localStorage.getItem("transactions");
    let listTransaction: Transaction[];

    if (transactions === null) {
        listTransaction = [];
    } else {
        listTransaction = JSON.parse(transactions);
        for (const transaction of listTransaction) {
            if (transaction.category === "Income") {
                saldo += transaction.amount;
            } else {
                saldo -= transaction.amount;
            }
        }
    }

    const onDelete = (index: number) => { 
        const newTransactions = listTransaction.filter((_, i) => i !== index);
        localStorage.setItem("transactions", JSON.stringify(newTransactions));
        window.alert("Transaction deleted successfully");

        router.refresh();
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
                    {listTransaction.map((transaction, index) => (
                        <tr key={index}>
                            <td className="border px-3 py-2">{index + 1}</td>
                            <td className="border px-3 py-2">{transaction.category}</td>
                            <td className="border px-3 py-2">Rp. {transaction.amount}</td>
                            <td className="border px-3 py-2">{transaction.description}</td>
                            <td className="border px-3 py-2 flex gap-2">
                                <Link href={`/manage/${index}`} className="bg-orange-500 px-3 rounded-md hover:bg-orange-700 duration-150">
                                    Edit
                                </Link>
                                <button className="bg-red-500 px-3 rounded-md hover:bg-red-700 duration-150"
                                onClick={() => onDelete(index)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
