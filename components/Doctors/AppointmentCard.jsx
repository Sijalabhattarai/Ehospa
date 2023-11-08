
import React, { useEffect } from "react";
import DoctorNote from "./DoctorNote";

const AppointmentCard = ({ item, doctor, save }) => {
    const [user, setUser] = React.useState({})
    const [showNote, setShowNote] = React.useState(false)


    function toggleNote() {
        setShowNote(!showNote)
    }
    function getUser() {
        fetch('/api/user/getuser?email=' + item.email)
            .then(response => response.json())
            .then(data => {
                setUser(data.data)
            })
    }



    useEffect(() => {
        getUser()
    }
        , [])
    return (
        <div className="flex gap-2 p-2 flex-col rounded bg-slate-600 ">
            <img src={user.image} className="h-20 w-20" referrerPolicy="no-referrer" alt="user image" />
            <p>Name: {user.name}</p>
            <p>Age: {item.age}</p>
            <p>Category: {item.category}</p>
            <p>Problem: {item.problem}</p>
            <button className="btn btn-primary" onClick={toggleNote}>Check</button>

            {(showNote) && <DoctorNote item={item} cancel={toggleNote} save={save} doctor={doctor} patientId={user} />}
        </div>
    );
};

export default AppointmentCard;
