import {
  StyledApp,
  StyledPokeContainer,
  StyledPokeSelector,
  TypeColorWrapper,
} from "./App.styles";
import React, { useEffect, useState } from "react";
//types
import { pokemon } from "./types";
//material-ui
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/core/Autocomplete";
import {
  Alert,
  Button,
  CircularProgress,
  Collapse,
  Fade,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
//api
import * as pokeApi from "./store/api/pokeApi";
//assets
import { ReactComponent as TrashIcon } from "./assets/TrashIcon.svg";
import { ReactComponent as PokeballIcon } from "./assets/PokeballIcon.svg";

const App = () => {
  const [getPokemon] = pokeApi.useGetPokemonByNameMutation();
  const [selecionado, setSelecionado] = useState("");

  const [poke, setPoke] = useState<pokemon>();
  const [checkedPoke, setCheckedPoke] = useState<pokemon>();

  const [pokeTeam, setPokeTeam] = useState<pokemon[]>([]);

  const getAllPokemon = pokeApi.useGetAllPokemonQuery("");
  const [allPokeList, setAllPokeList] = useState<
    { name: string; key: number }[]
  >([]);

  const [isLoading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

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
    openAlert && setOpenAlert(false);
  }, [selecionado]);

  const getPokemonFunc = async (name: string) => {
    setLoading(true);
    try {
      const res: pokemon = await getPokemon(name).unwrap();
      setPoke(res);
      setLoading(false);
    } catch (err) {
      alert("erro!");
      setLoading(false);
    }
  };
  const addToTeam = (poke: pokemon | undefined) => {
    poke && pokeTeam.length < 6
      ? setPokeTeam([...pokeTeam, poke])
      : setOpenAlert(true);
  };

  const removeFromTeam = (index: number) => {
    setPokeTeam(pokeTeam.filter((p, i) => i !== index));
  };

  return (
    <StyledApp open={drawerOpen}>
      <header>
        <h1>Poke-Builder</h1>
        <h4>by Lucas C. Ferreira. Powered by pokeapi.co/</h4>
      </header>

      <aside className="poke-checker">
        {poke && (
          <>
            <div className="main-infos">
              <span>
                <b>ID:</b>
                {poke?.id}
              </span>
              <span>
                <b>ABILITY:</b>
                {poke?.abilities[0].ability.name}
              </span>
              <span>
                <b>TYPES:</b>
                {poke?.types.map((type, i) => (
                  <TypeColorWrapper key={i} type={type.type.name}>
                    {type.type.name}
                  </TypeColorWrapper>
                ))}
              </span>
            </div>

            <b>STATS:</b>
            <Table>
              <TableBody>
                {poke?.stats.map((stat, i) => (
                  <>
                    <TableRow>
                      <TableCell>
                        <b>{stat.base_stat}</b>
                      </TableCell>

                      <TableCell>{stat.stat.name}</TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </aside>

      <main>
        <StyledPokeSelector type={poke?.types[0].type.name}>
          {isLoading ? (
            <div className="loader">
              <CircularProgress color="secondary" size="8rem" />
            </div>
          ) : (
            poke && (
              <div className="inner-div">
                <img
                  alt={`sprite`}
                  src={poke ? poke.sprites.front_default : ""}
                />

                <div className="info-bar">
                  {poke.name.toUpperCase()}
                  <br />
                  Type: {poke.types[0].type.name.toUpperCase()}
                </div>
              </div>
            )
          )}
        </StyledPokeSelector>

        <Autocomplete
          disablePortal
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
          <PokeballIcon className="pokeball-icon" />
        </Button>
        <Collapse in={openAlert}>
          <Alert severity="error">Só pode selecionar até 6 Pokémons!</Alert>
        </Collapse>
      </main>

      <aside className="team-container">
        {pokeTeam.map((pokemon, i) => (
          <StyledPokeContainer type={pokemon.types[0].type.name}>
            <TrashIcon
              className="trash-icon"
              onClick={() => removeFromTeam(i)}
            />
            <img
              src={pokemon.sprites.front_default}
              alt={`${pokemon.name} sprite`}
              onClick={() => setPoke(pokemon)}
            />
            <div className="info-bar">
              <p>
                {pokemon.name}//{pokemon.types[0].type.name}
              </p>
            </div>
          </StyledPokeContainer>
        ))}
      </aside>
    </StyledApp>
  );
};

export default App;
