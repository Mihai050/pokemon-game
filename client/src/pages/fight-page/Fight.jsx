import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../App.jsx";
import { Tooltip } from "react-tooltip";
import "./Fight.css";
import FightOverModal from "../../components/FightOverModal.jsx";
import sendFight from "./sendFight.js";
import { attackProcess } from "./attackProcess.js";
import Board from "../../components/Board.jsx";
import StashCards from "../../components/StashCards.jsx";
import FightCards from "../../components/FightCards.jsx";

export default function Fight(props) {
  const storedValue = JSON.parse(localStorage.getItem("userData"));
  const [pokemonToFight, setPokemonToFight] = useContext(Context);
  const [existingPokemons, setExistingPokemons] = useState(null);
  const [playersArr, setPlayersArr] = useState(null);
  const [objectOfPokemons, setObjectOfPokemons] = useState(null);
  const [fightReadySchemaries, setFightReadySchemaries] = useState(null);
  const [fightOver, setFightOver] = useState(false);
  const [capturedPokemon, setCapturedPokemon] = useState(null);


  const fetchPlayerPoke = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/readUserData", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: storedValue }),
      });

      const data = await response.json();
      setPlayersArr([data.favPokemon, pokemonToFight]);
      setExistingPokemons(data.pokemons);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPokeDetails = async (arr) => {
    const fetchPoke = async (poke) => {
      const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
      const res = await req.json();
      return res;
    };

    const pokemonPromises = arr.map(async (poke) => {
      const pokemonFetched = await fetchPoke(poke);
      return {
        name: poke,
        picture: pokemonFetched.sprites.front_default,
        stats: {
          hp: pokemonFetched.stats[0].base_stat,
          attack: pokemonFetched.stats[1].base_stat,
          defense: pokemonFetched.stats[2].base_stat,
        },
        type: pokemonFetched.types[0].type.name,
      };
    });

    const pokemons = await Promise.all(pokemonPromises);
    setObjectOfPokemons(pokemons);
  };

  useEffect(() => {
    fetchPlayerPoke();
  }, []);

  useEffect(() => {
    if (playersArr) {
      fetchPokeDetails(playersArr);
    }
  }, [playersArr]);

  useEffect(() => {
    if (objectOfPokemons) {
      setFightReadySchemaries({
        isPlayerTurn: true,
        pokemons: objectOfPokemons,
        message: "",
      });
    }
  }, [objectOfPokemons]);

  useEffect(() => {
    if (fightReadySchemaries) {
      console.log(fightReadySchemaries);
    }

    if (fightReadySchemaries && fightReadySchemaries.pokemons[0].stats.hp < 1) {
      setFightOver({
        winner: false,
        picture: fightReadySchemaries.pokemons[1].picture,
        winnerName: fightReadySchemaries.pokemons[1].name,
      });
      sendFight(storedValue, false, null, 0);
    }

    if (fightReadySchemaries && fightReadySchemaries.pokemons[1].stats.hp < 1) {
      setFightOver({
        winner: true,
        picture: fightReadySchemaries.pokemons[0].picture,
        winnerName: fightReadySchemaries.pokemons[0].name,
      });


      const randomNumber = 1 + Math.floor(Math.random() * 5);
      let pokemonToCapture = null;

      if (
        randomNumber % 2 === 0 &&
        !existingPokemons.includes(fightReadySchemaries.pokemons[1].name)
      ) {
        setCapturedPokemon(fightReadySchemaries.pokemons[1].name);
        pokemonToCapture = fightReadySchemaries.pokemons[1].name;
      }

      sendFight(storedValue, true, pokemonToCapture, randomNumber * 2);
    }
  }, [fightReadySchemaries]);



  return (
    <div className="fightScreen">
      {fightReadySchemaries && (
        <>
          {fightReadySchemaries.pokemons.map((pokemon, key) => 
            <FightCards name={pokemon.name} hp={pokemon.stats.hp} attack={pokemon.stats.attack} defense={pokemon.stats.defense} picture={pokemon.picture}/>
          )}
          {fightOver ? (
            <FightOverModal
              winner={fightOver.winner}
              picture={fightOver.picture}
              winnerName={fightOver.winnerName}
              captured={capturedPokemon}
              function={props.onPage}
            />
          ) : (
            <img
              className="fightButton"
              src="https://cdn-icons-png.flaticon.com/512/297/297806.png"
              onClick={() => {
                setFightReadySchemaries(attackProcess(fightReadySchemaries));
              }}
            />
          )}
        </>
      )}
      {/* {playersArr && playersArr.map(player => <StashCards name={player}/>)} */}
      <Board
        player={
          fightReadySchemaries
            ? fightReadySchemaries.pokemons[0].name
            : "Loading..."
        }
        enemy={
          fightReadySchemaries
            ? fightReadySchemaries.pokemons[1].name
            : "Loading..."
        }
        message={fightReadySchemaries && fightReadySchemaries.message}
        damage={fightReadySchemaries && fightReadySchemaries.damage}
        attacker={
          fightReadySchemaries
            ? fightReadySchemaries.isPlayerTurn
              ? fightReadySchemaries.pokemons[0].name
              : fightReadySchemaries.pokemons[1].name
            : "Loading..."
        }
      />
    </div>
  );
}
