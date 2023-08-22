import React from "react";

const VehiclesDetails = ({ vehiclesDetails }) => {
    return (
        <div>
            <h3> Vehicles details: </h3>
            {vehiclesDetails.length > 0 ? (
                <ul>
                    {vehiclesDetails.map((vehicle, index) => (
                     <li key={index}>{vehicle.name}</li>
                    ))}
                </ul>
            ) : (
                <p> Ce personnage n'a pas de véhicule. </p>
            )}
        </div>
    )
}

export default VehiclesDetails