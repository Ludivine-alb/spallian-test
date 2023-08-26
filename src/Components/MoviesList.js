import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "../styles/components/movies-list.css"
import LoadingSpaceship from "./LoadingSpaceship";

const MoviesList = () => {
    const [movies, setMovies] = useState ([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getMovies();
    }, []);

const getMovies = async () => {
    try {
        const response = await axios.get('https://swapi.dev/api/films/');
        const movies = response.data.results
        setMovies(movies);
        setIsLoading(false)
        console.log('API Response:', movies)
    } catch(error) {
        console.error('Error during the request:', error);
    }
};

return (
    <div className="movies-list-container">
        <h1 className="list-title">Movies</h1>
        <div className={`movies-grid ${isLoading ? "loading-container" : ""}`}>
      {isLoading ? (
        <div className="loading-wrapper">
          <LoadingSpaceship />
        </div>
      ) : (
        <>
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </>
      )}
    </div>
  </div>
);
};


export default MoviesList;

