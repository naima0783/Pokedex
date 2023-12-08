import { useState } from "react";
import Pokemon from "../../models/pokemon";
import typeColor from "../../helpers/typeColor";
import typeLabel from "../../helpers/typeLabel";

import "./style.css";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import PokemonType from "../../models/pokemonType";

interface Props {
  pokemon: Pokemon;
  borderColor?: string;
  types: PokemonType[] | undefined;
}

const PokemonCard = ({ pokemon, borderColor = "#009688", types }: Props) => {
  const defaultColor: string = "transparent";
  const [color, setColor] = useState<string>(defaultColor);

  const navigate = useNavigate();

  const showBorder = () => {
    setColor(borderColor);
  };

  const hideBorder = () => {
    setColor(defaultColor);
  };

  const goTo = () => {
    navigate("/pokemon/" + pokemon.id);
  };

  return (
    <article
      className="card horizontal"
      style={{ borderColor: color }}
      onMouseOver={showBorder}
      onMouseOut={hideBorder}
      onClick={goTo}
    >
      <div className="card-image">
        <img src={pokemon.picture} alt={pokemon.name} />
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <h3>{pokemon.name}</h3>
          {pokemon.types.map((type) => (
            <Chip
              key={type}
              style={{
                backgroundColor: typeColor(type, types),
                color: "white",
              }}
              label={typeLabel(type, types)}
              className="chip"
            />
          ))}
        </div>
      </div>
    </article>
  );
};

export default PokemonCard;
