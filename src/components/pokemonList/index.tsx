import { useEffect, useState } from "react";
import Pokemon from "../../models/pokemon";
import PokemonCard from "../pokemonCard";

import "./style.css";
import PokemonType from "../../models/pokemonType";
import PokemonTypeService from "../../services/typeService";

interface Props {
  pokemons: Pokemon[] | undefined;
}

const PokemonList = ({ pokemons }: Props) => {
  const pokemonNbr: number = pokemons !== undefined ? pokemons.length : 0;

  let title: string = "Aucun pokemon";

  const [types, setTypes] = useState<PokemonType[]>();

  useEffect(() => {
    PokemonTypeService.getTypes().then((typesList) => setTypes(typesList));
  });

  if (pokemonNbr > 0) {
    title = pokemonNbr === 1 ? "1 pokemon" : pokemonNbr + " pokemons";
  }

  return (
    <>
      <h2>{title}</h2>
      <section className="flexbox">
        {pokemons?.map((pokemon: Pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            borderColor="darkmagenta"
            types={types}
          />
        ))}
      </section>
    </>
  );
};

export default PokemonList;
