import Link from 'next/link'
import React, { useEffect } from 'react'
import Image from 'next/image'
import logo from '../../src/logo.png'
import { useSession } from 'next-auth/react'

function Nav() {
    var session = useSession()
    var [auth, setAuth] = React.useState(false)
    var [loading, setLoading] = React.useState(true)
    var [userData, setUserData] = React.useState({})
    var [isAdmin, setIsAdmin] = React.useState(false)
    function getUserData() {
        fetch("/api/user/getLogged")
            .then(response => response.json())
            .then(data => {
                setUserData(data.data)
                setAuth(true)
                setLoading(false)
                if (data.data.role == 'admin') {
                    setIsAdmin(true)
                }

            }
            )
    }
    useEffect(() => {
        if (session.status === 'authenticated') {
            getUserData()
        } else if (session.status === 'unauthenticated') {
            setLoading(false)
        }
    }, [session])
    return (
        <header className="bg-black text-white sticky top-0 z-10">
            <div
                className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
            >
                <Link className="block text-teal-600" href="/">
                    <span className="sr-only">Home</span>
                    <Image src={logo} alt="logo" className='h-10 w-10' />
                </Link>

                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <Link href="/about" className="text-gray-500 transition hover:text-gray-500/75" >
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link className="text-gray-500 transition hover:text-gray-500/75" href="/doctors">
                                    Doctors
                                </Link>
                            </li>

                            <li>
                                <Link className="text-gray-500 transition hover:text-gray-500/75" href="/">
                                    Assistant
                                </Link>
                            </li>

                            <li>
                                <Link className="text-gray-500 transition hover:text-gray-500/75" href="/appointment">
                                    Appointment
                                </Link>
                            </li>

                            <li>
                                <Link className="text-gray-500 transition hover:text-gray-500/75" href="/">
                                    Services
                                </Link>
                            </li>


                        </ul>
                    </nav>

                    <div className="flex items-center justify-center gap-4">
                        {(!loading) && <div className="sm:flex sm:gap-4">
                            {(!auth) && <Link
                                className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                                href="/login"
                            >
                                Login
                            </Link>}
                            {(auth) && <Link
                                className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                                href="/dashboard"
                            >
                                {session.data.user.name}
                            </Link>}
                            {(auth) && <Link
                                className="block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                                href="/logout"
                            >
                                Logout
                            </Link>}

                            {(isAdmin) && <Link
                                className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                                href="/admin"
                            >
                                Admin
                            </Link>}
                        </div>}

                        <button
                            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                        >
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Nav