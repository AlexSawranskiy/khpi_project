import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import AuthService from "../../services/Auth.service";

function Sidebar() {
  const isAuthenticated = AuthService.isAuthenticated();
  const userId = AuthService.getUserId();

  return (
    <div className="sidebar">
      <h2>Меню</h2>
      <ul>
        <li>
          <Link to="/">Головна</Link>
        </li>
        <li>
          <Link to="/achievements">Мої досягнення</Link>
        </li>
        <li>
          <Link to="/languages">Курси</Link>
        </li>
        <li>
          <Link to="/rating">Рейтинг</Link>
        </li>
        <li>
          <Link to="/settings">Налаштування</Link>
        </li>

        {isAuthenticated ? (
          <li>
            <Link to={`/profile/${userId}`}>Профіль</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Увійти</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
