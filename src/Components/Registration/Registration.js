import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Input } from "antd";

const Register = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const Register = async (event) => {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: event.email,
        nickname: event.nickname,
        password: event.password,
        passwordConfirm: event.passwordConfirm,
      }),
    };
    return await fetch("api/account/register", requestOptions)
      .then((response) => {
        // console.log(response.status)
        response.status === 200 &&
          setUser({ isAuthenticated: true, id: "", userName: "", userRole: "" });
        return response.json();
      })
      .then(
        (data) => {
          console.log("Data:", data);
          if (
            typeof data !== "undefined" &&
            typeof data.userName !== "undefined"
          ) {
            setUser({ isAuthenticated: true, id: data.id, userName: data.userName, userRole: data.userRole });
            navigate("/");
          }
          typeof data !== "undefined" &&
            typeof data.error !== "undefined" &&
            setErrorMessages(data.error);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const renderErrorMessage = () =>
    errorMessages.map((error, index) => <div key={index}>{error}</div>);

  return (
    <>
      {user.isAuthenticated ? (
        <h3>Пользователь {user.userName} успешно зарегистрирован!</h3>
      ) : (
        <>
          <h2>Регистрация</h2>
          <Form onFinish={Register}>
            <Form.Item
            label="Почта"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}>
              <Input placeholder="Почта" />
            </Form.Item>
            <Form.Item
            label="Никнейм"
            name="nickname"
            rules={[
              {
                required: true,
              },
            ]}>
              <Input placeholder="Никнейм" />
            </Form.Item>
            <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
              },
            ]}>
              <Input placeholder="Пароль" />
            </Form.Item>
            <Form.Item
            label="Подтверждение пароля"
            name="passwordConfirm"
            rules={[
              {
                required: true,
              },
            ]}>
              <Input placeholder="Подтверждение пароля" />
            </Form.Item>
            <Button htmlType="submit" type="primary">Зарегистрироваться</Button>
          </Form>
          {renderErrorMessage()}
        </>
      )}
    </>
  );
};

export default Register;
