import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonList from "./Components/pokedex/pokedex";
import Pokemon from "./Components/pokemon/pokemon";
import LandingPage from "./Components/Landing/landing";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/pokemon" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<Pokemon />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
