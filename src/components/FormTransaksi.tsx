"use client";

import Link from "next/link";
import { useState } from "react";

interface Transaction {
    amount: number;
    category: string;
    description: string;
}

export default function FormTransaksi() {
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("Expense");
    const [description, setDescription] = useState("");

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCategory(event.target.value);
    };

    const onSubmit = () => {
        const transaction = localStorage.getItem("transactions");

        if (transaction === null) {
            const transactions: Transaction[] = [];
            localStorage.setItem("transactions", JSON.stringify(transactions));
        } else { 
            const transactions: Transaction[] = JSON.parse(transaction);
            const newTransaction = {
                amount,
                category,
                description,
            };

            transactions.unshift(newTransaction);
            localStorage.setItem("transactions", JSON.stringify(transactions));

            window.alert("Transaction added successfully");
        }
    };

    return (
        <div className="flex justify-center items-center font-poppins px-2">
            <div className="mt-12 p-4 rounded-lg border w-[500px]">
                <h2 className="text-2xl font-semibold text-center">
                    Add New Transaction
                </h2>
                <div className="flex flex-col gap-2 font-medium mt-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="text-black rounded-md px-2 py-2 font-normal text-sm"
                            placeholder="Nominal Uang"
                            onChange={(e) =>
                                setAmount(parseInt(e.target.value))
                            }
                            onKeyDown={(e) => (e.key === "Enter" && onSubmit())}
                        />
                        <p className="text-xs font-light">
                            Enter the amount of expenses/income
                        </p>
                    </div>
                    <fieldset className="flex flex-col gap-2">
                        <p>Category</p>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="category"
                                id="expense"
                                value="Expense"
                                onChange={handleCategoryChange}
                                checked={category === "Expense"}
                                onKeyDown={(e) => (e.key === "Enter" && onSubmit())}
                            />
                            <label htmlFor="expense" className="font-light">
                                Expense
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="category"
                                id="income"
                                value="Income"
                                onChange={handleCategoryChange}
                                checked={category === "Income"}
                                onKeyDown={(e) => (e.key === "Enter" && onSubmit())}
                            />
                            <label htmlFor="income" className="font-light">
                                Income
                            </label>
                        </div>
                        <p className="text-xs font-light">
                            Select the category for this transaction
                        </p>
                    </fieldset>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            className="text-black rounded-md px-2 py-2 font-normal text-sm"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Gajian, Makanan, dll"
                            onKeyDown={(e) => (e.key === "Enter" && onSubmit())}
                        ></textarea>
                        <p className="text-xs font-light">
                            Enter the description for this transaction
                        </p>
                    </div>
                    <div className="flex justify-between mt-4">
                        <Link href={"/manage"}
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
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
