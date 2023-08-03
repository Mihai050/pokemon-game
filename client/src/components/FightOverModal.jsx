import React from "react";
import "./FightOverModal.css";

export default function FightOverModal(props) {
  return (
    <div className="fightOverModal">
      <div className="titleContainerFight">
        <h2>
          Fight over! You{" "}
          {props.winner ? "won! Congratulation!" : "lost! Bad Luck!"}
        </h2>
      </div>
      <div className="fightStatsContainer">
        <div className="winnerPictureContainer">
          <h3 className="pokemonTitle">{props.winnerName} won!</h3>
          <img src={props.picture} className="winnerPicture" alt="winning pokemon" />
        </div>
        <div className="statsContainer">
          {props.captured ? (
            <div className="containerOfCapture">
              <h3>POKEMON CAPTURED</h3>
              <img
                className="pokeballImage"
                src="https://www.freeiconspng.com/thumbs/pokeball-png/pokemon-ball-png-1.png"
                alt="a Pokeball"
              />
            </div>
          ) : props.winner ? (
            <div className="containerOfCapture">
              <h3 className="pokemonTitle">POKEMON NOT CAPTURED!</h3>
              <img
                className="pokeballImage"
                src="https://www.pngall.com/wp-content/uploads/4/Pokemon-Pokeball-Transparent.png"
                alt="a broken Pokeball"
              />
            </div>
          ) : (
            <div className="pokeballImage">
              <img
                className="pokeballImage"
                src="https://www.pngmart.com/files/22/Surprised-Pikachu-PNG-Isolated-Pic.png"
                alt="a broken cup"
              />
            </div>
          )}
        </div>
      </div>
      <button className="fightBack" onClick={props.function}>
        Go back to the map!
      </button>
    </div>
  );
}
