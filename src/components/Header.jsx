import React, { useState, useEffect } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    role: 'Admin',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Categories', href: '/categories' },
    { name: 'Products', href: '/products' },
    { name: 'Transactions', href: '/transactions' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {

    const path = window.location.pathname
    const [activeItem, setActiveItem] = useState()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        const path = window.location.pathname
        const activeNavItem = navigation.find((item) => item.href === path)
        path !== '/login' ? setActiveItem(activeNavItem.name) : setActiveItem(null)
    }, [])

    const openProfile = () => {
        setIsDialogOpen(true)
    }

    const closeProfile = () => {
        setIsDialogOpen(false)
    }

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-20 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <h2 className='text-white font-bold text-4xl'>RetailEase</h2>
                                    </div>
                                    {path !== '/login' && <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    aria-current={activeItem === item.name ? 'page' : undefined}
                                                    className={classNames(
                                                        activeItem === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-md font-medium',
                                                    )}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>}
                                </div>
                                {path !== '/login' && <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                                </MenuButton>
                                            </div>
                                            <MenuItems
                                                transition
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                            >
                                                <MenuItem>
                                                    <span onClick={openProfile} className='block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100'>
                                                        Your Profile
                                                    </span>
                                                </MenuItem>
                                                <MenuItem>
                                                    <Link to={'/login'} className='block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100'>
                                                        Logout
                                                    </Link>
                                                </MenuItem>
                                            </MenuItems>
                                        </Menu>
                                    </div>
                                </div>}
                                {path !== '/login' && <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>}
                            </div>
                        </div>

                        <DisclosurePanel className="md:hidden transition duration-500">
                            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                {navigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        aria-current={activeItem === item.name ? 'page' : undefined}
                                        className={classNames(
                                            activeItem === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                        <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    <DisclosureButton
                                        as="span"
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        onClick={openProfile}
                                    >
                                        Your Profile
                                    </DisclosureButton>
                                    <DisclosureButton
                                        as="a"
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        href={'/login'}
                                    >
                                        Logout
                                    </DisclosureButton>
                                </div>
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
            <Dialog as="div" open={isDialogOpen} onClose={closeProfile} className="relative z-10 focus:outline-none">
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel transition className="w-full max-w-md rounded-xl bg-gray-800 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                            <div className="flex flex-col items-center justify-center">
                                <DialogTitle className="text-2xl font-semibold text-gray-100 mb-4">Your Profile</DialogTitle>
                                <div className="flex-shrink-0 my-2">
                                    <img className="h-20 w-20 rounded-full object-cover object-center" src={user.imageUrl} alt={user.name} />
                                </div>
                                <h3 className="text-lg font-medium text-gray-100 font-mono">
                                    {user.name}
                                </h3>
                                <h3 className="text-md font-medium text-gray-100 font-mono">
                                    {user.role}
                                </h3>
                                <h3 className="text-lg font-medium text-gray-100 font-mono">
                                    {user.email}
                                </h3>
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 mt-4 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={closeProfile}
                                >
                                    Close
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Header