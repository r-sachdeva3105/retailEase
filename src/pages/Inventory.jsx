import React from 'react'
import Header from '../components/Header'
import ItemCard from '../components/ItemCard'
import Search from '../components/Search'

const Inventory = () => {
    return (
        <>
            <div className="min-h-full">
                <Header />
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Inventory</h1>
                        <Search />
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <ItemCard />
                    </div>
                </main>
            </div>
        </>
    )
}

export default Inventory