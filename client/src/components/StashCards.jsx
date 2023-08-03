import React, { useState, useEffect } from "react";

export default function StashCards({ updateParentState, name, refresh, disableSelection }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [childState, setChildState] = useState(null);
  
  const [isHovered, setIsHovered] = useState(false);

    const switchPokemon = function async(pokemonToChange) {
      if (disableSelection) {
        return;
      }
    const storedValue = JSON.parse(localStorage.getItem("userData"));

    fetch("http://localhost:8080/api/updateFavoritePokemon", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: storedValue,
      favoritePokemon: pokemonToChange, }),
    });
    const newState = pokemonToChange;
    setChildState(newState);
    updateParentState(newState)
  }

  const fetchPokeDetails = async (poke) => {
    const fetchPoke = async (poke) => {
      const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
      const res = await req.json();
      return res;
    };

    const pokemonPromises = async (poke) => {
      const pokemonFetched = await fetchPoke(poke);
      return {
        name: pokemonFetched.name,
        picture: pokemonFetched.sprites.front_default,
        stats: {
          hp: pokemonFetched.stats[0].base_stat,
          attack: pokemonFetched.stats[1].base_stat,
          defense: pokemonFetched.stats[2].base_stat,
        },
      };
    };

    const pokemon = await pokemonPromises(poke);
    setSelectedPokemon(pokemon);
  };
  useEffect(() => {
    fetchPokeDetails(name);
  }, [name]);
  
  return (
    <div
      className={isHovered ?  "containerToSelectHover" : "containerToSelect"}
      onClick={() => {
        switchPokemon(selectedPokemon.name);
        if(!disableSelection){
          refresh();
        }
      }}
      onMouseEnter={()=>{
        if(!disableSelection){
          setIsHovered(true);
        }

      }}
      onMouseLeave={()=>{
        if(!disableSelection){
          setIsHovered(false);
        }
      }}
        >
      <img className="frame" src="https://i.imgur.com/u6OdoVT.png" alt="Pokemon Card Frame" />
      {selectedPokemon && (
        <>
          <span className="pokemonName">{selectedPokemon.name}</span>
          <img className="selectedPokemonImage" src={selectedPokemon.picture} alt={selectedPokemon.name} />
          <span className="stats" id="hpValue">
            Hp:{selectedPokemon.stats.hp}
          </span>
          <span className="stats" id="attackValue">
            Attack:{selectedPokemon.stats.attack}
          </span>
          <span className="stats" id="defenseValue">
            Defense:{selectedPokemon.stats.defense}
          </span>
        </>
      )}
    </div>
  );
}
