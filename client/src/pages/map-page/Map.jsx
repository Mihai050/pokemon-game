import React, { useState, useEffect, useContext } from "react";
import { Tooltip } from "react-tooltip";
import "./Map.css";
import { Context } from "../../App.jsx";
import PlayerInfo from "../../components/PlayerInfo";
import Instructions from "../../components/Instructions";
import Stash from "../../components/Stash";

export default function Map(props) {
  const [player, setPlayer] = useState(null);
  const [locations, setLocations] = useState([]);

  const [pokemonToFight, setPokemonToFight] = useContext(Context);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showStash, setShowStash] = useState(false);

  const handleInstructionsClick = () => {
    setShowInstructions(!showInstructions);
  };

  const logOutFunction = () => {
    localStorage.setItem("userData", JSON.stringify(""));
    window.location.reload(false);
  };

  const fetchPoke = async () => {
    let pokemons = [];
    const getPokeOutOfLocation = async (location) => {
      const req = await fetch(`https://pokeapi.co/api/v2/location-area/${location}/`);
      const res = await req.json();
      return res.pokemon_encounters;
    };
    const fetchIndividualLocation = async (location) => {
      const req = await fetch(`https://pokeapi.co/api/v2/location/${location}/`);
      const res = await req.json();
      return res.name;
    };
    for (let i = 1; i < 21; i++) {
      let somewatPokemons = await getPokeOutOfLocation(i);
      let individualLocationName = await fetchIndividualLocation(i);
      pokemons.push({ location: individualLocationName, here: [] });
      somewatPokemons.forEach((encounter, index) => {
        pokemons[i - 1].here.push({
          id: index,
          name: encounter.pokemon.name,
          url: encounter.pokemon.url,
        });
      });
    }
    const resultedPokemons = await Promise.all(pokemons);
    setLocations(resultedPokemons);
  };

  useEffect(() => {
    fetchPoke();

    const storedValue = JSON.parse(localStorage.getItem("userData"));
    fetch("http://localhost:8080/api/readUserData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: storedValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPlayer(data);
      });
  }, []);

  return (
    <div className="mapScreen">
      {locations.map((location, index) => (
        <div key={index}>
          <svg
            id={`dungeon-${index + 1}`}
            className="dungeon"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              props.onPage();
              const numberOfPoke = location.here.length;
              setPokemonToFight(location.here[Math.floor(Math.random() * numberOfPoke)].name);
            }}
          >
            <path d="M128.73 195.32l-82.81-51.76c-8.04-5.02-18.99-2.17-22.93 6.45A254.19 254.19 0 0 0 .54 239.28C-.05 248.37 7.59 256 16.69 256h97.13c7.96 0 14.08-6.25 15.01-14.16 1.09-9.33 3.24-18.33 6.24-26.94 2.56-7.34.25-15.46-6.34-19.58zM319.03 8C298.86 2.82 277.77 0 256 0s-42.86 2.82-63.03 8c-9.17 2.35-13.91 12.6-10.39 21.39l37.47 104.03A16.003 16.003 0 0 0 235.1 144h41.8c6.75 0 12.77-4.23 15.05-10.58l37.47-104.03c3.52-8.79-1.22-19.03-10.39-21.39zM112 288H16c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h96c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zm0 128H16c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h96c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zm77.31-283.67l-36.32-90.8c-3.53-8.83-14.13-12.99-22.42-8.31a257.308 257.308 0 0 0-71.61 59.89c-6.06 7.32-3.85 18.48 4.22 23.52l82.93 51.83c6.51 4.07 14.66 2.62 20.11-2.79 5.18-5.15 10.79-9.85 16.79-14.05 6.28-4.41 9.15-12.17 6.3-19.29zM398.18 256h97.13c9.1 0 16.74-7.63 16.15-16.72a254.135 254.135 0 0 0-22.45-89.27c-3.94-8.62-14.89-11.47-22.93-6.45l-82.81 51.76c-6.59 4.12-8.9 12.24-6.34 19.58 3.01 8.61 5.15 17.62 6.24 26.94.93 7.91 7.05 14.16 15.01 14.16zm54.85-162.89a257.308 257.308 0 0 0-71.61-59.89c-8.28-4.68-18.88-.52-22.42 8.31l-36.32 90.8c-2.85 7.12.02 14.88 6.3 19.28 6 4.2 11.61 8.9 16.79 14.05 5.44 5.41 13.6 6.86 20.11 2.79l82.93-51.83c8.07-5.03 10.29-16.19 4.22-23.51zM496 288h-96c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h96c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zm0 128h-96c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h96c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zM240 177.62V472c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8V177.62c-5.23-.89-10.52-1.62-16-1.62s-10.77.73-16 1.62zm-64 41.51V472c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8V189.36c-12.78 7.45-23.84 17.47-32 29.77zm128-29.77V472c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8V219.13c-8.16-12.3-19.22-22.32-32-29.77z"></path>
          </svg>
          <Tooltip anchorSelect={`#dungeon-${index + 1}`} place="top" className="tip">
            {location.location
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Tooltip>
        </div>
      ))}
      <div className="instructions" onClick={handleInstructionsClick}>
        <img src="https://static.wikia.nocookie.net/gensin-impact/images/c/cf/Icon_Archon_Quest.png" alt="Indication" />
      </div>
      {showInstructions && <Instructions closeEvent={handleInstructionsClick} />}
      <div
        className="stash"
        onClick={() => {
          setShowStash(!showStash);
        }}
      >
        <img className="stash" id="stashId" src="https://www.svgrepo.com/show/8670/backpack.svg" alt="Stash" />
      </div>
      {showStash && (
        <Stash
        closeButton={() => {
          setShowStash(!showStash);
        }}
        />
        )}
      <div className="logOutButton" onClick={logOutFunction}>
        <img src="https://cdn3.iconfinder.com/data/icons/ui-essential-elements-dark-circle-buttons/110/Power-512.png" alt="logout button" />
      </div>
      <PlayerInfo name={player ? player.name : "...Loading"} wins={player ? player.wins : 1} losses={player ? player.losses : 1} level={player ? player.level : "..."} />
        
      <Tooltip anchorSelect={`#stashId`} place="bottom" className="tip">Pokemon Stash</Tooltip>
      <Tooltip anchorSelect={`.instructions`} place="top" className="tip">Game Instructions</Tooltip>
      <Tooltip anchorSelect={`.logOutButton`} place="top" className="tip">Log Out?</Tooltip>
    </div>
  );
}
