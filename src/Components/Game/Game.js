import React, { useEffect } from "react";
import { Card, Space, Image } from 'antd';
import "./Style.css";
import { Link } from "react-router-dom";

const Game = ({ /*user,*/ /*setUpGame,*/ games, setGames, /*removeGame*/ }) => {
  useEffect(() => {
    const getGames = async () => {
      const requestOptions = {
        method: "GET",
      };
      return await fetch("api/games/", requestOptions)
        .then((response) => response.json())
        .then(
          (data) => {
            console.log("Data:", data);
            setGames(data);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getGames();
  }, [setGames]);

  // const deleteItem = async ({ id }) => {
  //   const requestOptions = {
  //     method: "DELETE",
  //   };
  //   return await fetch(`api/games/${id}`, requestOptions).then(
  //     (response) => {
  //       if (response.ok) {
  //         removeGame(id);
  //       }
  //     },
  //     (error) => console.log(error)
  //   );
  // };

  // const gameItem = async ({ id }) => {
  //   const requestOptions = {
  //     method: "GET",
  //   };

  //   return await fetch(`api/games/${id}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUpGame(data);
  //     });
  // };

  return (
    <React.Fragment>
      <h3>Список игр</h3>
      {games.map(
        ({
          id,
          name,
          mode,
          releaseDate,
          price,
          developer,
          imageLink,
          // registrationDate,
          // description,
          rating,
          numberRatings,
          genre,
        }) => (
          // <div className="Game" key={id} id={id}>
          //   <strong className="GameName"> {name} </strong>
          //   {user.isAuthenticated && user.userRole == "admin" ? (
          //     <>
          //       <button onClick={() => deleteItem({ id })}>Удалить</button>
          //       <button onClick={() => gameItem({ id })}>Изменить</button>
          //     </>
          //   ) : (
          //     ""
          //   )}
          //   <br />
          //   Жанр игры: {genre.name} <br />
          //   Режим игры: {mode} <br />
          //   Дата релиза: {releaseDate} <br />
          //   Стоимость: {price} <br />
          //   Разработчик: {developer} <br />
          //   Дата регистрации: {registrationDate} <br />
          //   Описание: {description} <br />
          //   Рейтинг: {rating} <br />
          //   Количество оценивших: {numberRatings} <br />
          // </div>
          <div className="Game" key={id} id={id}>
          <Space direction="vertical">
            <Link to={""}>
            <Card hoverable
              title={name}
              style={{
                width: 700,
              }}>
              <Image src={imageLink} width={300}/>
              <p>Жанр игры: {genre.name}</p>
              <p>Режим игры: {mode}</p>
              <p>Дата релиза: {releaseDate}</p>
              <p>Стоимость: {price}</p>
              <p>Разработчик: {developer}</p>
              {/* <p>Дата регистрации: {registrationDate}</p>
              <p>Описание: {description}</p> */}
              <p>Рейтинг: {rating}</p>
              <p>Количество оценивших: {numberRatings}</p>
              </Card>
            </Link>
            </Space>
          </div>
        )
      )}
    </React.Fragment>
  );
};
export default Game;
