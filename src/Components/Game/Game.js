import React, { useEffect } from "react";
import { Card, Space, Image, Button, Row, Col, Rate, Tag, Radio } from "antd";
import "./Style.css";
import { Link } from "react-router-dom";

const Game = ({
  user,
  setUpGame,
  games,
  setGames,
  removeGame,
  setGameInfo,
}) => {

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
    console.log(games.find((x) => x.id === id));
    setGameInfo(games.find((x) => x.id === id));

    // const requestOptions = {
    //   method: "GET",
    // };

    // return await fetch(`api/games/${id}`, requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data)
    //     setGameInfo(data)
    //   });
  };

  const gameItems = async ({ id }) => {
    const requestOptions = {
      method: "GET",
    };

    return await fetch(`api/games/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUpGame(data);
      });
  };

  const sortId = async () => {
    var sortGame = [...games]
    sortGame.sort((a, b) => a.id - b.id)
    setGames(sortGame)
    console.log("Sort:", games)
  };

  const sortName = async () => {
    var sortGame = [...games]
    sortGame.sort((a, b) => a.name > b.name ? 1 : -1)
    setGames(sortGame)
    console.log("Sort:", games)
  };

  const sortPrice = async () => {
    var sortGame = [...games]
    sortGame.sort((a, b) => a.price - b.price)
    setGames(sortGame)
    console.log("Sort:", games)
  };

  return (
    <React.Fragment>
      <h2 style={{textAlign: "center"}}>Список игр</h2>
      <div>
        <Space direction="horizontal">
        <div style={{fontSize: 18, margin: 10, marginRight: 30}}>Сортировать: </div>
        <Radio.Group>
          <Radio style={{fontSize: 18}} onClick={sortId} value={1}>По умолчанию</Radio>
          <Radio style={{fontSize: 18}} onClick={sortName} value={2}>По алфавиту</Radio>
          <Radio style={{fontSize: 18}} onClick={sortPrice} value={3}>По цене</Radio>
        </Radio.Group>
        </Space>
      </div>
      <div>
      {games.map(
        ({
          id,
          name,
          mode,
          price,
          developer,
          imageLink,
          rating,
          numberRatings,
          genre,
        }) => (
          <Space className="Game" key={id} id={id} align="center" wrap direction="vertical">
            <Link onClick={() => gameItem({ id })} to={"/gameInfo"}>
              <Card
                hoverable
                size="small"
                style={{ border: 0, padding: 10, margin: 10, width: 300, height: 400 }}
              >
                <Row justify={"start"}>
                  <Col>
                    <Row justify={"center"} style={{fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10}}>
                      <div>{name}</div>
                    </Row>
                    <Row justify={"center"}>
                      <Image src={imageLink} width={250} preview={false} style={{marginBottom: 10}} />
                    </Row>
                    <Row justify={"center"} style={{marginBottom: 10, marginTop: 10}}>
                      <Tag color="blue" style={{fontSize: 16, padding: 3, margin: 3}}>{genre.name}</Tag>
                      <Tag color="blue" style={{fontSize: 16, padding: 3, margin: 3}}>{mode}</Tag>
                      <Tag color="blue" style={{fontSize: 16, padding: 3, margin: 3}}>{developer}</Tag>
                    </Row>
                    <Row justify={"center"}>
                      <div style={{ fontSize: 16 }}>
                        Оценка: <Rate disabled value={rating} /> / {numberRatings}
                      </div>
                    </Row>
                    <Row justify={"center"}>
                      <div style={{ fontSize: 16, fontWeight: "bolder" }}>
                        <div>Цена: {price} руб.</div>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Link>
            {user.isAuthenticated && user.userRole == "admin" ? (
                <Space direction="horizontal" size={30}>
                  <Button type="primary" onClick={() => deleteItem({ id })}>
                    Удалить
                  </Button>
                  <Button type="primary" onClick={() => gameItems({ id })}>
                    Изменить
                  </Button>
                </Space>
            ) : (
              ""
            )}
          </Space>
        )
      )}
      </div>
    </React.Fragment>
  );
};
export default Game;
