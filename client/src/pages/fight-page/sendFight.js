/***
 @param id "The id of the player as a string"
 @param bool "Whether the fight was won or not, true or false"
 @param pokemon "If pokemon was captured pokemon name as string, if not null"
 @param experience "Number of experience points going to the player"
 */
export default function (id, bool, pokemon, experience){
    fetch("http://localhost:8080/api/fightUpdate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        fightData: {
          won: bool,
          pokemonCaptured: pokemon,
          xp: experience,
        },
      }),
    });
}