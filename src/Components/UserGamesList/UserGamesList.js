import React, { useEffect } from "react";
import { Col, Row, Image, Card, Space, Button } from "antd";

const UserGamesList = ({ user, userGames, setUserGames }) => {
  useEffect(() => {
    const getUserGames = async () => {
      const requestOptions = {
        method: "GET",
      };
      console.log(user);
      return await fetch(`api/buyingGame/${user.id}`, requestOptions)
        .then((response) => response.json())
        .then(
          (data) => {
            console.log("Data:", data);
            setUserGames(data);
            console.log(userGames);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getUserGames();
  }, [setUserGames]);

  return (
    <React.Fragment>
      <h2 style={{textAlign: "center"}}>Мои игры</h2>
      {userGames.map(({ id, game }) => (
        <Space
          className="Game"
          key={id}
          id={id}
          align="center"
          wrap
          direction="vertical"
        >
          <Card
            hoverable
            size="small"
            style={{
              border: 0,
              padding: 10,
              margin: 10,
              width: 300,
              height: 350,
            }}
          >
            <Row justify={"start"}>
              <Col>
                <Row
                  justify={"center"}
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  <div>{game.name}</div>
                </Row>
                <Row justify={"center"}>
                  <Image
                    src={game.imageLink}
                    width={250}
                    preview={false}
                    style={{ marginBottom: 10 }}
                  />
                </Row>
                <Row
                  justify={"center"}
                  style={{ marginBottom: 10, marginTop: 10 }}
                >
                  <Button type="primary" style={{width: 250, height: 40}}>
                    Играть
                  </Button>
                </Row>
              </Col>
            </Row>
          </Card>
        </Space>
      ))}
    </React.Fragment>
  );
};

export default UserGamesList;
