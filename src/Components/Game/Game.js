import React, { useEffect, useState } from "react";
import { Card, Space, Image, Button } from 'antd';
import "./Style.css";
import { Link } from "react-router-dom";

//const { Meta } = Card;

const Game = ({ user, setUpGame, games, setGames, removeGame, setGameInfo }) => {
  const [sort, setSort] = useState([]);

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

  const deleteItem = async ({ id }) => {
    const requestOptions = {
      method: "DELETE",
    };
    return await fetch(`api/games/${id}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          removeGame(id);
        }
      },
      (error) => console.log(error)
    );
  };

  const gameItem = async ({ id }) => {
    const requestOptions = {
      method: "GET",
    };

    return await fetch(`api/games/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setGameInfo(data)
        setUpGame(data);
      });
  };

  function SortArray(x, y){
    return x.name.localeCompare(y.name);
}

  const sorting = async () => {
    console.log("Games", games)
    setSort(games.sort(SortArray))
    games = sort
  }

  return (
    <React.Fragment>
      <h3>Список игр</h3>
      {console.log()}
      <Button
              type="primary"
              onClick={() => sorting()}>
                Сортировать
              </Button>
      {games.map(
        ({
          id,
          name,
          mode,
          // releaseDate,
          price,
          developer,
          imageLink,
          // registrationDate,
          // description,
          rating,
          numberRatings,
          genre,
        }) => (
          <div className="Game" key={id} id={id}>
            <Link onClick={() => gameItem({ id })} to={"/gameInfo"}>
            <Card hoverable
              size="small"
              title={<h2>{name}</h2>}
              bordered={false}>
              <Card.Grid style={{width: 300}} hoverable={false}>
              <Image src={imageLink} width={250} preview={false}/>
              </Card.Grid>
              <Card.Grid style={{width: 450}} hoverable={false}>
                <Space direction="vertical" size={0}>
                  <p>Жанр игры: {genre.name}</p>
              <p>Режим игры: {mode}</p>
              <p>Разработчик: {developer}</p>
              <p>Стоимость: {price}</p>
              {/* <p>Дата регистрации: {registrationDate}</p>
              <p>Описание: {description}</p> */}
              <p>Рейтинг: {rating}</p>
              <p>Количество оценивших: {numberRatings}</p>
                </Space>

              {user.isAuthenticated && user.userRole == "admin" ? (
              <>
              <Space direction="horizontal" size={50}>
            <Button
              type="primary"
              onClick={() => deleteItem({ id })}>
                Удалить
              </Button>
              <Button
              type="primary"
              onClick={() => gameItem({ id })}>
                Изменить
              </Button>
              </Space>
              </>
            ) : (
              ""
            )}
            </Card.Grid>
              </Card>
            </Link>
          </div>
        )
      )}
    </React.Fragment>
  );
};
export default Game;
