import React, { useState } from 'react'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { Button, Dialog, DialogPanel, Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'

const ItemCard = (props) => {

    // console.log(props.inventory[0])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [quantValid, setQuantValid] = useState()

    const [sku, setSku] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const [name, setName] = useState('')
    const [warehouse, setWarehouse] = useState('')
    const [expiry, setExpiry] = useState(0)

    const close = () => {
        setIsDialogOpen(false)
    }

    const handleClick = (sku, quantity, name, warehouse, expiry) => {
        console.log(expiry)
        setSku(sku)
        setQuantity(quantity)
        setName(name)
        setWarehouse(warehouse)
        setExpiry(expiry)
        setIsDialogOpen(true)
    }

    const updateQuantity = async () => {
        if (quantity >= 0) {
            setQuantValid(true)
            const request = {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "productSKU": sku,
                    "warehouseID": warehouse,
                    "expiryDate": expiry,
                    "quantity": quantity
                })
            }
            await fetch('http://localhost:8081/api-inventory/update-inventory', request)
                .then(res => {
                    if (res?.ok) {
                        setIsDialogOpen(false)
                        window.location.reload()
                    } else {
                        setQuantValid(false)
                    }
                })
                .catch(err => {
                    console.error(err)
                    setQuantValid(false)
                })
        } else {
            setQuantValid(false)
            console.log(quantValid)
        }
    }

    return (
        <>
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {props.inventory?.map((product) => (
                    <div key={product.productSKU} className="group relative p-4 rounded-md shadow overflow-hidden bg-white">
                        <div className="w-full h-60 overflow-hidden rounded-md">
                            <img
                                src={`data:image/png;base64,${product.product.productImage}`}
                                alt={product.product.productName}
                                className="h-full object-cover mx-auto"
                            />
                        </div>
                        <div className="mt-4">
                            <div className="items-center">
                                <h3 className="text-lg font-bold text-gray-700">
                                    <a href={product.href} className="hover:text-gray-900">
                                        {product.product.productName}
                                    </a>
                                </h3>
                                <p className="text-md font-semibold text-gray-900">${product.product.productSellingPrice}</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm font-semibold text-gray-500">Quantity: {product.quantity}</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleClick(
                                            product.productSKU,
                                            product.quantity,
                                            product.product.productName,
                                            product.warehouseID,
                                            product.product.isExpirable ? product.expiryDate : ''
                                        );
                                    }}
                                    className="py-2 px-4 bg-sky-600 cursor-pointer rounded-md hover:bg-sky-700"
                                >
                                    <PencilSquareIcon className="h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Dialog as="div" open={isDialogOpen} onClose={close} className="relative z-10 focus:outline-none">
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel transition className="w-full max-w-md rounded-xl bg-gray-800 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                            <Field>
                                <form>
                                    <Label className="text-md font-medium text-white">Update Product</Label>
                                    <Description className="text-sm/6 text-white/50">Update quantity of product {name}</Description>
                                    <div className="flex items-center justify-center my-3">
                                        <button
                                            className="flex justify-center items-center w-10 h-10 rounded-full text-white focus:outline-none bg-gray-600 hover:bg-gray-500"
                                            onClick={(e) => { e.preventDefault(); setQuantity(quantity - 1) }}>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                            </svg>
                                        </button>
                                        <Input
                                            type="number"
                                            className={clsx(
                                                'mx-3 w-20 rounded-lg border-none bg-white/5 py-1.5 px-3 text-lg font-bold text-white',
                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 text-center'
                                            )}
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                        <button
                                            className="flex justify-center items-center w-10 h-10 rounded-full text-white focus:outline-none bg-sky-600 hover:bg-sky-500"
                                            onClick={(e) => { e.preventDefault(); setQuantity(quantity + 1) }}>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12M6 12h12"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    {quantValid === false && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1">
                                        Invalid quantity field !
                                    </span>}
                                    <div className="mt-4 flex justify-end gap-4">
                                        <Button
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                            onClick={close}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                            onClick={updateQuantity}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </form>
                            </Field>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default ItemCard