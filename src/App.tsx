import { StyledApp, StyledPokeContainer } from "./App.styles";
import React, { useEffect, useState } from "react";
//types
import { pokemon } from "./types";
//material-ui
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/core/Autocomplete";
import { Button, Fade, Grow, LinearProgress } from "@material-ui/core";
//api
import * as pokeApi from "./store/api/pokeApi";

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
      getAllPokemon.data.results.forEach((datum, index) => {
        setAllPokeList((allPokeList) => [
          ...allPokeList,
          { name: datum.name, key: index },
        ]);
      });
  }, [getAllPokemon.data]);

  useEffect(() => {
    allPokeList.some((e) => e.name === selecionado) &&
      getPokemonFunc(selecionado);
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
      <header>
        <h1>Poke-Builder</h1>
      </header>
      <main>
        <div className="select-container">
          <p>{poke ? poke.name : ""}</p> //
          <p>{poke ? poke.types[0].type.name : ""}</p>
          <img alt={`sprite`} src={poke ? poke.sprites.front_default : ""} />
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
        </div>
      </main>
      <aside />

      <footer>
        {pokeTeam.map((pokemon, i) => (
          <StyledPokeContainer type={pokemon.types[0].type.name}>
            <img
              src={pokemon.sprites.front_default}
              alt={`${pokemon.name} sprite`}
            />
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
      </footer>
    </StyledApp>
  );
};

export default App;
