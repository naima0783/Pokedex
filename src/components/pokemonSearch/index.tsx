import { InputAdornment, TextField } from "@mui/material";
import "./style.css";
import { SearchOutlined } from "@mui/icons-material";
import { ChangeEvent } from "react";

interface Props {
  searchUpdate: Function;
}

const PokemonSearch = ({ searchUpdate }: Props) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    searchUpdate(event.target.value);
  }

  return (
    <div className="search">
      <TextField
        placeholder="Search"
        type="search"
        fullWidth
        variant="outlined"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default PokemonSearch;
