
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AppointmentCard from "../../components/Doctors/AppointmentCard";
import Head from "next/head";

function Doctor() {
    const [loading, setLoading] = React.useState(true)
    const [appointments, setAppointments] = React.useState([])
    const [myAppointment, setMyAppointment] = React.useState([])
    const [auth, setAuth] = React.useState(false)
    const [doctor, setDoctor] = React.useState({})
    const [categoryAppointment, setCategoryAppointment] = React.useState([])
    const [futureAppointments, setFutureAppointments] = React.useState([])
    const [completedAppointment, setcompletedAppointment] = React.useState([])
    var router = useRouter()


    function fetchDoctor() {
        fetch('/api/doctor/isDoctor')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message == 'Doctor') {
                    setLoading(false)
                    setAuth(true)
                    setDoctor(data.data)
                } else {
                    router.push('/')
                }
            })
    }

    useEffect(() => {
        fetchDoctor()
    }
        , [])

    function getallAppointment() {
        fetch('/api/appointment/getallappointment')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAppointments(data.data)
                console.log(data.data)
                classifyAppointment(data.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        if (auth)
            getallAppointment()
    }, [auth])


    function classifyAppointment(e) {

        let arr = []
        // check if status is pending
        e.forEach((item) => {
            if (item.status == 'pending') {
                arr.push(item)
            }
        }
        )
        e = arr
        // get todays appointments
        let today = new Date()
        let todayAppointments = e.filter((item) => {
            let date = new Date(item.appointmentDate)
            return date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()
        })
        let myAppointment = todayAppointments.filter((item) => {
            return item.dedicatedDoctor == doctor.name
        }
        )
        setMyAppointment(myAppointment)

        // get all todats appointments based on category = Cardiologist
        let categAppointment = todayAppointments.filter((item) => {
            // item category and dedicated doctor is not equal to doctor
            return item.category == doctor.speciality && item.dedicatedDoctor != doctor.name
        })

        setCategoryAppointment(categAppointment)

        // get all appointmen of future date with the same doctor
        let futureAppointments = e.filter((item) => {
            let date = new Date(item.appointmentDate)
            return date.getDate() > today.getDate() && date.getMonth() >= today.getMonth() && date.getFullYear() >= today.getFullYear()
        })

        // get today but completed and doctor name is same
        let completedAppointments = e.filter((item) => {
            let date = new Date(item.appointmentDate)
            return date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear() &&
                item.dedicatedDoctor === doctor.name;
        }
        )

        setcompletedAppointment(completedAppointments)
        console.log(completedAppointments)


        setFutureAppointments(futureAppointments)


        console.log(todayAppointments, categAppointment, myAppointment)


    }

    const [show, setShow] = React.useState(false)

    if (loading) return (<div>Loading...</div>)

    return (
        <div className="flex h-screen bg-gray-800">
            <Head>
                <title>Doctor Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center py-4 px-6 bg-gray-800 border-b-4 border-indigo-600">
                    <div className="flex items-center">
                        <button className="text-gray-50 focus:outline-none lg:hidden">
                            <svg
                                className="h-6 w-6 fill-current"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 6h16M4 12h16M4 18h16"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <div className="relative mx-4 lg:mx-0">
                            <p className="text-bold">Doctor Dashboard</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="relative">
                            <button onClick={() => setShow(!show)} className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-500 ease-in-out">
                                <img
                                    className="h-8 w-8 rounded-full object-cover"
                                    src={doctor.image}
                                    referrerPolicy="no-referrer"
                                    alt="Your avatar"
                                />
                            </button>
                            {/* logout button with ai icon */}
                            {(show) && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                                <a
                                    href="/logout"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                                >
                                    Logout
                                </a>
                            </div>}
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800">
                    <div className="container mx-auto px-6 py-8">
                        <h3 className="text-white text-3xl font-medium">Hello Dr. {(doctor?.name.split(' ')[0])}</h3>
                        <div className="mt-4">
                            <div className="flex gap-5 flex-wrap -mx-6">
                                <div className="w-full min-w-fit px-6 sm:w-1/2 xl:w-1/3">
                                    <div className="flex flex-col gap-3 px-5 py-6 shadow-sm rounded-md bg-slate-700">
                                        <p>Your todays Appointments</p>

                                        {(myAppointment.length != 0) && <div className="flex gap-2">
                                            {myAppointment.map((item) => {
                                                return (
                                                    <AppointmentCard save={getallAppointment} doctor={doctor.name} item={item} />
                                                )
                                            })}
                                        </div>}

                                        {(myAppointment.length == 0) && <div className="flex gap-2">
                                            <p className="text-white/50">No Appointments for today</p>
                                        </div>}

                                    </div>
                                </div>

                                <div className="w-full min-w-fit mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                                    <div className="flex flex-col gap-3 px-5 py-6 shadow-sm rounded-md bg-slate-700">
                                        <p>All today's {doctor.speciality} Appointments</p>
                                        {(categoryAppointment.length != 0) && <div className="flex gap-2">
                                            {categoryAppointment.map((item) => {
                                                return (
                                                    <AppointmentCard save={getallAppointment} doctor={doctor} item={item} />
                                                )
                                            })}
                                        </div>}
                                        {(categoryAppointment.length == 0) && <div className="flex gap-2">
                                            <p className="text-white/50">No Appointments for today</p>
                                        </div>}
                                    </div>
                                </div>

                                <div className="w-full min-w-fit mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                                    <div className="flex flex-col gap-3 px-5 py-6 shadow-sm rounded-md bg-slate-700">
                                        <p>Your Completed Appointments</p>
                                        {(completedAppointment.length != 0) && <div className="flex gap-2">
                                            {completedAppointment.map((item) => {
                                                return (
                                                    <AppointmentCard save={getallAppointment} doctor={doctor} item={item} />
                                                )
                                            })}
                                        </div>}
                                        {(completedAppointment.length == 0) && <div className="flex gap-2">
                                            <p className="text-white/50">No Completed Appointments</p>
                                        </div>}
                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Doctor;
