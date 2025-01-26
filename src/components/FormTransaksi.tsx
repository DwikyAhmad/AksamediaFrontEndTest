"use client";

export default function FormTransaksi() {
    const onSubmit = () => {
        //...
    };

    return (
        <div className="flex justify-center items-center font-poppins">
            <div className="mt-12 p-4 rounded-lg bg-blue-500 w-[500px]">
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
                        />
                        <p className="text-xs font-light">
                            Enter the amount of expenses/income
                        </p>
                    </div>
                    <fieldset className="flex flex-col gap-2">
                        <label htmlFor="category">Category</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="category"
                                id="expense"
                                value="expense"
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
                                value="income"
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
                        ></textarea>
                        <p className="text-xs font-light">
                            Enter the description for this transaction
                        </p>
                    </div>
                    <button
                        className="py-2 px-4 bg-blue-800 rounded-lg font-medium 
                        hover:bg-blue-900 duration-200 w-[120px] self-end"
                        onClick={onSubmit}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
