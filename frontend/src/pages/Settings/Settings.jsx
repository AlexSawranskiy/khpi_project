import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMoon, FiSun, FiBell, FiGlobe, FiLock, FiLogOut } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import './Settings.css';

function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>{t('settings.title')}</h1>
      </div>
      
      <div className="settings-section">
        <div className="settings-item">
          <div className="settings-item-icon">
            <FiUser size={20} />
          </div>
          <div className="settings-item-content">
            <h3>{t('settings.profile.title')}</h3>
            <p>{t('settings.profile.description')}</p>
          </div>
        </div>
        
        <div className="settings-item">
          <div className="settings-item-icon">
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </div>
          <div className="settings-item-content">
            <h3>{t('settings.theme.title')}</h3>
            <p>{t('settings.theme.description')}</p>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <span className="slider round"></span>
          </label>
        </div>
        
        <div className="settings-item">
          <div className="settings-item-icon">
            <FiGlobe size={20} />
          </div>
          <div className="settings-item-content">
            <h3>{t('settings.language.title')}</h3>
            <p>{t('settings.language.description')}</p>
          </div>
          <select 
            className="language-select"
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="ukrainian">{t('settings.language.ukrainian')}</option>
            <option value="english">{t('settings.language.english')}</option>
          </select>
        </div>
        
        <div className="settings-item">
          <div className="settings-item-icon">
            <FiBell size={20} />
          </div>
          <div className="settings-item-content">
            <h3>{t('settings.notifications.title')}</h3>
            <p>{t('settings.notifications.description')}</p>
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
            <h3>{t('settings.security.title')}</h3>
            <p>{t('settings.security.description')}</p>
          </div>
        </div>
        
        <div className="settings-item" onClick={handleLogout}>
          <div className="settings-item-icon">
            <FiLogOut size={20} />
          </div>
          <div className="settings-item-content">
            <h3>{t('settings.logout')}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;