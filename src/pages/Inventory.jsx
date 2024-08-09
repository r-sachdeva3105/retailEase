import React, { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'

const Inventory = () => {

    const [inventory, setInventory] = useState([])
    const [filteredInventory, setFilteredInventory] = useState([])
    const [isRendered, setIsRendered] = useState(false)

    useEffect(() => {
        const fetchInventory = async () => {
            await fetch('http://localhost:8081/api-inventory/all-inventory')
                .then(response => response.json())
                .then(data => {
                    setInventory(data)
                    setFilteredInventory(data)
                    setIsRendered(true)
                })
        }
        fetchInventory()
    }, [])

    const handleChange = (e) => {
        const productList = inventory.filter(
            product => {
                return product.product.productName.toLowerCase().includes(e.target.value.toLowerCase())
            }
        )
        setFilteredInventory(productList)
    }

    return (
        <div className="min-h-full">

            {/* HEADER */}

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:flex justify-between items-center">
                    <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">Inventory</h1>
                    <div className="mt-2 sm:mt-0 sm:flex gap-4">
                        <input
                            type="text"
                            name="price"
                            id="price"
                            className="block w-full sm:w-64 rounded-md border-0 py-1 px-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Search..."
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </header>

            {/* MAIN */}

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {isRendered && <ItemCard inventory={filteredInventory} />}
            </main>
        </div>
    )
}

export default Inventory