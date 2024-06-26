import React from 'react'
import image from '../assets/image.png'

const products = [
    {
        id: 1,
        name: "Lay's Classic",
        href: '#',
        imageSrc: { image },
        imageAlt: "Lay's Classic",
        price: '$3.25',
        quantity: '24',
    },
    {
        id: 2,
        name: "Lay's Classic",
        href: '#',
        imageSrc: { image },
        imageAlt: "Lay's Classic",
        price: '$3.25',
        quantity: '24',
    },
    {
        id: 3,
        name: "Lay's Classic",
        href: '#',
        imageSrc: { image },
        imageAlt: "Lay's Classic",
        price: '$3.25',
        quantity: '24',
    },
    {
        id: 4,
        name: "Lay's Classic",
        href: '#',
        imageSrc: { image },
        imageAlt: "Lay's Classic",
        price: '$3.25',
        quantity: '24',
    },
]

const ItemCard = () => {
    return (
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
                <div key={product.id} className="group relative p-4 rounded-md shadow">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:w-64">
                        <img
                            src={image}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div>
                            <h3 className="text-md font-bold text-gray-700">
                                <a href={product.href}>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {product.name}
                                </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">Quantity: {product.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ItemCard