import React from "react";

const SpeciesDetails = ({ speciesDetails }) => {
    return (
        <div>
            <h2> Species informations: </h2>
            {speciesDetails.length > 0 ? (
                <ul>
                    {SpeciesDetails.map((species, index) => (
                        <li key={index}>{species.name}</li>
                    ))}
                </ul>
            ) : (
                <p>This character does not belong to any known species</p>
            )}
        </div>
    )
}

export default SpeciesDetails;