import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const Register = async (event) => {
    event.preventDefault();

    var { email, nickname, password, passwordConfirm } = document.forms[0];
    // console.log(email.value, password.value)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        nickname: nickname.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      }),
    };
    return await fetch("api/account/register", requestOptions)
      .then((response) => {
        // console.log(response.status)
        response.status === 200 &&
          setUser({ isAuthenticated: true, userName: "" });
        return response.json();
      })
      .then(
        (data) => {
          console.log("Data:", data);
          if (
            typeof data !== "undefined" &&
            typeof data.userName !== "undefined"
          ) {
            setUser({ isAuthenticated: true, userName: data.userName });
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
          <h3>Вход</h3>
          <form onSubmit={Register}>
            <label>Почта </label>
            <input type="text" name="email" placeholder="Почта" />
            <br />
            <label>Никнейм </label>
            <input type="text" name="nickname" placeholder="Никнейм" />
            <br />
            <label>Пароль </label>
            <input type="text" name="password" placeholder="Пароль" />
            <br />
            <label>Подтверждение пароля </label>
            <input
              type="text"
              name="passwordConfirm"
              placeholder="Подтверждение пароля"
            />
            <br />
            <button type="submit">Войти</button>
          </form>
          {renderErrorMessage()}
        </>
      )}
    </>
  );
};

export default Register;
