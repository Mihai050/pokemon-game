import React from 'react'
import "./PlayerInfo.css"

export default function PlayerInfo(props) {
    const ratio = props.wins / props.losses;
  return (
    <div className="infoBackground">
      <img
        src="https://www.pngarts.com/files/4/Pokeball-Download-Transparent-PNG-Image.png"
        alt="a player profile"
      />
      <h3>Welcome, <span className="playerNameDisplay">{props.name}</span>!</h3>
      <h4>Win/Lose ratio: <span className="winLoseRatio">{ratio.toFixed(2)}</span></h4>
      <h5>Level: <span>{props.level}</span></h5>
    </div>
  );
}
