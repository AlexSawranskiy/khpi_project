import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import './Achievements.css';
import { FaTrophy, FaBook, FaStar, FaChartLine, FaCheckCircle } from 'react-icons/fa';

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

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
          { id: 1, title: t('achievements.firstStep'), description: t('achievements.firstStepDesc'), icon: '🥇', earned: true, date: '2023-11-20' },
          { id: 2, title: t('achievements.languageEnthusiast'), description: t('achievements.languageEnthusiastDesc'), icon: '🎯', earned: true, date: '2023-11-22' },
          { id: 3, title: t('achievements.wordMaster'), description: t('achievements.wordMasterDesc'), icon: '📚', earned: false },
          { id: 4, title: t('achievements.winningStreak'), description: t('achievements.winningStreakDesc'), icon: '🔥', earned: true, date: '2023-11-24' },
          { id: 5, title: t('achievements.perfectionist'), description: t('achievements.perfectionistDesc'), icon: '💯', earned: false },
        ];
        
        setAchievements(mockAchievements);
        setLoading(false);
      } catch (error) {
        console.error(t('achievements.loadError'), error);
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
        <p>{t('achievements.loading')}</p>
      </div>
    );
  }

  return (
    <div className="achievements-container">
      <header className="achievements-header">
        <h1><FaTrophy className="header-icon" /> {t('achievements.title')}</h1>
        <p>{t('achievements.subtitle')}</p>
      </header>

      <section className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon"><FaBook /></div>
          <div className="stat-details">
            <h3>{t('achievements.lessons')}</h3>
            <p>{stats.completedLessons} / {stats.totalLessons}</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="progress-percent">{progressPercentage}% {t('achievements.completed')}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><FaStar /></div>
          <div className="stat-details">
            <h3>{t('achievements.words')}</h3>
            <p>{stats.learnedWords} / {stats.totalWords}</p>
            <div className="progress-bar">
              <div 
                className="progress-fill words" 
                style={{ width: `${wordsPercentage}%` }}
              ></div>
            </div>
            <span className="progress-percent">{wordsPercentage}% {t('achievements.learned')}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><FaChartLine /></div>
          <div className="stat-details">
            <h3>{t('achievements.streak')}</h3>
            <p className="streak-days">{stats.streakDays} {t('achievements.days')} {t('achievements.inARow')}</p>
            <p className="xp">{t('achievements.totalXP', { xp: stats.totalXP })}</p>
          </div>
        </div>
      </section>

      <section className="achievements-section">
        <h2>{t('achievements.myAchievements')}</h2>
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
            >
              <div className="achievement-icon">
                {achievement.earned ? (
                  <span role="img" aria-label="Achievement">{achievement.icon}</span>
                ) : (
                  <span className="locked-icon">🔒</span>
                )}
              </div>
              <div className="achievement-details">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                {achievement.earned && (
                  <div className="achievement-date">
                    <FaCheckCircle className="check-icon" />
                    <span>{t('achievements.earnedOn')} {new Date(achievement.date).toLocaleDateString()}</span>
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