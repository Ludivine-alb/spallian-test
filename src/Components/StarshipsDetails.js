import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/components/starships-details.css"

const StarshipsDetails = () => {
    const { starshipId } = useParams();
    const [starshipDetails, setStarshipDetails] = useState(null);
    const [starshipImage, setStarshipImage] = useState('');

    useEffect(() => {
        getStarshipDetails(starshipId);
    }, []);

    const getStarshipDetails = async () => {
        try {
            const response = await axios.get(`https://swapi.dev/api/starships/${starshipId}/`);
            if (response.data) {
                const starship = response.data;
                setStarshipDetails(starship);
    
                const starshipImageURL = `https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg`;
                setStarshipImage(starshipImageURL);
            }
        } catch (error) {
            console.error('Error during request for starship details', error);
        }
    };
    

    return (
        <div className="starship-details-container">
          <div className="starship-card-details gradient-border">
            <div className="starship-content">
              <div className="starship-image">
                <img src={starshipImage} alt={starshipDetails?.name} />
              </div>
              <div className="starship-info">
                <h2>{starshipDetails?.name}</h2>
                <p>{starshipDetails?.opening_crawl}</p>
                <p><strong>Name: </strong> {starshipDetails?.name}</p>
                <p><strong>Model: </strong> {starshipDetails?.model}</p>
                <p><strong>Manufacture: </strong> {starshipDetails?.manufacturer}</p>
                <p><strong>Cost in credits: </strong> {starshipDetails?.cost_in_credits}</p>
                <p><strong>Length: </strong> {starshipDetails?.length}</p>
                <p><strong>Max Atmosphering Speed: </strong> {starshipDetails?.max_atmosphering_speed}</p>
                <p><strong>Crew: </strong> {starshipDetails?.crew}</p>
                <p><strong>Passengers: </strong> {starshipDetails?.passengers}</p>
                <p><strong>Cargo Capacity: </strong> {starshipDetails?.cargo_capacity}</p>
                <p><strong>Consulables: </strong> {starshipDetails?.consumables}</p>
                <p><strong>Hyperdrive Rating: </strong> {starshipDetails?.hyperdrive_rating}</p>
                <p><strong>MGLT : </strong> {starshipDetails?.MGLT}</p>
                <p><strong>Starship Class : </strong> {starshipDetails?.starship_class}</p>
              <Link className="btn-back" to="/starships">Back to Starships List</Link>
              </div>
            </div>
            <div className="back-link">
            </div>
          </div>
        </div>
      );
    };


export default StarshipsDetails;