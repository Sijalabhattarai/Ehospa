import React, { useEffect } from 'react'
import Appointment from './tabs/Appontment'
import Assistant from '../Assistant.jsx/Assistant'
import Hometab from './tabs/Hometab'
import Adminhome from '../Admin/Adminhome'
import { useRouter } from 'next/router'
import { BsShieldCheck } from 'react-icons/bs'

function Dashboard(user) {
    let [option, setOption] = React.useState("home")
    var Router = useRouter()




    return (
        <div className="bg-gray-900  min-h-screen flex items-center justify-center">
            <div className="bg-gray-800 min-h-screen box-border  flex-1 flex flex-col lg:flex-row lg:space-x-10">
                <div className="bg-gray-900 px-2 lg:px-4 py-2 sticky top-0 lg:py-10 flex lg:flex-col h-92 justify-between  md:h-auto navtab z-50" style={{ order: (window.innerWidth <= 1024) ? -1 : 0 }}>
                    <nav className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
                        <a className={`${(option == 'home') && 'bg-gray-800'} p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover`} onClick={() => setOption('home')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </a>
                        <a className={`${(option == 'appointment') && 'bg-gray-800'} p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover`} onClick={() => setOption('appointment')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                        </a>
                        <a className={`${(option == 'assistant') && 'bg-gray-800'} p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover`} onClick={() => setOption('assistant')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </nav>
                    <div className={`${(option == 'admin') && 'bg-gray-800'} flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2`}>
                        <a className="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover" onClick={() => Router.push('/admin')}>
                            <BsShieldCheck />
                        </a>
                        <a className="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover" href="/logout">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="flex h-screen overflow-scroll scroll-hidden p-2 w-full">
                    {(option == 'appointment') && <Appointment />}
                    {(option == 'home') && <Hometab user={user} />}
                    {(option == 'assistant') && <Assistant />}
                </div>
            </div>

        </div>
    )
}

export default Dashboard