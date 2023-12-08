import React from "react"
import { useEffect, useState } from "react";
import Pokemon from "../../models/pokemon";
import PageTitle from "../../components/pageTitle";
import PokemonSearch from "../../components/pokemonSearch";
import PokemonList from "../../components/pokemonList";
import PokemonService from "../../services/pokemonService";

const Pokedex = () => {
  const [searchText, setSearchText] = useState<string>();

  const [pokeList, setPokeList] = useState<Pokemon[]>();

  useEffect(() => {
    PokemonService.getAll().then((pokemons) => setPokeList(pokemons));
  }, []);

  useEffect(() => {
    if (searchText !== undefined)
      PokemonService.getStartWith(searchText).then((pokemons) =>
        setPokeList(pokemons)
      );
  }, [searchText]);

  return (
    <>
      <PageTitle title="Pokedex" />
      <PokemonSearch searchUpdate={setSearchText} />
      <PokemonList pokemons={pokeList} />
    </>
  );
};

export default Pokedex;
