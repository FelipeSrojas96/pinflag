import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const PokemonsPerPage = 30;
const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  
const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [showFavorites, setShowFavorites] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * PokemonsPerPage;
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/?limit=${PokemonsPerPage}&offset=${offset}`
        );
        const updatedPokemons = response.data.results.map((pokemon) => ({
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIndex(
            pokemon.url
          )}.png`,
          favorite: false,
          borderColor: "white",
        }));
        setPokemons(updatedPokemons);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemons(filtered);
  }, [pokemons, searchTerm]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const toggleFavorite = (index) => {
    setPokemons((prevPokemons) => {
      const updatedPokemons = [...prevPokemons];
      const updatedPokemon = { ...updatedPokemons[index] };
      updatedPokemon.favorite = !updatedPokemon.favorite;
      updatedPokemons[index] = updatedPokemon;
      return updatedPokemons;
    });
  };

  useEffect(() => {
    const filtered = showFavorites ? pokemons.filter(pokemon => pokemon.favorite) : pokemons;
    setFilteredPokemons(filtered);
}, [pokemons, showFavorites]);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getIndex = (url) => {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : null;
  };

  return (
    <div>
      <h1>Pokemon List</h1>
      <div>
        <button onClick={() => setShowFavorites((prevState) => !prevState)}>
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {filteredPokemons.map((pokemon, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                border: `1px solid ${pokemon.borderColor}`,
              }}
            >
              <Link to={`/pokemon/${pokemon.name}`}>
                <img src={pokemon.sprite} alt={pokemon.name} width={"80%"} />
                <p style={{ textAlign: "center" }}>{capitalizeFirstLetter(pokemon.name)}</p>
              </Link>
              <FaStar
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  color: pokemon.favorite ? "yellow" : "gray",
                  borderColor: pokemon.borderColor,
                  borderWidth: 2,
                  borderStyle: "solid",
                  cursor: "pointer",
                }}
                onClick={() => toggleFavorite(index)}
              />
            </div>
          ))}
        </div>
      )}
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
};

export default PokemonList;
