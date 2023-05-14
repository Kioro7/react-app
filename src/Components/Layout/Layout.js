import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Layout as LayoutAntd, Menu } from "antd";
import SubMenu from "antd/es/menu/SubMenu";

const { Header, Content, Footer } = LayoutAntd;

const Layout = ({ user }) => {
  return (
    <LayoutAntd>
      <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
        <div
          style={{
            float: "right",
            color: "rgba(255, 255, 255, 0.65)",
          }}
        >
          {user.isAuthenticated ? (
            <>
              <strong>{user.userName}</strong>
            </>
          ) : (
            <>
              <strong>Гость</strong>
            </>
          )}
        </div>
        <Menu theme="dark" mode="horizontal" className="menu">
          <Menu.Item key="1">
            <Link to={"/"}>Главная</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={"/games"}>Магазин игр</Link>
          </Menu.Item>
          {user.isAuthenticated ? (
            <Menu.Item key="3">
              <Link to={"/myGames"}>Мои игры</Link>
            </Menu.Item>
          ) : (
            ""
          )}
          <SubMenu title="Аккаунт" key="4">
            {user.isAuthenticated ? (
              <Menu.Item key="5">
                <Link to={"/logoff"}>Выход</Link>
              </Menu.Item>
            ) : (
              <>
                <Menu.Item key="6">
                  <Link to={"/register"}>Регистрация</Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to={"/login"}>Вход</Link>
                </Menu.Item>
              </>
            )}
          </SubMenu>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: "0 50px" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>GamingPlatform ©2023</Footer>
    </LayoutAntd>
  );
};
export default Layout;
