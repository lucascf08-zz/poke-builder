import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pokemon } from "../../types";
interface result {
  count: number;
  results: pokemon[];
}
// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.mutation<pokemon, string>({
      query: (name) => ({ url: `pokemon/${name}`, method: "GET" }),
    }),
    getAllPokemon: builder.query<result, string>({
      query: () => ({ url: `pokemon?limit=898`, method: "GET" }),
    }),
  }),
});

export const { useGetPokemonByNameMutation, useGetAllPokemonQuery } =
  pokemonApi;
