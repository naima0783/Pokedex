import PokemonType from "../models/pokemonType";

const typeLabel = (id: number, types: PokemonType[] | undefined): string => {
  const pokemonType: PokemonType | undefined = types?.find(
    (type) => type.id === id
  );

  if (pokemonType !== undefined) {
    return pokemonType.label;
  }

  return "inconnu";
};

export default typeLabel;
