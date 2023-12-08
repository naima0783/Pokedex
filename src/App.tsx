import { Routes, Route, BrowserRouter } from "react-router-dom";
import Pokedex from "./pages/pokedex";
import PokemonDetail from "./pages/pokemonDetail";
import Login from "./pages/login";
import AuthenticationService from "./services/authenticationService";
import { useState } from "react";
import PokemonEdit from "./pages/pokemonEdit";

import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    AuthenticationService.isAuthenticated
  );

  return isAuthenticated ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/pokemon/edit/:id" element={<PokemonEdit />} />
      </Routes>
    </BrowserRouter>
  ) : (
    <Login setIsAuthenticated={setIsAuthenticated} />
  );
};

export default App;
