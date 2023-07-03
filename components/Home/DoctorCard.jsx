import React from 'react'

function DoctorCard({ doctor }) {
    return (
        <div className='sm:w-1/5 h-96 w-full'><a href="#" class="group relative block bg-black">
            <img
                alt="Developer"
                src={doctor.image}
                className="absolute inset-0 h-96  w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8">
                <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                    {doctor.post}
                </p>

                <p className="text-xl font-bold text-white sm:text-2xl">{doctor.name}</p>
            </div>
        </a></div>
    )
}

export default DoctorCard