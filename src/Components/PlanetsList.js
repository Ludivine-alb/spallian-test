import React, {  useState, useEffect } from "react";
import axios from "axios";
import PlanetCard from "./PlanetCard";
import "../styles/components/planet-list.css"
import LoadingSpaceship from "./LoadingSpaceship";

const PlanetList = () => {
    const [planets, setPlanets] = useState ([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getPlanets();
    }, []);

const getPlanets = async () => {
    try {
        const response = await axios.get('https://swapi.dev/api/planets/');
        const planetsWithId = response.data.results.map(planet => ({
            ...planet,
            id: planet.url.split("/").filter(Boolean).pop() || ""
        }));
        setPlanets(planetsWithId);
        setIsLoading(false);
    } catch (error) {
        console.error('Error during the request:', error);
    }
};

return (
    <div className="planets-list-container">
        <h1 className="list-title">Planets</h1>
        <div className={`planets-grid ${isLoading ? "loading-container" : ""}`}>
        {isLoading ? (
        <div className="loading-wrapper">
          <LoadingSpaceship />
        </div>
      ) : (
        <>
          {planets.map((planet, index) => (
            <PlanetCard key={index} planet={planet} planetId={planet.id}/>
          ))}
        </>
      )}
    </div>
  </div>
);
};

export default PlanetList;
