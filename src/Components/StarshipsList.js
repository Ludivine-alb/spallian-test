import React, { useState, useEffect } from "react";
import axios from "axios";
import StarshipCard from "./StarshipCard";
import "../styles/components/starships-list.css"
import LoadingSpaceship from "./LoadingSpaceship";

const StarshipsList = () => {
    const [starships, setStarships] = useState ([]);
    const [isLoading, setIsLoading] = useState (true);
    

    useEffect(() => {
        getStarships();
    }, []);

const getStarships = async () => {
    try {
        const response = await axios.get('https://swapi.dev/api/starships/');
        const starshipsWithId = response.data.results.map(starship => ({
            ...starship,
            id: starship.url.split("/").filter(Boolean).pop() || ""
        }));
        setStarships(starshipsWithId);
        setIsLoading(false);
    } catch (error) {
        console.error('Error during the request:', error);
    }
};

return (
    <div className="starships-list-container">
        <h1 className="list-title">Starships</h1>
        <div className={`starships-grid ${isLoading ? "loading-container" : ""}`}>
      {isLoading ? (
        <div className="loading-wrapper">
          <LoadingSpaceship />
        </div>
      ) : (
        <>
          {starships.map((starship, index) => (
            <StarshipCard key={index} starship={starship} starshipId={starship.id}/>
          ))}
        </>
      )}
    </div>
  </div>
);
};

export default StarshipsList;

