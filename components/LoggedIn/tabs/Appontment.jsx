import React, { useEffect, useState } from 'react'
import BookAppoint from './BookAppoint'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import AppointSkel from './AppointSkel'
import ViewAppointment from '../../Appointments/ViewAppointment'

function Appointment() {
    let [appointments, setAppointments] = useState([])
    var [loading, setLoading] = useState(true)
    const [appointment, setAppointment] = useState({})
    const [clicked, setClicked] = useState(false)


    function hidePop() {
        setClicked(false)
        getallAppointments()
    }

    async function getallAppointments() {
        await fetch('/api/appointment/getall')
            .then(response => response.json())
            .then(data => {
                setAppointments(data.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        getallAppointments()
    }
        , [])

    const [activeFilter, setActiveFilter] = useState('all');

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        if (filter === 'all') {
            getallAppointments()
        } else {
            let appo = []
            appointments.map((appointment) => {
                if (appointment?.status == filter) {
                    appo.push(appointment)
                }
            })
            setAppointments(appo)
        }

    };


    function closePop() {
        document.getElementById('close').click()
    }

    return (
        <div className="flex-1 px-2 sm:px-0">
            <div className="flex justify-between items-center">
                <h3 className="text-3xl font-extralight text-white/50">Your Appointments</h3>
            </div>
            {/* make a filter with four buttons, completed, pending, cancelled and all */}
            <div className="flex space-x-4 my-5" id='filterAppoint'>
                <button
                    className={`px-4 py-2 ${activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                    onClick={() => handleFilterChange('all')}
                >
                    All
                </button>
                <button
                    className={`px-4 py-2 ${activeFilter === 'completed' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                    onClick={() => handleFilterChange('completed')}
                >
                    Completed
                </button>
                <button
                    className={`px-4 py-2 ${activeFilter === 'pending' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                    onClick={() => handleFilterChange('pending')}
                >
                    Pending
                </button>
                <button
                    className={`px-4 py-2 ${activeFilter === 'cancelled' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                    onClick={() => handleFilterChange('cancelled')}
                >
                    Cancelled
                </button>
            </div>




            <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div id='addAppoint' onClick={() => {
                    document.getElementById('my_modal_4').showModal()
                }} className="group bg-gray-900/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover">
                    <a className="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </a>
                    <a className="text-white/50 group-hover:text-white group-hover:smooth-hover text-center" href="#">Create An Appointment</a>
                </div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">Book an Appointment</h3>
                        <BookAppoint successs={getallAppointments} closepop={closePop} />
                        <div className="modal-action">
                            <form method="dialog">
                                <button id='close' className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                {appointments.map((appointment) => {
                    let today = new Date()
                    let date = new Date(appointment.appointmentDate)
                    dayjs.extend(relativeTime)
                    let reqdate
                    reqdate = (dayjs(date).fromNow())
                    function clickedAppointment() {
                        setClicked(true)
                        setAppointment(appointment)
                    }
                    if ((activeFilter != 'cancelled') && (appointment.status == 'cancelled')) {
                        return null
                    }
                    if (date > today) {
                        return (
                            <div onClick={() => clickedAppointment(appointment)} className={`relative group ${(activeFilter == 'cancelled') ? 'bg-blue-950' : 'bg-green-900'} py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover`}>
                                <img className="w-20 h-20 object-cover object-center rounded-full" src="https://s-media-cache-ak0.pinimg.com/originals/26/4e/30/264e30439c42387c1e3c48d2d038429d.png" alt="cuisine" />
                                <h4 className="text-white text-2xl font-bold capitalize text-center">{appointment.category}</h4>
                                <p className="text-white/50">{reqdate} | Queue Number {appointment.queueNumber}</p>
                                <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">
                                    {(appointment.status) || 'Pending'}
                                    <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
                            </div>
                        )
                    }
                    else {
                        return (<div onClick={() => clickedAppointment(appointment)} className="relative group bg-orange-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
                            <img className="w-20 h-20 object-cover object-center rounded-full" src="https://s-media-cache-ak0.pinimg.com/originals/26/4e/30/264e30439c42387c1e3c48d2d038429d.png" alt="cuisine" />
                            <h4 className="text-white text-2xl font-bold capitalize text-center">{appointment.category}</h4>
                            <p className="text-white/50">{reqdate} | Queue Number {appointment.queueNumber}</p>
                            <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">Completed <span className="ml-2 w-2 h-2 block bg-red-500 rounded-full group-hover:animate-pulse"></span></p>
                        </div>

                        )
                    }
                }
                )}

                {(loading) && <>
                    <AppointSkel />
                    <AppointSkel />
                    <AppointSkel />
                    <AppointSkel />
                    <AppointSkel />
                    <AppointSkel />
                    <AppointSkel />
                </>}

                {(clicked) && <div className="fixed top-0 left-0 h-screen w-full z-50 inset-0 flex justify-center items-center backdrop-blur-sm overflow-y-auto">
                    <ViewAppointment hide={hidePop} data={appointment} />
                </div>
                }
            </div>
        </div>
    )
}

export default Appointment