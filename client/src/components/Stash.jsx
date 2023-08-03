import React, { useState, useEffect } from "react";
import StashCards from "./StashCards";
import "./Stash.css";

export default function Stash(props) {
  const storedValue = JSON.parse(localStorage.getItem("userData"));
  const [playerData, setPlayerData] = useState(null);
  const [playerPoke, setPlayerPoke] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    fetchPlayerPoke();
  }, []);

  useEffect(() => {
    setPlayerPoke(state);
  }, [state]);

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
      setPlayerData(data);
      setPlayerPoke(data.favPokemon);
    } catch (error) {
      console.error(error);
    }
  };

  const refresh = () => {
    setPlayerPoke(state);
  };

  const updateState = (childState) => {
    setState(childState);
  };

  const handleClick = () => {
    props.closeButton();
  };

  return (
    <div className="stashModal">
      <div className="closeDiv">
        <svg
          onClick={handleClick}
          className="closeButton"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M256 90c44.3 0 86 17.3 117.4 48.6C404.7 170 422 211.7 422 256s-17.3 86-48.6 117.4C342 404.7 300.3 422 256 422s-86-17.3-117.4-48.6C107.3 342 90 300.3 90 256s17.3-86 48.6-117.4C170 107.3 211.7 90 256 90m0-42C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"></path>
          <path d="M360 330.9L330.9 360 256 285.1 181.1 360 152 330.9l74.9-74.9-74.9-74.9 29.1-29.1 74.9 74.9 74.9-74.9 29.1 29.1-74.9 74.9z"></path>
        </svg>
      </div>
      <div className="container">
        <div className="selectedPokemonDiv">
          <p>Selected fighter</p>
          <div className="selectedCard">
          {playerPoke && <StashCards disableSelection={true} name={playerPoke} />}          </div>
        </div>
        <div className="pokemonsToSelectFrom">
          <p>Choose another contestant!</p>
          <div className="selectCard">
          {playerData &&
              playerData.pokemons.map((pokemon, index) => {
                if(pokemon === playerPoke){
                  return;
                }
                return (
                <StashCards
                  key={index}
                  updateParentState={updateState}
                  refresh={refresh}
                  name={pokemon}
                />
              )})}
          </div>
        </div>
      </div>
    </div>
  );
}
