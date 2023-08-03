import React, { useState, useEffect } from "react";
import "./FightCards.css";

export default function FightCards({ name, hp, attack, defense, picture }) {
  return (
    <div className="fighter">
      <img className="fighterFrame" src="https://i.imgur.com/u6OdoVT.png" alt="Pokemon Card Frame" />
      <span className="fighterName">{name}</span>
      <img className="selectedPokemonImage" src={picture} alt={name} />
      <span className="fighterStats" id="hpValue">
        Hp:{hp.toFixed(0)}
      </span>
      <span className="fighterStats" id="attackValue">
        Attack:{attack.toFixed(0)}
      </span>
      <span className="fighterStats" id="defenseValue">
        Defense:{defense.toFixed(0)}
      </span>
    </div>
  );
}
