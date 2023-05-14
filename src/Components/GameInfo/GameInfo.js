import React, { useState } from "react";
import {
  Button,
  Col,
  Row,
  Image,
  Collapse,
  Modal,
  Steps,
  Space,
  Progress,
  Rate
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;

const GameInfo = ({ user, gameInfo, userGames, setUserGames }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addUserGame = (purchase) => setUserGames([...userGames, purchase]);
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Проверьте данные",
      content: (
          <div style={{fontSize: 16}}>
            <Space direction="vertical" size={10} align="start">
              <div>Название игры: {gameInfo.name}</div>
              <div>Жанр игры: {gameInfo.genre.name}</div>
              <div>Режим игры: {gameInfo.mode}</div>
              <div>Разработчик: {gameInfo.developer}</div>
              <div>Цена: {gameInfo.price} руб.</div>
              <div>Пользователь: {user.userName}</div>
            </Space>
          </div>
      ),
    },
    {
      title: "Оплата покупки",
      content: (
      <Row justify={"center"}>
        <Col>
        <Space direction="horizontal">
        <Progress type="circle" percent={100}></Progress>
        <div style={{fontSize: 20, color: "green", fontWeight: "bold", marginLeft: 20}}>Оплата прошла успешно!</div>
        </Space>
        </Col>
        </Row>),
    },
    {
      title: "Успех",
      content: (
        <div style={{fontSize: 20, color: "green", fontWeight: "bold", textAlign: "center", marginLeft: 40}}>
          <p>Игра куплена!</p>
          <p>Она доступна во вкладке МОИ ИГРЫ. </p>
          <p>Удачной игры!</p>
        </div>
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const backToGames = () => {
    console.log(12345);
    navigate("/games");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrent(0);
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
    setIsModalOpen(false);
    setCurrent(0);
  };

  const purchaseWindow = () => {
    setIsModalOpen(true);
  };

  return (
    <React.Fragment>
      <div className="GameInfo" key={gameInfo.id} id={gameInfo.id}>
        <Button
          style={{ marginTop: 20, marginBottom: 40, fontSize: 18, width: 300, height: 40 }}
          type="primary"
          onClick={backToGames}
        >
          <ArrowLeftOutlined />
          Вернуться к магазину
        </Button>
        <Row>
          <Col span={10}>
            <Row justify={"center"}><Image src={gameInfo.imageLink} preview={false} width={500}/></Row>
            <Row justify={"center"} style={{margin: 20}}>
                      <div style={{ fontSize: 18 }}>
                        Оценка: <Rate disabled value={gameInfo.rating} /> / {gameInfo.numberRatings}
                      </div>
                    </Row>
            <Row justify={"center"} style={{marginTop: 20}}>
              {user.isAuthenticated &&
              !userGames.find((x) => x.gameId === gameInfo.id) ? (
                <>
                  <Button type="primary" style={{width: 500, height: 60, fontSize: 18, fontWeight: "bold"}} onClick={() => purchaseWindow()}>
                    Купить игру
                  </Button>
                </>
              ) : (
                " "
              )}
            </Row>
            <Row justify={"center"} style={{marginTop: 20}}>
            <Button type="primary" style={{width: 500, height: 60, fontSize: 18, fontWeight: "bold"}}>
                    Оценить
                  </Button>
            </Row>
          </Col>
          <Col span={12}>
            {/* 
          rating,
          numberRatings,*/}
            <Row>
              <div style={{ margin: 10, fontSize: 24, fontWeight: "bold" }}>
                {gameInfo.name}
              </div>
            </Row>
            <Row>
              <div style={{ margin: 10, fontSize: 18 }}>
                Жанр игры: {gameInfo.genre.name}
              </div>
            </Row>
            <Row>
              <div style={{ margin: 10, fontSize: 18 }}>
                Режим игры: {gameInfo.mode}
              </div>
            </Row>
            <Row>
              <div style={{ margin: 10, fontSize: 18 }}>
                Дата релиза: {gameInfo.releaseDate}
              </div>
            </Row>
            <Row>
              <div style={{ margin: 10, fontSize: 18 }}>
                Дата регистрация: {gameInfo.registrationDate}
              </div>
            </Row>
            <Row>
              <div style={{ margin: 10, fontSize: 18 }}>
                Разработчик: {gameInfo.developer}
              </div>
            </Row>
            <Row>
              <div style={{ margin: 10, fontSize: 18 }}>
                Цена: {gameInfo.price} руб.
              </div>
            </Row>
            <Row>
              <Collapse
                size="small"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                <Panel header="Описание" style={{ fontSize: 18, width: 750 }}>
                  <div style={{ margin: 10, fontSize: 18 }}>
                    {gameInfo.description}
                  </div>
                </Panel>
              </Collapse>
            </Row>
          </Col>
        </Row>

        <Modal
          onCancel={handleCancel}
          title="Покупка"
          open={isModalOpen}
          footer={null}
          width={800}
        >
          <>
            <Space direction="horizontal">
              <Steps
                style={{ marginRight: 20,}}
                current={current}
                items={items}
                direction="vertical"
              />
              <div> {steps[current].content}</div>
            </Space>
            <div
              style={{
                marginTop: 24,
              }}
            >
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Дальше
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={buyGame()}>
                  Успех
                </Button>
              )}
              {current < steps.length - 1 && current > 0 && (
                <Button
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={() => prev()}
                >
                  Вернуться
                </Button>
              )}
            </div>
          </>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default GameInfo;
