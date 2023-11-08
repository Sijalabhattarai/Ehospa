import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Booked from './Booked'
import { useRouter } from 'next/router'

function BookAppoint({successs, closepop}) {
    var session = useSession()
    var [user, setUser] = useState({})
    var [loading, setLoading] = useState(false)
    var [success, setSuccess] = useState(false)
    var [data, setData] = useState([{}])
    var [show, setShow] = useState(true)
    var [error, setError] = useState(false)


    var router = useRouter()
    useEffect(() => {
        if (session.status === "authenticated") {
            setUser(session.data.user)
        } else {
            setUser({})
        }
    }, [session.status])

    function bookAppointment(e) {
        e.preventDefault()
        var date = new Date(document.getElementById('date').value)

        var today = new Date()
        if (date < today) {
            alert('Please select a valid date')
            return;
        }
        setLoading(true)
        setShow(false)

        var appoint = {
            email: user.email,
            age: document.getElementById('age').value,
            appointmentDate: document.getElementById('date').value,
            problem: document.getElementById('textarea').value,
            category: document.getElementById('category').value,
            dedicatedDoctor: document.getElementById('dedicated').value,
        }

        fetch('/api/appointment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appoint)
        }).then(res => res.json()).then(data => {
            if (data.status === 'fill') {
                alert('Please fill all the fields')
                setLoading(false)
                setShow(true)
                return
            } else if (data.status === 'success') {
                setLoading(false)
                setShow(false)
                setSuccess(true)
                setData(data.data)
                successs()
                return
            } else {
                setError(true)
            }
        })
    }



    let [doctors, setDoctors] = useState([])
    let [specialitys, setSpecialitys] = useState('')


    function getDoctors() {
        var category = document.getElementById('category').value
        fetch('/api/doctor/getall')
            .then(response => response.json())
            .then(data => {
                setDoctors(data.data.filter((doctor) => {
                    return doctor.speciality === category
                }))
            })
    }


    useEffect(() => {
        getDoctors()
    }
        , [specialitys])

    useEffect(() => {
        setShow(true)
    }, [])
    return (
        <div>
            {(show) && <section class="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
                <form method='#' onSubmit={(e)=>bookAppointment(e)}>
                    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label class="text-white dark:text-gray-200" for="name">Name</label>
                            <input id="name" value={user.name} type="text" readOnly class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label class="text-white dark:text-gray-200" for="emailAddress">Email Address</label>
                            <input id="emailAddress" value={user.email} readOnly type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label class="text-white dark:text-gray-200" for="passwordConfirmation">Select a Category</label>
                            <select id='category' onChange={(e) => setSpecialitys(e.target.value)} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                <option>Physician</option>
                                <option>Psycatrist</option>
                                <option>Cardiologist</option>
                                <option>Neurologist</option>
                                <option>Surgeon</option>
                                <option>Orthopedic</option>
                                <option>Urologist</option>
                                <option>Endocrinologist</option>
                                <option>Obstetrician</option>
                                <option>Gynecologist</option>
                                <option>Ophthalmologist</option>
                                <option>Otolaryngologist</option>
                            </select>
                            <span className='text-xs'>If you are not sure which doctor to show, describe your problem to our Assistant, and it will suggest you. Click on third icon of the side bar to explore assistant</span>
                        </div>
                        <div>
                            <label class="text-white dark:text-gray-200" for="age">Age</label>
                            <input id="age" type="number" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label class="text-white dark:text-gray-200" for="date">Appointment Date</label>
                            <input id="date" type="date" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label class="text-white dark:text-gray-200" for="textarea">Describe your problem</label>
                            <textarea id="textarea" type="textarea" class="block w-full px-4 max-h-20 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
                        </div>
                        {/* <div>
                            <label class="block text-sm font-medium text-white">
                                Image
                            </label>
                            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div class="space-y-1 text-center">
                                    <svg class="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div class="flex text-sm text-gray-600">
                                        <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            <span class="">Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                                        </label>
                                        <p class="pl-1 text-white">or drag and drop</p>
                                    </div>
                                    <p class="text-xs text-white">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div> */}
                        <div>
                            <label class="text-white dark:text-gray-200" for="passwordConfirmation">Dedicated Doctor?</label>
                            <select id='dedicated' class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                <option>Any</option>
                                {doctors.map((doctor) => {
                                    return (
                                        <option>{doctor.name}</option>
                                    )
                                })}
                            </select>
                            <span className='text-xs'>If you want to show your problem to a specific doctor, than select else leave at "Any".</span>
                        </div>

                    </div>

                    <div class="flex justify-end mt-6">
                        <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600" type='submit'>Book</button>
                    </div>
                </form>
            </section>}

            {(loading) &&
                <div className="p-4 rounded-md">
                    <h1 className="text-xl font-bold">Please Wait...</h1>
                    <div className="flex justify-center items-center p-5">
                        <svg class="pl" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                                    <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                                    <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                                </linearGradient>
                                <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                                    <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                                </linearGradient>
                            </defs>
                            <circle class="pl__ring" cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)" stroke-width="36" stroke-dasharray="0 257 1 257" stroke-dashoffset="0.01" stroke-linecap="round" transform="rotate(-90,100,100)" />
                            <line class="pl__ball" stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182" stroke-width="36" stroke-dasharray="1 165" stroke-linecap="round" />
                        </svg>

                    </div>
                    <p className="text-sm">We are booking your appointment</p>
                </div>
            }
            {(success) && <Booked data={data} closepop={closepop} />}

            {(error) && <>
                <h2>Error updating your Data</h2>
            </>}


        </div>
    )
}

export default BookAppoint