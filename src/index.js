import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import Game from "./Components/Game/Game";
import GameInfo from "./Components/GameInfo/GameInfo"
import GameCreate from "./Components/GameCreate/GameCreate";
import Genre from "./Components/Genre/Genre";
import UserGamesList from "./Components/UserGamesList/UserGamesList"

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import LogIn from "./Components/LogIn/LogIn";
import LogOff from "./Components/LogOff/LogOff";
import Register from "./Components/Registration/Registration";

function App() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [upGame, setUpGame] = useState({});
  const [gameInfo, setGameInfo] = useState({});
  const [userGames, setUserGames] = useState([]);
  const addGame = (game) => setGames([...games, game]);
  const removeGame = (removeId) =>
    setGames(games.filter(({ id }) => id !== removeId));
  const [user, setUser] = useState({ isAuthenticated: false, id: "", userName: "", userRole: "" });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route index element={<h3>Главная страница</h3>} />
          <Route
            path="/games"
            element={
              <>
                <Genre setGenres={setGenres}/>

                <GameCreate
                  user={user}
                  addGame={addGame}
                  upGame={upGame}
                  setUpGame={setUpGame}
                  games={games}
                  setGames={setGames}
                  genres={genres}
                />

                <Game
                  user={user}
                  games={games}
                  userGames={userGames}
                  setUpGame={setUpGame}
                  setGames={setGames}
                  removeGame={removeGame}
                  setGameInfo={setGameInfo}
                />
              </>
            }
          />
          <Route
            path="/gameInfo"
            element={<GameInfo user={user} gameInfo={gameInfo} userGames={userGames} setUserGames={setUserGames} genres={genres}></GameInfo>}>
          </Route>
          <Route
            path="/myGames"
            element={<UserGamesList user={user} userGames={userGames} setUserGames={setUserGames} games={games} setGames={setGames}></UserGamesList>}>
          </Route>
          <Route
            path="/register"
            element={<Register user={user} setUser={setUser} />}
          />
          <Route
            path="/login"
            element={<LogIn user={user} setUser={setUser} />}
          />
          <Route path="/logoff" element={<LogOff setUser={setUser} />} />
          <Route path="*" element={<h3>404</h3>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
