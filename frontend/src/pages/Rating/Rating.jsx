import React, { useState, useEffect } from 'react';
import { FiAward, FiStar } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';
import RatingTable from '../../components/Rating/RatingTable';
import { ERROR_MESSAGES, INFO_MESSAGES } from '../../constants/errorMessages';
import './Rating.css';

function Rating() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('all');

  // Additional logic for time range filtering will be added when the backend is ready
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // API call to get rating data for the selected period will be added here
    // For example: fetchRatingData(range);
  };

  return (
    <div className="rating-page">
      <div className="rating-header">
        <div className="rating-title">
          <FiAward size={28} className="rating-icon" />
          <h1>{t('rating.title')}</h1>
        </div>
        
        <div className="time-range-tabs">
          <button 
            className={`time-tab ${timeRange === 'all' ? 'active' : ''}`}
            onClick={() => handleTimeRangeChange('all')}
          >
            {t('rating.timeRanges.all')}
          </button>
          <button 
            className={`time-tab ${timeRange === 'month' ? 'active' : ''}`}
            onClick={() => handleTimeRangeChange('month')}
          >
            {t('rating.timeRanges.month')}
          </button>
          <button 
            className={`time-tab ${timeRange === 'week' ? 'active' : ''}`}
            onClick={() => handleTimeRangeChange('week')}
          >
            {t('rating.timeRanges.week')}
          </button>
        </div>
      </div>
      
      <div className="rating-content">
        <RatingTable />
      </div>
    </div>
  );
}

export default Rating;