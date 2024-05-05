import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const Pokemon = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const pokemonData = pokemonResponse.data;

        // Fetch details of the Pokémon species
        const speciesResponse = await axios.get(pokemonData.species.url);
        const speciesData = speciesResponse.data;

        // Get the English Pokédex description (flavor text entry)
        const englishDescription = speciesData.flavor_text_entries.find(
          entry => entry.language.name === 'en'
        ).flavor_text;

        // Construct the Pokémon object with required data
        const pokemonInfo = {
          name: pokemonData.name,
          sprite: pokemonData.sprites.front_default,
          description: englishDescription,
          id: pokemonData.id,
          weight: pokemonData.weight,
          height: pokemonData.height,
          types: pokemonData.types.map(type => type.type.name),
          // Add more details if needed
        };



        setPokemon(pokemonInfo);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);



  const handleGoBack = () => {
    navigate("/pokemon");
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : pokemon ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4} md={8}>
              <img src={pokemon.sprite} alt={pokemon.name} />
            </Grid>
            <Grid item xs={8} md={4}>
              <h2>{capitalizeFirstLetter(pokemon.name)} #{pokemon.id}</h2>
              <p>
                Types: {pokemon.types.map((type) => type).join("/")}
              </p>
              <p>Weight: {pokemon.weight} Lbs</p>
              <p>Height: {pokemon.height} ft </p>
            </Grid>
            <Grid item xs={12} md={4}>
              <p>{pokemon.description}</p>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <p>Pokemon not found</p>
      )}
      <button onClick={handleGoBack}>Go Back to Pokedex</button>
    </div>
  );
};

export default Pokemon;
