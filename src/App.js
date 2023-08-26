import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetAllCharacters from "./Components/GetAllCharacters";
import CharacterDetails from "./Components/CharacterDetails";
import MovieDetails from "./Components/MovieDetails";
import PlanetDetails from "./Components/PlanetDetails"
import StarshipsDetails from "./Components/StarshipsDetails"
import MoviesList from "./Components/MoviesList";
import PlanetList from "./Components/PlanetsList";
import StarshipsList from "./Components/StarshipsList";
import Navbar from "./Components/Navbar";


const App = () => {
  return (
    <div>
    <Navbar />
    <Routes>
      <Route path="/" element={<GetAllCharacters />} />
      <Route path="/character/:characterName" element={<CharacterDetails />} />
      <Route path="/movies/:movieId" element={<MovieDetails/>} />
      <Route path="/planets/:planetId" element={<PlanetDetails/>} />
      <Route path="/starships/:starshipId" element={<StarshipsDetails/> } />
      <Route path="/movies" element={<MoviesList />} />
      <Route path="/planets" element={<PlanetList />} />
      <Route path="/starships" element={<StarshipsList />} />
    </Routes>
  </div>
);
};

export default App;