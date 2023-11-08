import React, { useEffect, useState } from 'react'
import ambulanceService from '../Datas/contact'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


function Hometab({ user }) {

    let [appointment, setAppointments] = useState({})
    let [reqdate, setReqdate] = useState("")
    let [nodata, setNodata] = useState(false)

    function getallAppointments() {
        fetch('/api/appointment/getall')
            .then(response => response.json())
            .then(data => {
                // sort the appointment and only set the appointment thats upcomming also comming soon
                let dataa = data.data
                if (dataa.length > 0) {

                    setAppointments(data.data[0])
                    let date = new Date(data.data[0].appointmentDate)
                    dayjs.extend(relativeTime)
                    setReqdate(dayjs(date).fromNow())
                } else {
                    setNodata(true)
                }
            })
    }
    useEffect(() => {
        getallAppointments()
    }, [])
    return (
        <div className="flex-1 px-2 sm:px-0">
            <div className="flex justify-between items-center">
                <h3 className="text-3xl font-extralight text-white/50">Welcome, {user.name}</h3>
            </div>
            <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                {(!nodata) && <div className="relative group bg-green-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
                    <p className="text-white/50 pb-2">{"Your upcomming appointment"}</p>

                    <img className="w-20 h-20 object-cover object-center rounded-full" src="https://s-media-cache-ak0.pinimg.com/originals/26/4e/30/264e30439c42387c1e3c48d2d038429d.png" alt="cuisine" />
                    <h4 className="text-white text-2xl font-bold capitalize text-center">{appointment.category}</h4>
                    <p className="text-white/50">{reqdate} | Queue Number {appointment.queueNumber}</p>
                    <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">Pending <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
                </div>}
                <div className="relative group bg-gray-900 py-10 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
                    <img className="w-20 h-20 object-cover object-center rounded-full" src="https://th.bing.com/th/id/OIP.zr9r5RhvJ0Dsi7_YLWJk2AHaFj?pid=ImgDet&rs=1" alt="cuisine" />
                    <h4 className="text-white text-2xl font-bold capitalize text-center">Keep Moving</h4>
                    <p className="text-white/50 text-xs">If you want to feel healthier, more energized, or in a better mood, get moving. Regular exercise can benefit both your physical and mental health in a multitude of ways. And, you don’t need to run a half-marathon or sweat it out at the gym for hours every day to reap the rewards.
                    </p>
                    <p className="absolute top-2 left-2 text-white/20 inline-flex items-center text-xs"><span className="ml-2 w-2 mx-2 h-2 block bg-blue-500 rounded-full group-hover:animate-pulse"></span>Health Tips </p>
                </div>
                <div className="relative group bg-gray-900 py-10 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
                    <img className="w-20 h-20 object-cover object-center rounded-full" src="https://th.bing.com/th/id/OIP.zr9r5RhvJ0Dsi7_YLWJk2AHaFj?pid=ImgDet&rs=1" alt="cuisine" />
                    <h4 className="text-white text-2xl font-bold capitalize text-center">Eat more whole foods</h4>
                    <p className="text-white/50 text-xs">Whole foods are foods that haven’t been heavily processed or altered. They don’t contain a lot of added chemicals or artificial ingredients to help them taste good or give them a long shelf-life.</p>
                    <p className="absolute top-2 left-2 text-white/20 inline-flex items-center text-xs"><span className="ml-2 w-2 mx-2 h-2 block bg-blue-500 rounded-full group-hover:animate-pulse"></span>Health Tips </p>
                </div>
                <div className="relative group bg-gray-900 py-10 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
                    <img className="w-20 h-20 object-cover object-center rounded-full" src="https://th.bing.com/th/id/OIP.zr9r5RhvJ0Dsi7_YLWJk2AHaFj?pid=ImgDet&rs=1" alt="cuisine" />
                    <h4 className="text-white text-2xl font-bold capitalize text-center">Sleep More</h4>
                    <p className="text-white/50 text-xs">Sleep is vital for every process in your body. Sleep is a time for your body to repair cells and restore energy. Your brain also performs many essential functions while you’re sleeping, like storing information, removing waste, and strengthening nerve cell connections.</p>
                    <p className="absolute top-2 left-2 text-white/20 inline-flex items-center text-xs"><span className="ml-2 w-2 mx-2 h-2 block bg-blue-500 rounded-full group-hover:animate-pulse"></span>Health Tips </p>
                </div>

            </div>

            <div className="flex justify-between items-center py-10">
                <h3 className="text-3xl font-extralight text-white/50">Emergency Contacts</h3>
            </div>
            <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">


                {ambulanceService.slice(0, 8).map((item) => {
                    return (
                        <div className="relative group bg-gray-900 py-10 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
                            <img className="w-20 h-20 object-cover object-center rounded-full" src="https://th.bing.com/th/id/OIP.pXvuaVszJc3BdyukZCgbHAHaFr?pid=ImgDet&rs=1" alt="cuisine" />
                            <h4 className="text-white font-bold capitalize text-center text-xl">{item.Name}</h4>
                            <p className="text-white/50 text-xs">{item.Address}
                            </p>
                            <a href={`tel:${item.phone}`} className="text-white/50 text-md">{item.phone}</a>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default Hometab