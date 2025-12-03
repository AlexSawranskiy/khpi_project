import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Progress.css';

function Progress() {
  const { t } = useLanguage();
  
  return (
    <div className="progress-container">
      <h1>{t('progress.title')}</h1>
      <div className="progress-content">
        <p>{t('progress.description')}</p>
        <div className="progress-stats">
          <div className="stat-item">
            <h3>{t('progress.completedLessons')}</h3>
            <p className="stat-value">12</p>
          </div>
          <div className="stat-item">
            <h3>{t('progress.wordsLearned')}</h3>
            <p className="stat-value">156</p>
          </div>
          <div className="stat-item">
            <h3>{t('progress.streak')}</h3>
            <p className="stat-value">5 {t('common.days')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;