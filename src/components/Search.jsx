import React from 'react'
import './styles/Search.css'

const Search = () => {
    return (
        <div className="search grid">
            <input type='text' name='search' id='search' placeholder='Search...' className='justify-self-end'/>
        </div>
    )
}

export default Search