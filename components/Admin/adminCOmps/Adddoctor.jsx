import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
// import Booked from './Booked'
import { useRouter } from 'next/router'

function Adddoctor() {
    var session = useSession()
    var [user, setUser] = useState({})
    var [loading, setLoading] = useState(false)
    var [success, setSuccess] = useState(false)
    var [data, setData] = useState([{}])
    var [show, setShow] = useState(true)
    var [error, setError] = useState(false)
    var [image, setImage] = useState('')


    var router = useRouter()
    useEffect(() => {
        if (session.status === "authenticated") {
            setUser(session.data.user)
        } else {
            setUser({})
        }
    }, [session.status])

    function Adddoctorment() {

        setLoading(true)
        setShow(false)

        var appoint = {
            email: document.getElementById('emailAddress').value,
            speciality: document.getElementById('speciality').value,
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            image: image
        }

        fetch('/api/doctor/create', {
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
                router.reload()

                return
            } else if (data.status === 'fail') {
                setError(true)
                setTimeout(() => {
                    setError(false)
                    setShow(true)
                    setLoading(false)

                }, 1000);
                alert('Error updating your data message ' + data.message)
            }
        })
    }

    return (
        <div>
            {(show) && <section class="max-w-4xl p-6 mx-auto  rounded-md shadow-md dark:bg-gray-800 mt-20">
                <form>
                    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label class="text-white dark:text-gray-200" for="name">Name</label>
                            <input id="name" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label class="text-white dark:text-gray-200" for="phone">Mobile Number</label>
                            <input id="phone" type="number" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label class="text-white dark:text-gray-200" for="emailAddress">Email Address</label>
                            <input id="emailAddress" type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label class="text-white dark:text-gray-200" for="passwordConfirmation">Select speciality</label>
                            <select id='speciality' class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
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
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-white">
                                Image
                            </label>
                            <div>
                                <label class="text-white dark:text-gray-200" for="name">Image Url</label>
                                <input id="image" type="text" onChange={(e) => setImage(e.target.value)} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />


                            </div>
                            <img src={image} className='h-20 w-20 object-contain' />
                        </div>
                    </div>
                    <div class="flex justify-end mt-6">
                        <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600" onClick={Adddoctorment}>Add Doctor</button>
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
            {(success) &&
                <h3 className="text-xl font-bold">Doctor Added Successfully</h3>
            }

            {(error) && <>
                <h2>Error updating your Data</h2>
            </>}


        </div>
    )
}

export default Adddoctor