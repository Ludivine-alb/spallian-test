import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetAllCharacters from "./Components/GetAllCharacters";
import CharacterDetails from "./Components/CharacterDetails";
import SpaceshipsDetails from "./Components/SpaceshipsDetails";
import SpeciesDetails from "./Components/SpeciesDetails";

const App = () => {
  return (
      <Routes>
        <Route exact path="/" Component={GetAllCharacters} />
        <Route path="/character/:characterName" Component={CharacterDetails}/>
      </Routes>
  );
};

export default App;