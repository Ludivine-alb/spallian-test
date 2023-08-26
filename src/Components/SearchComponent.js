import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/components/searchComponent.css"

const SearchComponent = () => {
  const [searchResults, setSearchResults] = useState({
    planets: [],
    films: [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async () => {
    try {
      const planetResponse = await axios.get(
        `https://swapi.dev/api/planets/?search=${searchQuery}`
      );
      const filmResponse = await axios.get(
        `https://swapi.dev/api/films/?search=${searchQuery}`
      );

      setSearchResults({
        planets: planetResponse.data.results,
        films: filmResponse.data.results,
      });
    } catch (error) {
      console.error("Error during the request:", error);
      setSearchResults({
        planets: [],
        films: [],
      });
    }
  };

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`https://swapi.dev/api/planets/?search=${searchQuery}`)
        .then((response) => {
          setSuggestions((previousSuggestions) => ({
            ...previousSuggestions,
            planets: response.data.results,
          }));
        })
        .catch((error) => {
          console.error("Error fetching planet suggestions:", error);
          setSuggestions((previousSuggestions) => ({
            ...previousSuggestions,
            planets: [],
          }));
        });
  
      axios
        .get(`https://swapi.dev/api/films/?search=${searchQuery}`)
        .then((response) => {
          setSuggestions((previousSuggestions) => ({
            ...previousSuggestions,
            films: response.data.results,
          }));
        })
        .catch((error) => {
          console.error("Error fetching film suggestions:", error);
          setSuggestions((previousSuggestions) => ({
            ...previousSuggestions,
            films: [],
          }));
        });
    } else {
      setSuggestions({
        planets: [],
        films: [],
      });
    }
  }, [searchQuery]);

  return (
    <div className="search-component">
      <input
        type="text"
        placeholder="Search planets or movies"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
  
      <div className="suggestions">
        {suggestions.planets && suggestions.planets.length > 0 && (
          <div className="suggestions-overlay">
            <h2 className="planet-title">Planets</h2>
            <ul>
              {suggestions.planets.map((suggestion) => (
                <li className="suggestion-list" key={suggestion.name}>
                  {suggestion.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {suggestions.films && suggestions.films.length > 0 && (
          <div className="suggestions-overlay">
            <h2 className="movies-title">Movies</h2>
            <ul>
              {suggestions.films.map((suggestion) => (
                <li className="suggestion-list" key={suggestion.title}>{suggestion.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}  
export default SearchComponent;