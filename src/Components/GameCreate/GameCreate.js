import React, { useEffect, useState } from "react";
import "./Style.css";
import { genre } from "../../Components/Genre/Genre";

const GameCreate = ({ user, addGame, upGame, setGame }) => {
  const [nameGame, setName] = useState("");
  const [developer, setDeveloper] = useState("");
  const [mode, setMode] = useState("");

  useEffect(() => {
    setName(upGame.name);
    setDeveloper(upGame.developer);
    setMode(upGame.mode);
    console.log(11111);
  }, [upGame]);

  const CreateOption = () => {
    return (
      <React.Fragment>
        <select name="genre">
          {genre.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  };

  const gameUpdate = async (e) => {
    e.preventDefault();

    const valueName = e.target.elements.nameGame.value;
    const valueDev = e.target.elements.developer.value;
    const valueMode = e.target.elements.mode.value;

    const game = {
      name: valueName,
      developer: valueDev,
      mode: valueMode,
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(game),
    };

    const response = await fetch(`api/games/${upGame.id}`, requestOptions);

    return await response.json().then(
      (data) => {
        console.log(data);
        // response.status === 201 && addBlog(data)
        if (response.ok) {
          setGame(data);
          e.target.elements.nameGame.value = "";
          e.target.elements.developer.value = "";
          e.target.elements.mode.value = "";
        }
      },
      (error) => console.log(error)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valueName = e.target.elements.nameGame.value;
    const valueDev = e.target.elements.developer.value;
    const valueGenre = e.target.elements.genre.value;
    const valueMode = e.target.elements.mode.value;

    console.log(genre[valueGenre]);

    const game = {
      name: valueName,
      developer: valueDev,
      genreId: valueGenre,
      mode: valueMode,
    };

    console.log(game);

    const createGame = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(game)
      };

      console.log(requestOptions);
      const response = await fetch("api/games/", requestOptions);

      return await response.json().then(
        (data) => {
          console.log(data);
          // response.status === 201 && addBlog(data)
          if (response.ok) {
            addGame(data);
            e.target.elements.nameGame.value = "";
            e.target.elements.developer.value = "";
            e.target.elements.mode.value = "";
          }
        },
        (error) => console.log(error)
      );
    };
    createGame();
  };

  return (
    <React.Fragment>
      {user.isAuthenticated && user.userRole == "admin" ? (
        <>
          <h3>Добавление новой игры / Изменение игры</h3>
          <form onSubmit={handleSubmit}>
            <label>Название: </label>
            <input
              type="text"
              name="nameGame"
              value={nameGame}
              placeholder="Введите название игры"
            />{" "}
            <br />
            <label>Жанр игры: </label>
            <CreateOption /> <br />
            <label>Режим игры: </label>
            <input
              type="text"
              name="mode"
              value={mode}
              placeholder="Введите режим игры"
            />{" "}
            <br />
            <label>Разработчик игры: </label>
            <input
              type="text"
              name="developer"
              value={developer}
              placeholder="Введите разработчика игры"
            />{" "}
            <br />
            <button type="submit">Создать</button>
            <button onClick={(e) => gameUpdate(e)}>Изменить</button>
          </form>
        </>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
export default GameCreate;
