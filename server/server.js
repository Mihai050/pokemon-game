const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const User = require("./User");

app.use(cors());
app.use(express.json());



async function connectToDatabase() {
  try {
    await mongoose.connect("YOUR LINK HERE");
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }

}

connectToDatabase();

const registerUser = require("./utils/registerUser");

app.post("/api/register", async (req, res) => {
  try {
    const userObject = req.body;
    const registration = await registerUser(userObject);

    if (registration) {
      console.log("Registration completed successfully");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
});

app.post("/api/checkUsername", async (req, res) => {
  console.log("Check");
  try {
    const username = req.body.username;
    console.log(username);
    const existUsername = await User.findOne({ name: username });
    console.log(existUsername);
    if (existUsername) {
      res.send({ value: true });
    } else {
      res.send({ value: false });
    }
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
});

app.post("/api/login", async (req, res) => {
  console.log("login");
  try {
    const { username, password } = req.body;

    const userExists = await User.exists({ name: username });

    if (!userExists) {
      res.send({ message: "Login unsuccessful", key: null });
      return;
    }
    const subject = await User.findOne({ name: username });
    if (subject.password === password) {
      res.send({ message: "Login successful", key: subject["_id"] });
    } else {
      res.send({ message: "Login unsuccessful", key: null });
    }
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
});

app.post("/api/readUserData", async (req, res) => {
  console.log("readUserData");
  try{
    const id = req.body.id;
    const player = await User.findOne({ _id: id });
    console.log("found player" + player.name)
    player.password = null;

    console.log(player);

    res.send(player);
  } catch (error) {
    console.log("Error:", error);
    res.sendStatus(500);
  }
})

app.post("/api/fightUpdate", async (req, res) => {
  console.log("fightUpdate");
  try {
    const id = req.body.id;
    const fightData = req.body.fightData;
    const player = await User.findOne({ _id: id });

    if(!fightData.won){
      player.losses ++;
      await player.save();
      return;
    }

    if(fightData.pokemonCaptured){
      player["pokemons"].push(fightData.pokemonCaptured);
      console.log(fightData.pokemonCaptured + "================================================================")
    }

    player.experience += fightData.xp;
    player.wins ++;
    await player.save();
    res.send(player);
  } catch (error) {
    console.log("Error:", error);
    res.sendStatus(500);
  }
});

app.post("/api/updateFavoritePokemon", async (req, res) =>{
  console.log("updating favorite Pokemon")
  try {
    const id = req.body.id;
    const favoritePokemon = req.body.favoritePokemon;
    const player = await User.findOne({ _id: id });

    player["favPokemon"] = favoritePokemon;

    await player.save();
    res.send(player);
  } catch (error) {
    console.log("Error:", error);
    res.sendStatus(500);
  }
})

app.get("/api/hello", (req, res) => {
  res.send("Hello, World");
});



app.listen(8080, () =>
  console.log("Listening on port http://localhost:8080/api/hello")
);
