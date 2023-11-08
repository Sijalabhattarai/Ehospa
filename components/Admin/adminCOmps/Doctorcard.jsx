import { useRouter } from 'next/router'
import React from 'react'

function Doctorcards({ doctor, edit }) {
    const router = useRouter()

    function deldata() {
        fetch('/api/doctor/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(doctor)
        }).then(res => res.json()).then(data => {
            if (data.status === 'success') {
                alert('Doctor deleted successfully')
                window.location.reload()
                return
            } else if (data.status === 'fail') {
                alert('Doctor not deleted')
                return
            }
        })

    }

    function editDoc() {
        edit(doctor._id)
        router.push('/admin?to=doctors&id=' + doctor._id)

    }

    return (

        <div className="relative group bg-gray-900 py-10 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
            <img className="w-20 h-20 object-cover object-center rounded-full" src={doctor.image} alt="doctor" />
            <h4 className="text-white text-2xl font-bold capitalize text-center">{doctor.name}</h4>
            <p className="text-white/50 text-xs">{doctor.speciality} | {(doctor.available) ? <span className='text-green-800'>Available</span> : <span className='text-red-800'>Not Available</span>}</p>
            <p className="text-white/50 text-xs">{doctor.phone} | {doctor.email}</p>
            <div className="flex gap-2">
                <button className="btn btn-primary" onClick={() => editDoc(doctor._id)}>
                    Edit
                </button>

                <button className="btn btn-error" onClick={deldata}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Doctorcards