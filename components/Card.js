import React from "react";

const Card = ({ name, image, speciality }) => {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{speciality}</p>
    </div>
  );
};

export default Card;
