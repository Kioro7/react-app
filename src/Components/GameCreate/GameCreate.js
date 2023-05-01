import React, { useEffect } from "react";
import { Form, Button, Input, Select } from 'antd';
import "./Style.css";
import { genre } from "../../Components/Genre/Genre";

const { Option } = Select

const GameCreate = ({ user, addGame, upGame, setGame }) => {
  // const [nameGame, setName] = useState("");
  // const [developer, setDeveloper] = useState("");
  // const [mode, setMode] = useState("");

  useEffect(() => {
    // setName(upGame.name);
    // setDeveloper(upGame.developer);
    // setMode(upGame.mode);
    console.log(11111);
  }, [upGame]);

  // const CreateOption = () => {
  //   return (
  //     <React.Fragment>
  //       <Select
  //       placeholder="Выберите жанр игры">
  //       {genre.map(({ id, name }) => (
  //         <Option key={id} value={id}>{name}</Option>
  //           // <option key={id} value={id}>
  //           //   {name}
  //           // </option>
  //         ))}
  //       </Select>

  //       {/* <select name="genre">
  //         {genre.map(({ id, name }) => (
  //           <option key={id} value={id}>
  //             {name}
  //           </option>
  //         ))}
  //       </select> */}
  //     </React.Fragment>
  //   );
  // };

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
    console.log(e)
    //e.preventDefault();
    const valueName = e.nameGame;
    const valueDev = e.developer;
    const valueGenre = e.genre;
    const valueMode = e.mode;

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
          <h3>Добавление новой игры / Изменение игры</h3>

          <Form
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
          </Form>
        </>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
export default GameCreate;
