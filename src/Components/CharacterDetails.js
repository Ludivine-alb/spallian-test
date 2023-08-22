import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import SpeciesDetails from "./SpeciesDetails";
import SpaceshipsDetails from "./SpaceshipsDetails";
import VehiclesDetails from "./VehiclesDetails";

const CharacterDetails = () => {
    const { characterName } = useParams();
    const [CharacterDetails, setCharacterDetails] = useState('');
    const [CharacterSpeciesDetails, setCharacterSpeciesDetails] = useState([]);
    const [CharacterSpaceshipsDetails, setCharacterSpaceshipsDetails] = useState([]);
    const [CharacterVehiclesDetails, setCharacterVehiclesDetails] = useState([])

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
                await getCharacterSpeciesDetails(character.species)
                await getCharacterSpaceshipsDetails(character.starships)
                await getCharacterVehiclesDetails(character.vehicles)
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
        <div>
            <h2>Détails du personnage {characterName}</h2>
            <p><strong>Eye color:</strong> {CharacterDetails.eye_color}</p>
            <p><strong>Hair color:</strong> {CharacterDetails.hair_color}</p>
            <p><strong>Skin color:</strong> {CharacterDetails.skin_color}</p>
            <p><strong>Height:</strong> {CharacterDetails.height}</p>
            <p><strong>Mass:</strong> {CharacterDetails.mass}</p>
            <SpeciesDetails speciesDetails={CharacterSpeciesDetails} />
            <SpaceshipsDetails spaceshipsDetails={CharacterSpaceshipsDetails} />
            <VehiclesDetails vehiclesDetails={CharacterVehiclesDetails} />
            <Link to="/">Revenir à la liste des personnages</Link>
        </div>
    );
}

export default CharacterDetails;