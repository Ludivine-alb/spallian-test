import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import SpaceshipsDetails from "./SpaceshipsDetails";
import VehiclesDetails from "./VehiclesDetails";
import "../styles/components/character-details.css"

const CharacterDetails = () => {
    const { characterName } = useParams();
    const [CharacterDetails, setCharacterDetails] = useState('');
    const [CharacterSpeciesDetails, setCharacterSpeciesDetails] = useState([]);
    const [CharacterSpaceshipsDetails, setCharacterSpaceshipsDetails] = useState([]);
    const [CharacterVehiclesDetails, setCharacterVehiclesDetails] = useState([])
    const [homeworldName, setHomeworldName] = useState("");
    const [characterImage, setCharacterImage] = useState(null);
    const [characterMoviesDetails, setcharacterMoviesDetails] = useState([]);

    useEffect(() => {
        getCharacterDetails();
    }, []);

    const getCharacterDetails = async () => {
        try {
            const normalizedCharacterName = characterName.replace(/-/g, ' ');
            const response = await axios.get(`https://swapi.dev/api/people/?search=${normalizedCharacterName}`);
            console.log(response.data.results)
            if (response.data.results.length > 0) {
                const character = response.data.results[0];
                setCharacterDetails(character);
                console.log(character)

                const characterId = character.url.match(/\d+/);
                axios
                    .get(`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`)
                    .then((imageResponse) => {
                        setCharacterImage(imageResponse.config.url);
                    })
                    .catch((error) => {
                        console.error("Error fetching character image:", error);
                    });

                await getCharacterSpeciesDetails(character.species)
                await getCharacterSpaceshipsDetails(character.starships)
                await getCharacterVehiclesDetails(character.vehicles)
                await getHomeworldName(character.homeworld)
                await getchacterMoviesDetails(character.films)
            }
        } catch (error) {
            console.error('Error during request for character details', error);
        }
    };

    const getCharacterSpeciesDetails = async (speciesUrls) => {
        try {
            const speciesPromises = speciesUrls.map(url => axios.get(url));
            const responses = await Promise.all(speciesPromises);
            const speciesData = responses.map(response => response.data);
            setCharacterSpeciesDetails(speciesData);
            } catch (error) {
                console.error("plop", error)
            };
        };

    const getHomeworldName = async (homeworldUrl) => {
        try {
            const response = await axios.get(homeworldUrl);
            setHomeworldName(response.data.name);
        } catch (error) {
            console.error("Error fetching homeworld:", error);
        }
    };

    const getchacterMoviesDetails = async (moviesUrls) => {
        try {
            const moviesPromises = moviesUrls.map(url => axios.get(url))
            const responses = await Promise.all(moviesPromises);
            const moviesData = responses.map(response => response.data);
            setcharacterMoviesDetails(moviesData);
        } catch (error) {
            console.error("Error during the request:", error);
        }
    }

    const getCharacterSpaceshipsDetails = async (spaceshipsUrls) => {
        try {
            const spaceshipsPromises = spaceshipsUrls.map(url => axios.get(url));
            const responses = await Promise.all(spaceshipsPromises);
            const spaceshipsData = responses.map(response => response.data);
            setCharacterSpaceshipsDetails(spaceshipsData);
        } catch (error) {
            console.error("plop", error);
        }
    };

    const getCharacterVehiclesDetails = async (vehiclesUrls) => {
        try {
            const vehiclesPromises = vehiclesUrls.map(url => axios.get(url));
            const responses = await Promise.all(vehiclesPromises);
            const vehiclesData = responses.map(response => response.data);
            setCharacterVehiclesDetails(vehiclesData);
        } catch (error) {
            console.error ("Error during the request", error)
        }
    }

    return (
        <div className="character-box">
        <div className="character-details-container">
            <div className="character-card-details gradient-border">
                    <div className="character-image">
                     <img src={characterImage} alt={CharacterDetails.name} />
                    </div>
                    <div className="character-info">
                     <p><strong>Eye color:</strong> {CharacterDetails.eye_color}</p>
                     <p><strong>Homeworld:</strong> {homeworldName}</p>
                     <p><strong>Hair color:</strong> {CharacterDetails.hair_color}</p>
                     <p><strong>Skin color:</strong> {CharacterDetails.skin_color}</p>
                     <p><strong>Height:</strong> {CharacterDetails.height}</p>
                     <p><strong>Mass:</strong> {CharacterDetails.mass}</p>
                     <Link to="/">Revenir à la liste des personnages</Link>
                     </div>
                    </div>
                 </div>
                     <div className="character-special-cards">
                        <div className="character-special-card">
                            <SpaceshipsDetails spaceshipsDetails={CharacterSpaceshipsDetails} />
                        </div>

                        <div className="character-special-card">   
                        <ul>
        {characterMoviesDetails.map((film, index) => (
            <li key={index}>{film.title} - {film.release_date}</li>
        ))}
    </ul>
                        </div>

                        <div className="character-special-card">
                            <VehiclesDetails vehiclesDetails={CharacterVehiclesDetails} />
                        </div>
                   
                    </div>
                    </div>
    );
}

export default CharacterDetails;