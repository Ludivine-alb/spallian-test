import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/components/planets-details.css";

const PlanetDetails = () => {
    const { planetId } = useParams();
    const [planetDetails, setPlanetDetails] = useState(null);
    const [planetImage, setPlanetImage] = useState('');

    useEffect(() => {
        getPlanetDetails(planetId);
    }, []);

    const getPlanetDetails = async () => {
        try {
            const response = await axios.get(`https://swapi.dev/api/planets/${planetId}/`);
            if (response.data) {
                const planet = response.data;
                setPlanetDetails(planet);

                const planetImageURL = `https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`;
                setPlanetImage(planetImageURL);
            }
        } catch (error) {
            console.error('Error during request for planet details', error);
        }
    };

    return (
        <div className="planet-details-container">
          <div className="planet-card-details gradient-border">
            <div className="planet-content">
              <div className="planet-image">
                <img src={planetImage} alt={planetDetails?.id} />
              </div>
              <div className="planet-info">
                <p><strong>Name: </strong>{planetDetails?.name}</p>
                <p><strong>Rotation period: </strong>{planetDetails?.rotation_period}</p>
                <p><strong>Orbital period: </strong>{planetDetails?.orbital_period}</p>
                <p><strong>Diameter: </strong>{planetDetails?.diameter}</p>
                <p><strong>Climate: </strong>{planetDetails?.climate}</p>
                <p><strong>Gravity: </strong>{planetDetails?.gravity}</p>
                <p><strong>Terrain: </strong>{planetDetails?.terrain}</p>
                <p><strong>Surface water: </strong>{planetDetails?.surface_water}</p>
                <p><strong>Population: </strong>{planetDetails?.population}</p>
                <Link to="/planets">Back to Planets List</Link>
              </div>
            </div>
            <div className="back-link">
            </div>
          </div>
        </div>
    );
};

export default PlanetDetails;
