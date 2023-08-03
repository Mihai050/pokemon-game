import React, {useState, useEffect} from 'react';
import Start from './pages/starter-page/Start'
import Login from './pages/registration-page/Login'
import Map from './pages/map-page/Map'
import Fight from './pages/fight-page/Fight'
import './App.css';

export const Context = React.createContext();

function App() {
  
  const [page, setPage] = useState("start");

  const [pokemonToFight, setPokemonToFight] = useState(null);


  useEffect(() => {
  const storedValue = JSON.parse(localStorage.getItem("userData"));
  if(storedValue){
    setPage("map")
  }

  }, [])

  return (
    <div className="fullBody">
      {page === "start" ? (
        <Start
          onPage={() => {
            setPage("login");
          }}
        />
      ) : page === "login" ? (
        <Login
          onPage={() => {
            setPage("map");
          }}
        />
      ) : page === "map" ? (
        <Context.Provider value={[pokemonToFight, setPokemonToFight]}>
          <Map
            onPage={() => {
              setPage("fight");
            }}
          />
        </Context.Provider>
      ) : page === "fight" ? (
        <Context.Provider value={[pokemonToFight, setPokemonToFight]}>
          <Fight
            onPage={() => {
              setPage("map");
            }}
          />
        </Context.Provider>
      ) : null}
    </div>
  );
}

export default App;
