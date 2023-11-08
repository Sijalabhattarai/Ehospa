import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GiNurseMale } from 'react-icons/gi'
import { BsPersonFillAdd } from 'react-icons/bs'
import Link from 'next/link'
import Doctors from './adminCOmps/Doctors'
import Appointment from './adminCOmps/Appointment'
import Allusers from './adminCOmps/Allusers'
import { FiUsers } from 'react-icons/fi'


function Adminhome(user) {
    let [option, setOption] = React.useState("doctors")
    var Router = useRouter()
    let [userDetails, setUserDetails] = useState({})


    useEffect(() => {
        fetch('/api/user/getLogged')
            .then(response => response.json())
            .then(data => {
                if (data.data.role == 'admin') {
                    setUserDetails(data.data)
                } else {
                    Router.push('/')
                }
            })
    }, [])




    return (
        <div className="bg-gray-900  min-h-screen w-screen flex items-center justify-center">
            <div className="bg-gray-800 min-h-screen box-border  flex-1 flex flex-col lg:flex-row lg:space-x-10">
                <div className="bg-gray-900 px-2 lg:px-4 py-2 sticky top-0 lg:py-10 flex lg:flex-col h-92 justify-between  md:h-auto navtab z-50" style={{ order: (window.innerWidth <= 1024) ? -1 : 0 }}>
                    <nav className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
                        <a className={`${(option == 'doctors') && 'bg-gray-800'} p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover`} onClick={() => setOption('doctors')}>
                            <GiNurseMale />
                        </a>
                        <a className={`${(option == 'appointment') && 'bg-gray-800'} p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover`} onClick={() => setOption('appointment')}>
                            <BsPersonFillAdd />
                        </a>
                        <a className={`${(option == 'assistant') && 'bg-gray-800'} p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover`} onClick={() => setOption('assistant')}>
                            <FiUsers />
                        </a>
                    </nav>
                    <div className={`${(option == 'admin') && 'bg-gray-800'} flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2`}>

                        <Link className="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover" href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="flex h-screen overflow-scroll scroll-hidden p-2 w-full">
                    {(option == 'doctors') && <Doctors />}
                    {(option == 'appointment') && <Appointment />}
                    {(option == 'assistant') && <Allusers />}

                </div>
            </div>

        </div>
    )
}

export default Adminhome
