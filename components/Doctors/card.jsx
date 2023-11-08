
import React from "react";

const Card = ({ doctor }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={doctor.image} alt={doctor.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{doctor.name}</div>
                <p className="text-gray-700 text-base">{doctor.specialty}</p>
            </div>
            <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {doctor.location}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {doctor.rating}
                </span>
            </div>

        </div>

    );
};

export default Card;
