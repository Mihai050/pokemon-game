export default function (object){

//     {
// isPlayerTurn: bool,
// pokemons: [
//     {
//       name: 'pikachu',
//       picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
//       stats: { hp: 35, attack: 55, defense: 40 },
//       type: 'electric'
//     },
//     {
//       name: 'muk',
//       picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/89.png',
//       stats: { hp: 105, attack: 105, defense: 75 },
//       type: 'poison'
//     }
//   ],
// message: "string"
// }


  // normal, water, grass - 15% atac sau 15% heal random pe turn
  // dragon, psychic, fighting -  7-15% atac  pe turn
  // rock, steel, bug - + defense 5-10%
  // poision, fire, dark - + damage 5-10%
  // electric, ice, ghost - skip turn
  // flying, fairy, ground - heal 40%

  const player = object.pokemons[0];
  const bot = object.pokemons[1];
  let isPlayerTurn = object.isPlayerTurn;
  let message = null;
  const randomDamageRange = Math.floor(Math.random() * (217 - 255 + 1)) + 217;
  let chanceOfSpecialAbility = false;
  let attackValue;
  let attackerType;
  let selectedPokemon = isPlayerTurn ? player.name : bot.name;
  if (isPlayerTurn) {
    const attackerAttack = player.stats.attack;
    const defenderDefence = bot.stats.defense;
    attackValue =
      ((((2 / 5 + 2) * attackerAttack * 60) / defenderDefence / 50 + 2) *
        randomDamageRange) /
      255;
    bot.stats.hp -= attackValue;
    attackerType = player.type;
  } else {
    const attackerAttack = bot.stats.attack;
    const defenderDefence = player.stats.defense;
    attackValue =
      ((((2 / 5 + 2) * attackerAttack * 60) / defenderDefence / 50 + 2) *
        randomDamageRange) /
      255;
    player.stats.hp -= attackValue;
    attackerType = bot.type;
  }

  console.log(player.stats.hp);
  console.log(bot.stats.hp);
  if (player.stats.hp > -1 && bot.stats.hp > -1) {
    let randomNumber = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    console.log(randomNumber);
    if (randomNumber > 8) {
      chanceOfSpecialAbility = true;
    }
  }

  if (chanceOfSpecialAbility) {
    message = `${selectedPokemon} used a ${attackerType} special ability!`;
    const buffPercent = Math.floor(Math.random() * (15 - 7 + 1)) + 7;
    switch (attackerType) {
      case "normal":
      case "water":
      case "grass":
        let chanceOfHeal = Math.floor(Math.random() * 10) + 1;
        if (chanceOfHeal % 2 === 0) {
          message = `${message} ${selectedPokemon} dealt more damage!`;
          if (isPlayerTurn) {
            bot.stats.hp -= attackValue * 0.15;
          } else {
            player.stats.hp -= attackValue * 0.15;
          }
        } else {
          message = `${message} ${selectedPokemon} healed itself!`;
          if (isPlayerTurn) {
            player.stats.hp +=
              player.stats.hp * 0.15 > 30 ? player.stats.hp * 0.15 : 30;
          } else {
            bot.stats.hp += bot.stats.hp * 0.15 > 30 ? bot.stats.hp * 0.15 : 30;
          }
        }
        break;

      case "dragon":
      case "psychic":
      case "fighting":
        if (isPlayerTurn) {
          bot.stats.hp -= attackValue * (buffPercent / 100);
        } else {
          player.stats.hp -= attackValue * (buffPercent / 100);
        }
        message = `${message} ${selectedPokemon} dealt ${buffPercent}% more damage!`;
        break;

      case "rock":
      case "steel":
      case "bug":
        if (isPlayerTurn) {
          player.stats.defense += player.stats.defense * (buffPercent / 100);
        } else {
          bot.stats.defense += bot.stats.defense * (buffPercent / 100);
        }
        message = `${message} ${selectedPokemon} used a passive ability! Gained ${buffPercent} more defense!`;
        break;

      case "poision":
      case "fire":
      case "dark":
        if (isPlayerTurn) {
          player.stats.attack += player.stats.attack * (buffPercent / 100);
        } else {
          bot.stats.attack += bot.stats.attack * (buffPercent / 100);
        }
        message = `${message} ${selectedPokemon} used a passive ability! ${buffPercent}% more damage!`;
        break;

      case "electric":
      case "ice":
      case "ghost":
        isPlayerTurn = !isPlayerTurn;
        message = `${message} ${selectedPokemon} used a passive ability! It's got another turn and it's ready to attack!`;
        break;

      case "flying":
      case "fairy":
      case "ground":
        if (isPlayerTurn) {
          player.stats.hp +=
            player.stats.hp * 0.15 > 30 ? player.stats.hp * 0.15 : 30;
        } else {
          bot.stats.hp += bot.stats.hp * 0.15 > 30 ? bot.stats.hp * 0.15 : 30;
        }
        message = `${message} ${selectedPokemon} used a passive ability! It got a heal boost of at least 15% !`;
        break;

      default:
        message =
          "You can't use special abilities! Seems you are affected by a spell!";
    }
  }

  isPlayerTurn = !isPlayerTurn;

  return {
    isPlayerTurn: isPlayerTurn,
    pokemons: [player, bot],
    message: message,
  };
}