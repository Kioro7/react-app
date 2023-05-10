import React from "react";
import { Button, Col, Row, Image, Collapse, Modal } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;

const GameInfo = ({ user, gameInfo, userGames, setUserGames }) => {
  const addUserGame = (purchase) => setUserGames([...userGames, purchase]);
  const navigate = useNavigate();

  const backToGames = () => {
    console.log(12345);
    navigate("/games");
  };

  const buyGame = () => {
    const purchase = {
      gameId: gameInfo.id,
      userId: user.id,
      purchaseDate: new Date(),
      purchasePrice: gameInfo.price,
    };

    const addPurchase = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchase),
      };

      console.log(requestOptions);
      const response = await fetch("api/buyingGame/", requestOptions);

      return await response.json().then(
        (data) => {
          console.log(data);
          // response.status === 201 && addBlog(data)
          if (response.ok) {
            addUserGame(data);
          }
        },
        (error) => console.log(error)
      );
    };
    addPurchase();
  };

  const purchaseWindow = () => {
    <React.Fragment>
      <Modal onOk={() => buyGame()} title="Покупка" open={true}>
        <p>...</p>
      </Modal>
    </React.Fragment>;
  };

  return (
    <React.Fragment>
      <div className="GameInfo" key={gameInfo.id} id={gameInfo.id}>
        <Button
          style={{ marginTop: 20, marginBottom: 20 }}
          type="primary"
          onClick={backToGames}
        >
          <ArrowLeftOutlined />
          Вернуться к магазину
        </Button>
        <Row>
          <Col span={10}>
            <Image src={gameInfo.imageLink} width={500} />
          </Col>
          <Col span={14}>
            {/* 
          rating,
          numberRatings,*/}
            <Row>
              <div style={{ margin: 10, fontSize: 24 }}>{gameInfo.name}</div>
            </Row>
            <Row>
              <div style={{ margin: 10 }}>Жанр игры: {gameInfo.genre}</div>
            </Row>
            <Row>
              <div style={{ margin: 10 }}>Режим игры: {gameInfo.mode}</div>
            </Row>
            <Row>
              <div style={{ margin: 10 }}>
                Дата релиза: {gameInfo.releaseDate}
              </div>
            </Row>
            <Row>
              <div style={{ margin: 10 }}>
                Дата регистрация: {gameInfo.registrationDate}
              </div>
            </Row>
            <Row>
              <div style={{ margin: 10 }}>
                Разработчик: {gameInfo.developer}
              </div>
            </Row>
            <Row>
              <div style={{ margin: 10 }}>Стоимость: {gameInfo.price}</div>
            </Row>
            <Row>
              <Collapse size="small">
                <Panel header="Описание">
                  <div style={{ margin: 10 }}>{gameInfo.description}</div>
                </Panel>
              </Collapse>
            </Row>
            <Row>
              {user.isAuthenticated ? (
                <>
                  <Button type="primary">Купить игру</Button>
                </>
              ) : (
                " "
              )}
              <Button type="primary" onClick={() => purchaseWindow()}>
                Купить игру
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default GameInfo;
