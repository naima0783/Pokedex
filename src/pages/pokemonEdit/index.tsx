import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import Pokemon from "../../models/pokemon";
import PokemonService from "../../services/pokemonService";
import PageTitle from "../../components/pageTitle";
import {
  Box,
  Chip,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  InputLabel,
} from "@mui/material";
import { CancelOutlined, SaveOutlined } from "@mui/icons-material";

import { useFormik } from "formik";
import * as yup from "yup";
import PokemonTypeService from "../../services/typeService";
import PokemonType from "../../models/pokemonType";
import { useEffect, useState } from "react";

const PokemonEdit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [types, setTypes] = useState<PokemonType[]>();

  useEffect(() => {
    PokemonTypeService.getTypes().then((typesList) => setTypes(typesList));
  }, []);

  const [pokemon, setPokemon] = useState<Pokemon | undefined>();

  useEffect(() => {
    PokemonService.getOne(params.id).then((pokemon) => setPokemon(pokemon));
  }, [params.id]);

  const validationSchema = yup.object().shape({
    id: yup
      .number()
      .required("obligatoire")
      .min(1, "au minimum 1")
      .max(1000, "au maximum 1000"),
    name: yup
      .string()
      .required("obligatoire")
      .test("2len", "au moins 2 caractères", (val: string) => val.length >= 2),
    hp: yup
      .number()
      .required("obligatoire")
      .min(0, "au minimum 0")
      .max(4000, "au maximum 4000"),
    cp: yup
      .number()
      .required("obligatoire")
      .min(0, "au minimum 0")
      .max(4000, "au maximum 4000"),
    types: yup
      .array()
      .test(
        "123",
        "entre 1 et 3",
        (val) => val !== undefined && val.length >= 1 && val.length <= 3
      ),
  });

  const formik = useFormik({
    initialValues: {
      id: pokemon ? pokemon.id : undefined,
      name: pokemon ? pokemon.name : "",
      hp: pokemon ? pokemon.hp : 0,
      cp: pokemon ? pokemon.cp : 0,
      types: pokemon ? pokemon.types : [],
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.id !== undefined) {
        const newPokemon: Pokemon = new Pokemon(
          values.id,
          values.hp,
          values.cp,
          values.name,
          "",
          values.types
        );

        PokemonService.save(newPokemon).then((ok) => {
          if (ok) {
            navigate("/pokemon/" + values.id);
          }
        });
      }
    },
  });

  const backToPokedex = () => {
    if (formik.values.id) {
      navigate("/pokemon/" + formik.values.id);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <PageTitle title={"Pokemon #" + params.id} />
      <article>
        {pokemon ? (
          <>
            <Box className="flexBox">
              <img
                src={pokemon.picture}
                alt={pokemon.name}
                style={{ width: "40em", margin: "0 5em" }}
              />

              <form onSubmit={formik.handleSubmit}>
                <Box>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    label="id"
                    name="id"
                    value={formik.values.id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.id && Boolean(formik.errors.id)}
                    helperText={formik.touched.id && formik.errors.id}
                    disabled={pokemon !== undefined}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="nom"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    label="points de vie"
                    name="hp"
                    value={formik.values.hp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.hp && Boolean(formik.errors.hp)}
                    helperText={formik.touched.hp && formik.errors.hp}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    label="dégâts"
                    name="cp"
                    value={formik.values.cp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.cp && Boolean(formik.errors.cp)}
                    helperText={formik.touched.cp && formik.errors.cp}
                  />
                </Box>
                <Box display="flex" flexWrap={"wrap"}>
                  <Box>
                    <InputLabel>types :</InputLabel>
                    <InputLabel
                      error={
                        formik.touched.types && Boolean(formik.errors.types)
                      }
                    >
                      {formik.touched.types && formik.errors.types}
                    </InputLabel>

                    <Box display="flex" flexWrap={"wrap"} marginLeft={"5em"}>
                      {types?.map((type: PokemonType) => (
                        <Box className="type">
                          <FormControlLabel
                            key={type.id}
                            control={
                              <Checkbox
                                checked={formik.values.types.includes(type.id)}
                                name="types"
                                onClick={formik.handleBlur}
                                onBlur={formik.handleBlur}
                                onChange={(e) => {
                                  const idx = formik.values.types.indexOf(
                                    type.id
                                  );
                                  if (idx !== -1) {
                                    formik.values.types.splice(idx, 1);
                                  } else {
                                    formik.values.types.push(type.id);
                                  }
                                }}
                              />
                            }
                            label={
                              <Chip
                                key={type.label}
                                style={{
                                  backgroundColor: "#" + type.color,
                                  color: "white",
                                }}
                                label={type.label}
                                className="chip"
                                clickable
                              />
                            }
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
                <Box display={"flex"} justifyContent={"right"}>
                  <Chip
                    icon={<CancelOutlined />}
                    label="Annuler"
                    onClick={backToPokedex}
                    color="secondary"
                    variant="outlined"
                    sx={{ marginRight: "10px" }}
                  />
                  <Button
                    type="submit"
                    style={{
                      padding: "0",
                    }}
                  >
                    <Chip
                      icon={<SaveOutlined />}
                      label="Enregistrer"
                      color="secondary"
                      variant="outlined"
                      sx={{
                        marginRight: "10px",
                        fontWeight: "400",
                        letterSpacing: "normal",
                        textTransform: "none",
                        lineHeight: "1.5",
                      }}
                    />
                  </Button>
                </Box>
              </form>
            </Box>
          </>
        ) : (
          <h2 className="header center">Pokémon inconnu</h2>
        )}
      </article>
    </>
  );
};

export default PokemonEdit;
