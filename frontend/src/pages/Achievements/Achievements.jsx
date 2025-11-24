import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Achievements.css';
import { FaTrophy, FaBook, FaStar, FaChartLine, FaCheckCircle } from 'react-icons/fa';

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    const fetchAchievements = async () => {
      try {
        // Replace with actual API endpoint
        // const response = await fetch(`${process.env.REACT_APP_API_URL}achievements/`);
        // const data = await response.json();
        
        // Mock data
        const mockAchievements = [
          { id: 1, title: 'Перший крок', description: 'Завершено перший урок', icon: '🥇', earned: true, date: '2023-11-20' },
          { id: 2, title: 'Мовний ентузіаст', description: 'Завершено 10 уроків', icon: '🎯', earned: true, date: '2023-11-22' },
          { id: 3, title: 'Майстер слів', description: 'Вивчено 100 слів', icon: '📚', earned: false },
          { id: 4, title: 'Серія перемог', description: '5 днів поспіль навчання', icon: '🔥', earned: true, date: '2023-11-24' },
          { id: 5, title: 'Перфекціоніст', description: 'Пройдено тест з 100% результатом', icon: '💯', earned: false },
        ];
        
        setAchievements(mockAchievements);
        setLoading(false);
      } catch (error) {
        console.error('Помилка при завантаженні досягнень:', error);
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const stats = {
    totalLessons: 24,
    completedLessons: 12,
    totalWords: 350,
    learnedWords: 180,
    streakDays: 4,
    totalXP: 1250
  };

  const progressPercentage = Math.round((stats.completedLessons / stats.totalLessons) * 100);
  const wordsPercentage = Math.round((stats.learnedWords / stats.totalWords) * 100);

  if (loading) {
    return (
      <div className="achievements-loading">
        <div className="spinner"></div>
        <p>Завантаження досягнень...</p>
      </div>
    );
  }

  return (
    <div className="achievements-container">
      <header className="achievements-header">
        <h1><FaTrophy className="header-icon" /> Мої досягнення</h1>
        <p>Відстежуйте свій прогрес та досягнення</p>
      </header>

      <section className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon"><FaBook /></div>
          <div className="stat-details">
            <h3>Уроки</h3>
            <p>{stats.completedLessons} / {stats.totalLessons}</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="progress-percent">{progressPercentage}% завершено</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><FaStar /></div>
          <div className="stat-details">
            <h3>Слова</h3>
            <p>{stats.learnedWords} / {stats.totalWords}</p>
            <div className="progress-bar">
              <div 
                className="progress-fill words" 
                style={{ width: `${wordsPercentage}%` }}
              ></div>
            </div>
            <span className="progress-percent">{wordsPercentage}% вивчено</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><FaChartLine /></div>
          <div className="stat-details">
            <h3>Серія занять</h3>
            <p className="streak">{stats.streakDays} днів поспіль</p>
            <p className="xp">Загалом: {stats.totalXP} XP</p>
          </div>
        </div>
      </section>

      <section className="achievements-section">
        <h2>Мої нагороди</h2>
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
            >
              <div className="achievement-icon">
                {achievement.earned ? (
                  <span className="icon">{achievement.icon}</span>
                ) : (
                  <span className="icon">🔒</span>
                )}
              </div>
              <div className="achievement-details">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                {achievement.earned && (
                  <div className="achievement-date">
                    <FaCheckCircle className="check-icon" />
                    <span>Отримано: {achievement.date}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Achievements;