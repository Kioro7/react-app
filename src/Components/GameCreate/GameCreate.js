import React, { useEffect } from "react";
import "./Style.css";
import { genre } from "../../Components/Genre/Genre";
import { gameUpdate } from "../../Components/Game/Game";

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

// const Update = () => {
//   if (gameUpdate != null)
//   {
//     document.getElementsByClassName("nameGame").value = gameUpdate.name;
//     document.getElementsByClassName("developer").value = gameUpdate.developer;
//     document.getElementsByClassName("genre").value = gameUpdate.genreId;
//     document.getElementsByClassName("mode").value = gameUpdate.mode;
//   }
// };

const GameCreate = ({ user, addGame }) => {
  useEffect(() => {
    const Update = () => {
      console.log(gameUpdate);
      document.getElementsByClassName("nameGame").value = gameUpdate.name;
      document.getElementsByClassName("developer").value = gameUpdate.developer;
      document.getElementsByClassName("genre").value = gameUpdate.genreId;
      document.getElementsByClassName("mode").value = gameUpdate.mode;
    };
    Update();
  }, [gameUpdate]);

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
        body: JSON.stringify(game),
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
      {user.isAuthenticated ? (
        <>
          <h3>Добавление новой игры / Изменение игры</h3>
          <form onSubmit={handleSubmit}>
            <label>Название: </label>
            <input
              type="text"
              name="nameGame"
              placeholder="Введите название игры"
            />{" "}
            <br />
            <label>Жанр игры: </label>
            <CreateOption /> <br />
            <label>Режим игры: </label>
            <input
              type="text"
              name="mode"
              placeholder="Введите режим игры"
            />{" "}
            <br />
            <label>Разработчик игры: </label>
            <input
              type="text"
              name="developer"
              placeholder="Введите разработчика игры"
            />{" "}
            <br />
            <button type="submit">Создать / Изменить</button>
          </form>
        </>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
export default GameCreate;
