import React, {  useState, useEffect } from "react";
import axios from "axios";
import PlanetCard from "./PlanetCard";
import "../styles/components/planet-list.css"

const PlanetList = () => {
    const [planets, setPlanets] = useState ([]);

    useEffect(() => {
        getPlanets();
    }, []);

const getPlanets = async () => {
    try {
        const response = await axios.get('https://swapi.dev/api/planets/');
        const planetsWithId = response.data.results.map(planet => ({
            ...planet,
            id: planet.url.split("/").filter(Boolean).pop()
        }));
        setPlanets(planetsWithId);
    } catch (error) {
        console.error('Error during the request:', error);
    }
};

return (
    <div className="planets-list-container">
        <h1>Planets</h1>
        <div className="planets-grid">
            {planets.map((planet, index) => (
                <PlanetCard key={index} planet={planet} planetId={planet.id} />
            ))}
        </div>
    </div>
);
};

export default PlanetList;
