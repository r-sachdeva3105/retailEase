import React, { useState } from 'react'
import { Field, Label, Radio, RadioGroup } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'

const roles = ['admin', 'assistant', 'associate']

const Login = () => {

    const navigate = useNavigate()

    const [selected, setSelected] = useState(roles[0])
    const [emailValid, setEmailValid] = useState()
    const [passwordValid, setPasswordValid] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        e.target.form[2].value === "" ? setEmailValid(false) : setEmailValid(true)
        e.target.form[3].value === "" ? setPasswordValid(false) : setPasswordValid(true)

        if (emailValid && passwordValid) {
            navigate('/dashboard')
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                                User Role
                            </label>
                            <div className="mt-2">
                                <RadioGroup
                                    id="user"
                                    name="user"
                                    value={selected}
                                    onChange={setSelected}
                                    aria-label="User Role"
                                    className="flex justify-between"
                                >
                                    {roles.map((role, index) => (
                                        <Field key={index} className="flex items-center gap-2">
                                            <Radio
                                                value={role}
                                                className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
                                            >
                                                <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                                            </Radio>
                                            <Label className="capitalize">{role}</Label>
                                        </Field>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    onBlur={(e) => e.target.value === '' ? setEmailValid(false) : setEmailValid(true)}
                                />
                            </div>
                            {emailValid === false && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                Invalid email field !
                            </span>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    onBlur={(e) => e.target.value === '' ? setPasswordValid(false) : setPasswordValid(true)}
                                />
                            </div>
                            {passwordValid === false && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                Invalid password field !
                            </span>}
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login