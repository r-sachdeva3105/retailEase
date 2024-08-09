import React from 'react'
import { useNavigate } from 'react-router-dom'


const Products = () => {

    const navigate = useNavigate()
    const add = () => navigate('/add')

    return (
        <div className="min-h-full">

            {/* HEADER */}

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">Products</h1>
                    <button onClick={add} type="button" className="inline-flex items-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                        <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                        Add Product
                    </button>
                </div>
            </header>

            {/* MAIN */}

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

            </main>
        </div>
    )
}

export default Products