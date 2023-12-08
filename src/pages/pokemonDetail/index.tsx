import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../components/pageTitle";
import Pokemon from "../../models/pokemon";
import PokemonService from "../../services/pokemonService";
import typeLabel from "../../helpers/typeLabel";
import typeColor from "../../helpers/typeColor";
import { Box, Chip } from "@mui/material";
import {
  ArrowBackOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";

import "./style.css";
import PokemonTypeService from "../../services/typeService";
import { useEffect, useState } from "react";
import PokemonType from "../../models/pokemonType";

const PokemonDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState<Pokemon | undefined>();

  const [types, setTypes] = useState<PokemonType[]>();

  useEffect(() => {
    PokemonTypeService.getTypes().then((typesList) => setTypes(typesList));
  }, []);

  useEffect(() => {
    PokemonService.getOne(params.id).then((pokemon) => setPokemon(pokemon));
  }, [params.id]);

  const backToPokedex = () => {
    navigate("/");
  };

  const editMe = () => {
    navigate("/pokemon/edit/" + pokemon?.id);
  };

  const deleteMe = () => {
    PokemonService.delete(params.id).then(() => backToPokedex());
  };

  return (
    <>
      <PageTitle title={"Pokemon #" + params.id} />
      <article>
        {pokemon ? (
          <>
            <h2 className="header center">{pokemon.name}</h2>
            <Box className="flexBox">
              <img
                src={pokemon.picture}
                alt={pokemon.name}
                style={{ width: "20em", margin: "0 5em" }}
              />

              <table className="striped">
                <tbody>
                  <tr>
                    <td width="40%">Numéro</td>
                    <td>
                      <strong>{pokemon.id}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Nom</td>
                    <td>
                      <strong>{pokemon.name}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Points de vie</td>
                    <td>
                      <strong>{pokemon.hp}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Dégâts</td>
                    <td>
                      <strong>{pokemon.cp}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Types</td>
                    <td>
                      {pokemon.types.map((type: number) => (
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </>
        ) : (
          <h2 className="header center">Pokémon inconnu</h2>
        )}
        <Box display={"flex"} justifyContent={"space-between"}>
          <Chip
            icon={<ArrowBackOutlined />}
            label="Retour"
            onClick={backToPokedex}
            color="secondary"
            variant="outlined"
          />
          <Box>
            <Chip
              icon={<EditOutlined />}
              label="Editer"
              onClick={editMe}
              color="secondary"
              variant="outlined"
              sx={{ marginRight: "10px" }}
            />
            <Chip
              icon={<DeleteOutlined />}
              label="Supprimer"
              onClick={deleteMe}
              color="secondary"
              variant="outlined"
            />
          </Box>
        </Box>
      </article>
    </>
  );
};

export default PokemonDetail;
