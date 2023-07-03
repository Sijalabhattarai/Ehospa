import React from 'react'
import DoctorCard from './DoctorCard'
import data from '../../data.js'

function Doctors() {
    console.log(data)
    return (
        <div className='min-h-screen'>
            <h2 className='text-center text-white font-bold sm:text-4xl text-2xl p-5'>Our Staffs</h2>

            <div className="flex flex-wrap gap-5 sm:flex-row flex-col justify-center">
                {data.slice(0, 8).map((doctor) => {
                    return (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    )
                })
                }
            </div>
        </div>
    )
}

export default Doctors