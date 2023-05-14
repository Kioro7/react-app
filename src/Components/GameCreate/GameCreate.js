import React, { useEffect, useState } from "react";
import { Form, Button, Input, Select, Modal, Space } from "antd";
import "./Style.css";

const { Option } = Select;

const GameCreate = ({ user, addGame, upGame, setUpGame, games, setGames, genres }) => {
  // const [nameGame, setName] = useState("");
  // const [developer, setDeveloper] = useState("");
  // const [mode, setMode] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(JSON.stringify(upGame));
    if (JSON.stringify(upGame) !== "{}") {
      setIsModalOpen(true);
      updateGame();
    }
    // setName(upGame.name);
    // setDeveloper(upGame.developer);
    // setMode(upGame.mode);
    console.log(11111);
  }, [upGame]);

  const showModal = () => {
    form.setFieldsValue({
      nameGame: "",
      developer: "",
      mode: "",
      genre: "",
    });
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setUpGame({});
  };

  const updateGame = () => {
    form.setFieldsValue({
      nameGame: upGame.name,
      developer: upGame.developer,
      mode: upGame.mode,
      genre: upGame.genreId,
    });
  };

  const gameUpdate = async (e) => {
    console.log(form.getFieldsValue());

    e = form.getFieldValue();

    const valueName = e.nameGame;
    const valueDev = e.developer;
    const valueMode = e.mode;
    const valueGenre = e.genre;

    const game = {
      name: valueName,
      developer: valueDev,
      mode: valueMode,
      genreId: valueGenre,
    };

    console.log(game);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(game),
    };

    return await fetch(`api/games/${upGame.id}`, requestOptions)
    .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setGames(games.map(x => x.id !== data.id ? x : data));
        setUpGame({});
          handleOk();
          e.nameGame = "";
          e.developer = "";
          e.mode = "";
      });
  };

  const handleSubmit = (e) => {
    console.log(e);
    //e.preventDefault();
    const valueName = e.nameGame;
    const valueDev = e.developer;
    const valueGenre = e.genre;
    const valueMode = e.mode;

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
            e.nameGame = "";
            e.developer = "";
            e.mode = "";
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
          <h3>Добавление новой игры</h3>

          {/* <Form
          style={{
            maxWidth: 500,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}>
            <Form.Item
            label="Название: "
            name="nameGame"
            rules={[
              {
                required: true,
              },
            ]}>
              <Input
              placeholder="Название"/>
            </Form.Item>

            <Form.Item
            label="Жанр игры: "
            name="genre"
            rules={[
              {
                required: false,
              },
            ]}>
              <Select
              placeholder="Выберите жанр игры">
              {genre.map(({ id, name }) => (
              <Option key={id} value={id}>{name}</Option>
              ))}
              </Select>
            </Form.Item>

            <Form.Item
            label="Режим игры: "
            name="mode"
            rules={[
              {
                required: true,
              },
            ]}>
              <Input
              placeholder="Режим игры"/>
            </Form.Item>

            <Form.Item
            label="Разработчик игры: "
            name="developer"
            rules={[
              {
                required: true,
              },
            ]}>
              <Input
              placeholder="Разработчик игры"/>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Добавить игру
            </Button>
            <Button type="primary" htmlType="button" onClick={(e) => gameUpdate(e)}>
              Изменить игру
            </Button>
          </Form> */}

          <Button type="primary" htmlType="button" onClick={showModal}>
            Добавить новую игру
          </Button>

          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              style={{
                maxWidth: 500,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={handleSubmit}
              form={form}
            >
              <Form.Item
                label="Название: "
                name="nameGame"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Название" />
              </Form.Item>

              <Form.Item
                label="Жанр игры: "
                name="genre"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Select placeholder="Выберите жанр игры">
                  {genres.map(({ id, name }) => (
                    <Option key={id} value={id}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Режим игры: "
                name="mode"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Режим игры" />
              </Form.Item>

              <Form.Item
                label="Разработчик игры: "
                name="developer"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Разработчик игры" />
              </Form.Item>
              <Space>
                {JSON.stringify(upGame) === "{}" ? (
                <Button type="primary" htmlType="submit">
                  Добавить игру
                </Button>
                ) :
                (<Button type="primary" htmlType="button" onClick={gameUpdate}>
                  Изменить игру
                </Button>) }
              </Space>
            </Form>
          </Modal>
        </>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
export default GameCreate;
