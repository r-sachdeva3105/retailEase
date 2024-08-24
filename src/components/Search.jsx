import React from 'react'

const Search = () => {
    return (
        <input
            type="text"
            name="price"
            id="price"
            className="block w-full sm:w-64 rounded-md border-0 py-1 px-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search..."
        />
    )
}

export default Search