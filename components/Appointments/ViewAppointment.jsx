
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const ViewAppointment = ({ data, hide }) => {
    const [appointDate, appointTime] = useState(data.appointmentDate)
    const [isPast, setIsPast] = useState(false)
    const [status, setStatus] = useState(data.status)


    function getTimeForAPpointMEnt() {
        let startTime = '09:00'
        const endTime = '17:00'
        // get estimated time based on queue number
        const queueNumber = data.queueNumber
        const timePerPatient = 20
        const queueTime = queueNumber * timePerPatient
        // if queue number is 1 then estimated time is 9:20 if queue number is 2 then estimated time is 9:40 and so on
        // get today only date not time
        const today = dayjs().format('YYYY-MM-DD')
        // get estimated time
        const estimatedTime = dayjs(`${today} ${startTime}`).add(queueTime, 'minute').format('HH:mm')
        console.log(estimatedTime)
    }

    useEffect(() => {
        getTimeForAPpointMEnt()
    }
        , []);




    useEffect(() => {
        dayjs.extend(relativeTime)
        appointTime(dayjs(data.appointmentDate).fromNow())
        setIsPast(dayjs(data.appointmentDate).isBefore(dayjs()))
    }, [])

    function cancelAppointMent() {
        fetch('/api/appointment/cancelAppointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                appointmentId: data._id
            })
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Appointment Cancelled')
                    hide()
                } else {
                    alert('Something went wrong')
                }
            })
    }
    return (
        <div className="bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Appointment Details as</h2>
            <p>Category: {data.category}</p>
            <p>Dedicated Doctor: {data.dedicatedDoctor}</p>
            <p>Problem: {data.problem}</p>
            <p>Queue Number: {data.queueNumber}</p>
            <p>Appointment {appointDate}.</p>
            <hr />

            {(status == 'checked') &&
                <div className="flex gap-2 flex-col">
                    <h2>Prescription :


                        {(data.prescription) && <>
                            {(data.prescription).map((item, index) => (
                                <>
                                    <p>{item}</p>
                                </>
                            ))}
                        </>}
                    </h2>
                    <hr />
                    <h2>{data.doctorNote}</h2>

                </div>
            }

            {/* doctor quere */}
            <div className="mt-4 flex gap-2">
                {((!isPast) && (status !== 'cancelled')) && <button onClick={cancelAppointMent} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Cancel Appointment
                </button>}
                <button onClick={() => hide()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Back
                </button>
            </div>
        </div>
    );
};

export default ViewAppointment;

