import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = ({ user }) => {
  return (
    <>
      <div>
        {user.isAuthenticated ? (
          <h4>Пользователь: {user.userName}</h4>
        ) : (
          <h4>Пользователь: Гость</h4>
        )}
      </div>
      <nav>
        <Link to="/">Главная</Link> <span />
        <Link to="/games">Список игр</Link> <span />
        <Link to="/register">Регистрация</Link> <span />
        <Link to="/login">Вход</Link> <span />
        <Link to="/logoff">Выход</Link>
      </nav>
      <Outlet />
    </>
  );
};
export default Layout;
