import React, { useEffect, useState } from 'react'

function Appointment() {
    var [appointments, setAppointments] = useState([])
    function getAppointments() {
        fetch('/api/appointment/getallappointment')
            .then(response => response.json())
            .then(data => {
                setAppointments(data.data)
            })
    }

    useEffect(() => {
        getAppointments()
    }
        , [])

    const [filter, setFilter] = useState('All')

    return (
        <div className='flex-1 px-2 pt-8 py-3 sm:px-0'>
            <div className="flex justify-between items-center">
                <h3 className="text-3xl font-extralight text-white/50">Appointments</h3>
            </div>
            {/* generate a filter button with three options Today, past and future */}
            <div className="flex w-96 justify-between items-center mt-4">
                <button onClick={() => setFilter('Today')} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Today</button>
                <button onClick={() => setFilter('Past')} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Past</button>
                <button onClick={() => setFilter('Future')} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Future</button>
                <button onClick={() => setFilter('All')} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">All</button>

            </div>
            <div className="relative pt-10 overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                For
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Doctor
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Queue
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => {
                            let today = new Date()
                            let appointmentDate = new Date(appointment.appointmentDate)

                            if (appointment?.status == 'cancelled') {
                                return (null)
                            }

                            if ((appointmentDate.getDate() === today.getDate() && appointmentDate.getMonth() === today.getMonth() && appointmentDate.getFullYear() === today.getFullYear()) && ((filter === 'Today') || (filter === 'All'))) {
                                return (
                                    <tr className=" bg-green-50 dark:bg-green-700 border-b border-green-200 dark:border-green-800" key={appointment._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-400">
                                            {appointment.appointmentDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {appointment.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {appointment.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {appointment.dedicatedDoctor}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {appointment.queueNumber}
                                        </td>
                                    </tr>
                                )
                            }
                            if ((appointmentDate < today) && ((filter === 'Past') || (filter === 'All'))) {
                                return (
                                    <tr className=" bg-red-50 dark:bg-red-700 border-b border-red-200 dark:border-red-800" key={appointment._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-400">
                                            {appointment.appointmentDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {appointment.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {appointment.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {appointment.dedicatedDoctor}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {appointment.queueNumber}
                                        </td>
                                    </tr>
                                )
                            } else if ((appointmentDate > today) && ((filter === 'Future') || (filter === 'All'))) {
                                return (
                                    <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-800" key={appointment._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-400">
                                            {appointment.appointmentDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {appointment.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {appointment.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {appointment.dedicatedDoctor}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {appointment.queueNumber}
                                        </td>
                                    </tr>
                                )

                            }
                        }
                        )}


                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Appointment