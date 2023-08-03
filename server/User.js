const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    lowercase: true,
  },
  password: String,
  pokemons: {
    type: Array,
    default: function () {
      const starterArrays = [
        ["bulbasaur", "charmander", "squirtle"],
        ["chikorita", "cyndaquil", "totodile"],
        ["treecko", "torchic", "mudkip"],
        ["turtwig", "chimchar", "piplup"],
        ["snivy", "tepig", "oshawott"],
      ];
      const randomIndex = Math.floor(Math.random() * starterArrays.length);
      return starterArrays[randomIndex];
    },
  },
  favPokemon: {
    type: String,
    default: function () {
      return this.pokemons[0];
    },
  },
  experience: {
    type: Number,
    default: function () {
      return 10;
    },
  },
  level: {
    type: Number,
    default: function () {
      return 1;
    },
  },
  wins: {
    type: Number,
    default: function () {
      return 1;
    },
  },
  losses: {
    type: Number,
    default: function () {
      return 1;
    },
  },
});

userSchema.pre("save", function (next) {
  this.level = Math.floor(this.experience / 10);
  next();
});


// ! https://www.youtube.com/watch?v=DZBGEVgL2eE

module.exports = mongoose.model("User", userSchema);