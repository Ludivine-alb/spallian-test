import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/components/movie-details.css"

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [movieImage, setMovieImage] = useState('');

    useEffect(() => {
        getMovieDetails();
    }, []);

    const getMovieDetails = async () => {
        try {
            const response = await axios.get(`https://swapi.dev/api/films/${movieId}/`);
            if (response.data) {
                const movie = response.data;
                setMovieDetails(movie);

                const movieImageURL = `https://starwars-visualguide.com/assets/img/films/${movie.episode_id}.jpg`;
                setMovieImage(movieImageURL);
            }
        } catch (error) {
            console.error('Error during request for movie details', error);
        }
    };

    return (
        <div className="movie-details-container">
          <div className="movie-card-details gradient-border">
            <div className="movie-content">
              <div className="movie-image">
                <img src={movieImage} alt={movieDetails?.title} />
              </div>
              <div className="movie-info">
                <h2>{movieDetails?.title}</h2>
                <p><strong>Opening Crawl: </strong>{movieDetails?.opening_crawl}</p>
                <p><strong>Director: </strong> {movieDetails?.director}</p>
                <p><strong>Producer: </strong> {movieDetails?.producer}</p>
                <p><strong>Release Date: </strong> {movieDetails?.release_date}</p>
              <Link to="/movies">Back to Movies List</Link>
              </div>
            </div>
            <div className="back-link">
            </div>
          </div>
        </div>
      );
    };

export default MovieDetails;