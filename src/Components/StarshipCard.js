import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/starships-card.css";

const StarshipCard = ({ starship, starshipId }) => {
    return (
        <div className="starship-container">
        <div className="starship-card">
            <h2 className="starship-title">{starship.name}</h2>
            <p>Passengers: {starship.passengers}</p>
            <p>Length: {starship.length}</p>
            <Link className="link-btn" to={`/starships/${starshipId}`}>View Details</Link>
        </div>
        </div>
    );
};

export default StarshipCard;