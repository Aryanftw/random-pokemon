import React, { useState, useEffect } from "react";

const getRandomId = () => Math.floor(Math.random() * 898) + 1;
const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchPokemon = async () => {
    setLoading(true);
    const id = getRandomId();
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon({
        name: data.name,
        image: data.sprites.front_default,
        type: data.types[0].type.name,
      });
    } catch (error) {
      console.log("Error in fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);
  return (
    <div className="bg-amber-200 w-screen h-screen flex flex-col gap-5 justify-center items-center">
      <p className="text-3xl font-bold">Random Pokemon!</p>
      {loading ? (
       <div className="w-12 h-12 border-4 border-t-transparent border-green-300 rounded-full animate-spin"></div>
      ) : pokemon ? (
        <div className="w-44 h-20 border border-black rounded-lg flex flex-col justify-center items-center">
          <p>Name: {pokemon.name}</p>
          <p>Type: {pokemon.type}</p>
        </div>
      ) : (
        <p>Click to fetch a Pokémon!</p>
      )}
      <button
        onClick={fetchPokemon}
        className="w-32 bg-green-400 h-8 rounded-lg cursor-pointer border border-black"
      >
        Show Another
      </button>
    </div>
  );
};

export default App;
