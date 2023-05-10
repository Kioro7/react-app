import React, { useState, useEffect } from "react";
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
  const [upGame, setUpGame] = useState({});
  const [gameInfo, setGameInfo] = useState({});
  const [userGames, setUserGames] = useState([]);
  const addGame = (game) => setGames([...games, game]);
  const removeGame = (removeId) =>
    setGames(games.filter(({ Id }) => Id !== removeId));
  const [user, setUser] = useState({ isAuthenticated: false, userName: "", userRole: "" });

  useEffect(() => {
    const getUser = async () => {
      return await fetch("api/account/isauthenticated")
        .then((response) => {
          response.status === 401 &&
            setUser({ isAuthenticated: false, userName: "" });
          return response.json();
        })
        .then(
          (data) => {
            if (
              typeof data !== "undefined" &&
              typeof data.userName !== "undefined"
            ) {
              setUser({ isAuthenticated: true, userName: data.userName });
            }
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getUser();
  }, [setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route index element={<h3>Главная страница</h3>} />
          <Route
            path="/games"
            element={
              <>
                <Genre />

                <GameCreate
                  user={user}
                  addGame={addGame}
                  upGame={upGame}
                  setGame={setGames}
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
            element={<GameInfo user={user} gameInfo={gameInfo} userGames={userGames} setUserGames={setUserGames}></GameInfo>}>
          </Route>
          <Route
            path="/myGames"
            element={<UserGamesList user={user} userGames={userGames} setUserGames={setUserGames}></UserGamesList>}>
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
