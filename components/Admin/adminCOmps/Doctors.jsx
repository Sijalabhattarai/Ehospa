import React, { useEffect, useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'
import Doctorcard from './Doctorcard'
import Adddoctor from './Adddoctor'
import EditDoctor from './EditDoctor'
import { useRouter } from 'next/router'

function Doctors() {
    var [doctors, setDoctors] = useState([])
    var [docID, setDocID] = useState('')
    const router = useRouter()

    function getAll() {
        fetch('/api/doctor/getall')
            .then(response => response.json())
            .then(data => {
                setDoctors(data.data)
            })
    }

    useEffect(() => {
        getAll()
    }
        , [])

    function showEditModal(e) {
        document.getElementById('editModel').showModal()
        setDocID(e)
    }

    function closeModel() {
        document.getElementById('editModel').close()
        router.push('/admin?to=doctors')
    }

    function closeDoc() {
        let closeDocm = document.getElementById('closeDoc')
        closeDocm.click()
    }

    return (
        <div className="flex-1 px-2 py-3 sm:px-0">
            <div className="flex justify-between items-center">
                <h3 className="text-3xl font-extralight text-white/50">Doctors</h3>
            </div>
            <div className="flex justify-between items-center pt-5">
                <button className="btn" onClick={() => {
                    document.getElementById('my_modal_4').showModal()
                }}>
                    <IoMdAddCircleOutline />
                    Add Doctors
                </button>
            </div>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Add a Doctor</h3>
                    <Adddoctor closeDoc={closeDoc} done={getAll} />
                    <div className="modal-action">
                        <form method="dialog">
                            <button id='closeDoc' className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {doctors.map((doctor) => {
                    return <Doctorcard docID={setDocID} edit={showEditModal} key={doctor._id} doctor={doctor} />
                })}
            </div>

            <dialog id="editModel" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Edit a Doctor</h3>
                    <EditDoctor docID={docID} />
                    <div className="modal-action">
                        <button onClick={closeModel} className="btn">Close</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Doctors