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
  const [pokeTeam, setPokeTeam] = useState<pokemon[]>([]);

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
  const addToTeam = (poke: pokemon | undefined) => {
    poke && pokeTeam.length < 6 && setPokeTeam([...pokeTeam, poke]);
  };

  const removeFromTeam = (index: number) => {
    setPokeTeam(pokeTeam.filter((p, i) => i !== index));
  };

  return (
    <StyledApp>
      {isLoading && <LinearProgress color="secondary" />}
      <div className="div-central">
        <h1>Poke-Builder</h1>
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
        <Button
          variant="contained"
          color="secondary"
          onClick={() => addToTeam(poke)}
        >
          Adicionar
        </Button>
        <div className="barra" />
        <div className="team-container">
          {pokeTeam.map((pokemon, i) => (
            <div className="poke-container">
              <img src={pokemon.sprites.front_default} />
              <p>{pokemon.name}</p>
              <Button
                onClick={() => removeFromTeam(i)}
                variant="contained"
                color="secondary"
              >
                REMOVER
              </Button>
            </div>
          ))}
        </div>
      </div>
    </StyledApp>
  );
};

export default App;
