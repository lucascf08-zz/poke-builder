import React, { useEffect, useState } from "react";
import { pokemon } from "./types";
//material-ui
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/core/Autocomplete";

import * as pokeApi from "./store/api/pokeApi";

import { StyledApp, StyledPokeContainer } from "./App.styles";
import { Button, Fade, Grow, LinearProgress } from "@material-ui/core";

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

  useEffect(() => {
    selecionado && getPokemonFunc(selecionado);
    !selecionado && setPoke(undefined);
  }, [selecionado]);

  const getPokemonFunc = async (name: string) => {
    try {
      const res: pokemon = await getPokemon(name).unwrap();
      setPoke(res);
    } catch (err) {
      alert("erro!");
    }
  };
  const addToTeam = (poke: pokemon | undefined) => {
    poke && pokeTeam.length < 6 && setPokeTeam([...pokeTeam, poke]);
  };

  const removeFromTeam = (index: number) => {
    setPokeTeam(pokeTeam.filter((p, i) => i !== index));
  };

  return (
    <StyledApp>
      <div className="header">
        <h1>Poke-Builder</h1>
      </div>
      <Fade in={poke != undefined && !isLoading}>
        <div className="poke-selecao">
          <div className="barra">
            <p>{poke ? poke.name : ""}</p> //
            <p>{poke ? poke.types[0].type.name : ""}</p>
          </div>
          <div className="img-container">
            <img src={poke ? poke.sprites.front_default : ""} />
          </div>
        </div>
      </Fade>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={allPokeList}
        getOptionLabel={(option) => option.name}
        sx={{ width: "50vw" }}
        inputValue={selecionado}
        onInputChange={(event, newSelecionado) => {
          setSelecionado(newSelecionado);
        }}
        selectOnFocus
        clearOnBlur
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
        sx={{ width: "50vw" }}
      >
        Adicionar
      </Button>
      <div className="barra" />
      <div className="team-container">
        {pokeTeam.map((pokemon, i) => (
          <StyledPokeContainer type={pokemon.types[0].type.name}>
            <img src={pokemon.sprites.front_default} />
            <p>
              {pokemon.name}//{pokemon.types[0].type.name}
            </p>

            <Button
              onClick={() => removeFromTeam(i)}
              variant="contained"
              color="secondary"
            >
              REMOVER
            </Button>
          </StyledPokeContainer>
        ))}
      </div>
    </StyledApp>
  );
};

export default App;
