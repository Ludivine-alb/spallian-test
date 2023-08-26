import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/planet-card.css"

const PlanetCard = ({ planet, planetId }) => {
    return (
        <div className="planet-card">
            <h2 className="planet-title">{planet.name}</h2>
            <p>{planet.climate}</p>
            <p>{planet.diameter}</p>
            <p>{planet.terrain}</p>
            <Link className="link-btn" to={`/planets/${planetId}`}>View Details</Link>
        </div>
    );
};

export default PlanetCard;