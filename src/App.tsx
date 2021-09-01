import React, { useEffect, useState } from "react";
import { pokemon } from "./types";
//material-ui
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/core/Autocomplete";

import {
  useGetPokemonByNameMutation,
  useGetAllPokemonQuery,
} from "./store/api/pokeApi";

import { StyledApp } from "./App.styles";

const App = () => {
  const [getPokemon] = useGetPokemonByNameMutation();
  const [selecionado, setSelecionado] = useState("");
  const [poke, setPoke] = useState<pokemon>();

  const { data, error, isLoading } = useGetAllPokemonQuery("");
  const [allPokeList, setAllPokeList] = useState<
    { name: string; key: number }[]
  >([]);

  useEffect(() => {
    !isLoading &&
      data &&
      data.results.map((datum, index) => {
        allPokeList.push({ name: datum.name, key: index });
      });
  }, [data]);

  const getPokemonFunc = async (name: string) => {
    const res: pokemon = await getPokemon(name).unwrap();

    setPoke(res);
  };

  return (
    <StyledApp>
      <div className="div-central">
        {poke && <img alt="pokemao" src={poke?.sprites.front_default || ""} />}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={allPokeList}
          getOptionLabel={(option) => option.name}
          sx={{ width: 300 }}
          inputValue={selecionado}
          onInputChange={(event, newSelecionado) => {
            setSelecionado(newSelecionado);
            getPokemonFunc(newSelecionado);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecione seu Pokémon"
              variant="standard"
              value={selecionado}
              color="secondary"
            />
          )}
        />
      </div>
    </StyledApp>
  );
};

export default App;
