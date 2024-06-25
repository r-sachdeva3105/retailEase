import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Search from '../components/Search';
import ItemCard from '../components/ItemCard';

const Inventory = () => {
    return (
        <div>
            <Header />
            <div className='inventory p-5'>
                <Search />
                <ItemCard />
            </div>
            <Footer />
        </div>
    )
}

export default Inventory