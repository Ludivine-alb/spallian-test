import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/character-card.css";

const CharacterCard = ({ character }) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseOn = () => {
        setIsHovered(true);
    };

    const handleMouseOff = () => {
        setIsHovered(false);
    };

    return (
        <div>
        <div className={`character-card ${isHovered ? "hover-effect" : ""}`}
      onMouseEnter={handleMouseOn}
      onMouseLeave={handleMouseOff} >
            <h2>{character.name}</h2>
            <p><strong>Birth date: </strong> {character.birth_year}</p>
            <p><strong>Gender: </strong> {character.gender}</p>
            <Link className="link-btn" to={`/character/${character.name.replace(/\s+/g, '-').toLowerCase()}`}>View details</Link>
        </div>
        </div>
    );
};

export default CharacterCard;