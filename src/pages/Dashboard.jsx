import React from 'react'
import inventory from '../assets/inventory.jpg'
import products from '../assets/products.jpg'
import categories from '../assets/categories.jpg'
import transactions from '../assets/transactions.jpg'
import { useNavigate } from 'react-router-dom'

const pages = [
    { src: inventory, href: "inventory", name: "Inventory" },
    { src: categories, href: "categories", name: "Categories" },
    { src: products, href: "products", name: "Products" },
    { src: transactions, href: "transactions", name: "Transactions" },
];

const Dashboard = () => {

    const navigate = useNavigate()

    return (
        <div className="min-h-full">

            {/* HEADER */}

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:flex justify-between items-center">
                    <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                </div>
            </header>

            {/* MAIN */}

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {pages.map((page, index) => (
                        <div key={index} className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200">
                            <span onClick={() => navigate('/'+page.href)}>
                                <img src={page.src} alt={page.href} />
                                <p className="text-lg md:text-2xl font-bold text-center mt-2 tracking-wide">{page.name}</p>
                            </span>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8 mt-8">
                    <div className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200"></div>
                    <div className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200"></div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard