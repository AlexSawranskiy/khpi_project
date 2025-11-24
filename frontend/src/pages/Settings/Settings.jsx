import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMoon, FiSun, FiBell, FiGlobe, FiLock, FiLogOut } from 'react-icons/fi';
import './Settings.css';

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('ukrainian');
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Налаштування</h1>
      </div>
      
      <div className="settings-section">
        <div className="settings-item">
          <div className="settings-item-icon">
            <FiUser size={20} />
          </div>
          <div className="settings-item-content">
            <h3>Профіль</h3>
            <p>Змінити інформацію про профіль</p>
          </div>
        </div>
        
        <div className="settings-item">
          <div className="settings-item-icon">
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </div>
          <div className="settings-item-content">
            <h3>Темна тема</h3>
            <p>Увімкнути темний режим</p>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={() => setDarkMode(!darkMode)} 
            />
            <span className="slider round"></span>
          </label>
        </div>
        
        <div className="settings-item">
          <div className="settings-item-icon">
            <FiGlobe size={20} />
          </div>
          <div className="settings-item-content">
            <h3>Мова</h3>
            <p>Оберіть мову інтерфейсу</p>
          </div>
          <select 
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="ukrainian">Українська</option>
            <option value="english">English</option>
          </select>
        </div>
        
        <div className="settings-item">
          <div className="settings-item-icon">
            <FiBell size={20} />
          </div>
          <div className="settings-item-content">
            <h3>Сповіщення</h3>
            <p>Керування сповіщеннями</p>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={notifications} 
              onChange={() => setNotifications(!notifications)} 
            />
            <span className="slider round"></span>
          </label>
        </div>
        
        <div className="settings-item">
          <div className="settings-item-icon">
            <FiLock size={20} />
          </div>
          <div className="settings-item-content">
            <h3>Безпека</h3>
            <p>Змінити пароль та налаштування безпеки</p>
          </div>
        </div>
        
        <div className="settings-item" onClick={handleLogout}>
          <div className="settings-item-icon">
            <FiLogOut size={20} />
          </div>
          <div className="settings-item-content">
            <h3>Вийти</h3>
            <p>Вийти з облікового запису</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;