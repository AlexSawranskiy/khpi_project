import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Меню</h2>
      <ul>
        <li>
          <Link to="/">Головна</Link>
        </li>
        <li>
          <Link to="/home">Мої досягнення</Link>
        </li>
        <li>
          <Link to="/home">Оцінки</Link>
        </li>
        <li>
          <Link to="/home">Рівень знань</Link>
        </li>
        <li>
          <Link to="/home">Налаштування</Link>
        </li>
        <li>
          <Link to="/login">Вихід</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;