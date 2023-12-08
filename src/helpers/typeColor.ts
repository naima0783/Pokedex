import PokemonType from "../models/pokemonType";

const typeColor = (id: number, types: PokemonType[] | undefined): string => {
  const pokemonType: PokemonType | undefined = types?.find(
    (type) => type.id === id
  );

  if (pokemonType !== undefined) {
    return "#" + pokemonType.color;
  }

  return "lightgrey";
};

export default typeColor;
