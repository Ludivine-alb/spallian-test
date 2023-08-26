import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpaceship from "./LoadingSpaceship";
import CharacterCard from "./CharacterCard";
import "../styles/components/characters-list.css";

const CharactersList = () => {
    const [characters, setCharacters] = useState([]);
    const [nextPage, setNextPage] = useState([null]);
    const [startIndex, setStartIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [showLoadMore, setShowLoadMore] = useState(false);

    useEffect(() => {
        getCharacters();
    }, []);

    const getCharacters = async () => {
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
          {isLoading ? null : <h1> Star Wars - Characters list</h1>}
          <div className={`card ${isLoading ? "loading-container" : ""}`}>
            {isLoading ? (
                <div className="loading-wrapper">
                    <LoadingSpaceship />
                </div>
                ) : (
              <>
                <div className="k-card">
                    {characters.map((character, index) => (
                    <CharacterCard key={index} character={character} />
                    ))}
                </div>
              </>
             )}
          </div>
            
            <div className="btn-a-centrer">
                {showLoadMore && (
                  <button
                  className={`load-more-btn ${isLoading ? "loading-container" : ""}`}
                  onClick={moreCharacters}
                >
                  Load more
                </button>
                )}
          </div>
        </div>
      );      
};

export default CharactersList;