import React from 'react'

const Checkout = () => {
    return (
        <div className="min-h-full">

            {/* HEADER */}

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl p-4 md:flex justify-between items-center">
                    <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">Checkout</h1>
                </div>
            </header>

            {/* MAIN */}

            <main className="mx-auto max-w-7xl p-4">
                <div className="grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-4 xl:gap-x-4">
                    <div className="relative lg:col-span-3 p-4 rounded-md shadow"></div>
                    <div className="relative p-4 rounded-md shadow">
                        <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
                        <div className="my-2">
                            <dl className="space-y-2">
                                <div className="flex justify-between">
                                    <dt className="text-sm font-medium text-gray-600">Subtotal</dt>
                                    <dd className="text-sm text-gray-900 font-medium">$0.00</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm font-medium text-gray-600">Tax</dt>
                                    <dd className="text-sm text-gray-900 font-medium">$0.00</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-md font-bold text-gray-800">Total</dt>
                                    <dd className="text-md font-bold text-gray-900">$0.00</dd>
                                </div>
                            </dl>
                        </div>
                        <button type="button" className="mt-2 inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Checkout