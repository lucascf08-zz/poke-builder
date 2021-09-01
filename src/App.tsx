import React, { useEffect, useState } from "react";
import { pokemon } from "./types";
//material-ui
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/core/Autocomplete";

import * as pokeApi from "./store/api/pokeApi";

import { StyledApp } from "./App.styles";
import { Button, LinearProgress } from "@material-ui/core";

const App = () => {
  const [getPokemon, { error, isLoading }] =
    pokeApi.useGetPokemonByNameMutation();
  const [selecionado, setSelecionado] = useState("");
  const [poke, setPoke] = useState<pokemon>();

  const getAllPokemon = pokeApi.useGetAllPokemonQuery("");
  const [allPokeList, setAllPokeList] = useState<
    { name: string; key: number }[]
  >([]);

  useEffect(() => {
    !getAllPokemon.isLoading &&
      getAllPokemon.data &&
      getAllPokemon.data.results.map((datum, index) => {
        allPokeList.push({ name: datum.name, key: index });
      });
  }, [getAllPokemon.data]);

  const getPokemonFunc = async (name: string) => {
    const res: pokemon = await getPokemon(name).unwrap();

    if ((name = "")) {
      setPoke(await getPokemon("pikachu").unwrap());
    }

    if (error) {
      alert("Erro!");
      return;
    }
    setPoke(res);
  };

  return (
    <StyledApp>
      {isLoading && <LinearProgress color="secondary" />}

      <div className="div-central">
        <div className="barra">
          <p>{poke?.name}</p>
        </div>
        <div>
          <img src={poke?.sprites.front_default || ""} />
        </div>

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
        <Button variant="contained" color="secondary">
          Adicionar
        </Button>
      </div>
    </StyledApp>
  );
};

export default App;
