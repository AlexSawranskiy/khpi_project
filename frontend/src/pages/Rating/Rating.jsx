import React, { useState } from 'react';
import { FiAward, FiStar, FiTrendingUp, FiSearch } from 'react-icons/fi';
import './Rating.css';

function Rating() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for the rating table
  const users = [
    { id: 1, name: 'Олександр Петренко', score: 1250, level: 'Advanced', progress: 87, avatar: 'AP' },
    { id: 2, name: 'Марія Іваненко', score: 1180, level: 'Advanced', progress: 82, avatar: 'МІ' },
    { id: 3, name: 'Іван Сидоренко', score: 1100, level: 'Intermediate', progress: 75, avatar: 'ІС' },
    { id: 4, name: 'Анна Коваленко', score: 980, level: 'Intermediate', progress: 68, avatar: 'АК' },
    { id: 5, name: 'Петро Мельник', score: 850, level: 'Intermediate', progress: 59, avatar: 'ПМ' },
    { id: 6, name: 'Наталія Шевченко', score: 720, level: 'Beginner', progress: 45, avatar: 'НШ' },
    { id: 7, name: 'Віктор Бондаренко', score: 650, level: 'Beginner', progress: 38, avatar: 'ВБ' },
    { id: 8, name: 'Юлія Ковальчук', score: 590, level: 'Beginner', progress: 32, avatar: 'ЮК' },
  ];

  const filteredUsers = users
    .filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.level.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.score - a.score);

  const getMedalColor = (position) => {
    switch(position) {
      case 1: return '#FFD700';
      case 2: return '#C0C0C0';
      case 3: return '#CD7F32';
      default: return '#3db0ff';
    }
  };

  return (
    <div className="rating-container">
      <div className="rating-header">
        <div className="rating-title">
          <FiAward size={28} className="rating-icon" />
          <h1>Рейтинг користувачів</h1>
        </div>
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Пошук за ім'ям або рівнем..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="rating-tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Увесь рейтинг
        </button>
        <button 
          className={`tab ${activeTab === 'week' ? 'active' : ''}`}
          onClick={() => setActiveTab('week')}
        >
          За тиждень
        </button>
        <button 
          className={`tab ${activeTab === 'month' ? 'active' : ''}`}
          onClick={() => setActiveTab('month')}
        >
          За місяць
        </button>
      </div>

      <div className="rating-table-container">
        <table className="rating-table">
          <thead>
            <tr>
              <th>Місце</th>
              <th>Користувач</th>
              <th>Рівень</th>
              <th>Бали</th>
              <th>Прогрес</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className={index < 3 ? 'top-user' : ''}>
                <td>
                  <div 
                    className="position" 
                    style={{ backgroundColor: getMedalColor(index + 1) }}
                  >
                    {index < 3 ? <FiStar size={16} /> : index + 1}
                  </div>
                </td>
                <td className="user-info">
                  <div className="user-avatar">{user.avatar}</div>
                  <span>{user.name}</span>
                </td>
                <td>
                  <span className={`level-badge ${user.level.toLowerCase()}`}>
                    {user.level}
                  </span>
                </td>
                <td className="score">{user.score}</td>
                <td>
                  <div className="progress-container">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${user.progress}%` }}
                    ></div>
                    <span className="progress-text">{user.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="user-stats">
        <div className="stat-card">
          <FiTrendingUp size={24} className="stat-icon" />
          <div>
            <h3>Ваше місце</h3>
            <p className="stat-value">#4</p>
          </div>
        </div>
        <div className="stat-card">
          <FiAward size={24} className="stat-icon" />
          <div>
            <h3>Ваш рейтинг</h3>
            <p className="stat-value">1,180</p>
          </div>
        </div>
        <div className="stat-card">
          <FiStar size={24} className="stat-icon" />
          <div>
            <h3>Ваш рівень</h3>
            <p className="stat-value">Advanced</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rating;