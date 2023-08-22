import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpaceship from "./LoadingSpaceship";
import "../styles/components/characters-list.css";
import "../styles/fonts.css";

const CharactersList = () => {
    const [characters, setCharacters] = useState([]);
    const [nextPage, setNextPage] = useState([null]);
    const [startIndex, setStartIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [showLoadMore, setShowLoadMore] = useState(false);

    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = async () => {
        try {
            const response = await axios.get('https://swapi.dev/api/people/');
            const firstsCharacters = response.data.results.slice(0, 5);
            console.log('API Response:', response.data)
            setCharacters(firstsCharacters);
            setNextPage(response.data.next);
            setStartIndex(5);
            setIsLoading(false);
            setShowLoadMore(true);
        } catch(error) {
            console.error('Error during the request:', error);
        }
    };

    const moreCharacters = async () => {
        try {
            if (nextPage) {
                const response = await axios.get(nextPage);
                const newCharacters = response.data.results;
                setCharacters(previousCharacters => [...previousCharacters, ...newCharacters]);
                setNextPage(response.data.next);
                setStartIndex(startIndex + newCharacters.length);
            }
        } catch (error) {
            console.error('Error during the request', error);
        }
    };

    return (
        <div className="characters-list-container">
            <h1> Star Wars - Characters list</h1>
            <div className={`card-list ${isLoading ? "loading" : ""}`}>
            {isLoading ? ( <LoadingSpaceship />
             ) : (
             <>
                {characters.map((character, index) => (
                    <div className="character-card" key={index}> 
                        <h2 className="character-name">{character.name}</h2>
                        <p><strong> Année de naissance:</strong> {character.birth_year}</p>
                        <p><strong> Genre:</strong> {character.gender}</p>
                        <Link to={`/character/${character.name.replace(/\s+/g, '-').toLowerCase()}`}>Plus d'informations</Link>
                    </div>
                ))}
            {showLoadMore && (
              <button className={`load-more-btn ${isLoading ? "loading" : ""}`} onClick={moreCharacters}>
                Load more
              </button>
            )}
          </>
        )}
      </div>
    </div>
    );
};

export default CharactersList;