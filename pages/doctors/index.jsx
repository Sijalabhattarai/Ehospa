import React, { useEffect, useState } from "react";
import Card from "../../components/Card";

const DoctorCards = () => {
    const [doctorData, setDoctorData] = useState([]);

    function fetchDoctors() {
        fetch('/api/doctor/getall')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status == 'success') {
                    setDoctorData(data.data);
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchDoctors();
    }
        , []);

    return (
        <div>
            <h3 className="text4">Doctors and Staffs</h3>
            <div className="containers">
                <div className="column p-5">
                    {doctorData.map((doctor, index) => (
                        <Card
                            key={index}
                            name={doctor?.name}
                            image={doctor?.image}
                            speciality={doctor?.speciality}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorCards;

