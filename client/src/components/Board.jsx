import React, { useState } from "react";
import "./Board.css";

export default function Board(props) {
  return (
    <div className="board">
      <h2 className="mainMessage">
        {props.player} vs {props.enemy}
      </h2>
      <div className="specialMessage">
        {props.message && <h3>{props.message}</h3>}
        {props.damage ? (
          <h3>
            <span>{props.attacker} </span>recived {props.damage.toFixed(0)}{" "}
            damage! Now it's his turn!
          </h3>
        ) : (
          <h3>
            It's <span>{props.attacker}</span> turn
          </h3>
        )}
      </div>
    </div>
  );
}
