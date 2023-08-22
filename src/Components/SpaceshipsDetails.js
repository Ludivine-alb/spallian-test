import React from "react";

const SpaceshipsDetails = ({ spaceshipsDetails }) => {
    return (
        <div>
            <h3> Spaceships informations: </h3>
            {spaceshipsDetails.length > 0 ? (
                <ul>
                    {spaceshipsDetails.map((spaceship, index) => (
                        <li key={index}>{spaceship.name}</li>
                    ))}
                </ul>
            ) : (
                <p>This character has not piloted any known spaceship.</p>
            )}
        </div>
    );
};

export default SpaceshipsDetails;