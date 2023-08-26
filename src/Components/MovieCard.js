import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/movie-card.css";

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-container">
        <div className="movie-card">
            <h2 className="movie-title">{movie.title}</h2>
            <p>Episode {movie.episode_id}</p>
            <p>Release Date: {movie.release_date}</p>
            <Link className="link-btn" to={`/movies/${movie.episode_id}`}>View Details</Link>
        </div>
        </div>
    );
};

export default MovieCard;