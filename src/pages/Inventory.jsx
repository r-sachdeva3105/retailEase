import React, { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'
import { useSearchParams } from 'react-router-dom'

const Inventory = () => {

    const [inventory, setInventory] = useState([])
    const [filteredInventory, setFilteredInventory] = useState([])
    const [isRendered, setIsRendered] = useState(false)

    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('http://localhost:8081/api-inventory/all-inventory')
                const data = await response.json()
                if (category) {
                    const filteredData = data.filter(
                        item => {
                            // eslint-disable-next-line
                            return item.product.productCategoryId == category
                        }
                    )
                    setInventory(filteredData)
                    setFilteredInventory(filteredData)
                }
                else {
                    setInventory(data)
                    setFilteredInventory(data)
                }
                setIsRendered(true)
            } catch (error) {
                console.error(error)
            }
        }
        fetchInventory()
    }, [])

    const handleChange = (e) => {
        const productList = inventory.filter(
            item => {
                return item.product.productName.toLowerCase().includes(e.target.value.toLowerCase())
            }
        )
        setFilteredInventory(productList)
    }

    return (
        <div className="min-h-full">

            {/* HEADER */}

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:flex justify-between items-center">
                    <h1 className=" text-center text-3xl font-bold tracking-tight text-gray-900">Inventory</h1>
                    <div className="flex justify-center pt-2 md:pt-0">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input
                                type="text"
                                id="table-search"
                                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-sky-500 focus:border-sky-500"
                                placeholder="Search for items"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN */}

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {isRendered && <ItemCard inventory={filteredInventory} />}
                {filteredInventory == '' && <span className="text-lg font-semibold">No Product Found :(</span>}
            </main>
        </div>
    )
}

export default Inventory