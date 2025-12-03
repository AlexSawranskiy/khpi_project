import React, { useState, useEffect } from 'react';
import RatingService from '../../services/RatingService';
import { ERROR_MESSAGES, INFO_MESSAGES } from '../../constants/errorMessages';
import { useLanguage } from '../../contexts/LanguageContext';
import './RatingTable.css';

const RatingTable = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchRating = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await RatingService.getUsersRating();
        
        if (!Array.isArray(data)) {
          throw new Error('Отримано некоректні дані з сервера');
        }
        
        if (data.length === 0) {
          setUsers([]);
          setTotalPages(1);
          return;
        }
        
        // Сортуємо користувачів за рейтингом у спадному порядку
        const sortedUsers = [...data].sort((a, b) => b.rating - a.rating);
        
        // Додаємо позицію в рейтингу та позначаємо поточного користувача
        const currentUserId = localStorage.getItem('userId');
        const usersWithPosition = sortedUsers.map((user, index) => ({
          ...user,
          position: index + 1,
          isCurrentUser: user.id.toString() === currentUserId
        }));
        
        setUsers(usersWithPosition);
        setTotalPages(Math.ceil(usersWithPosition.length / itemsPerPage));
        
      } catch (err) {
        console.error('Помилка при завантаженні рейтингу:', err);
        setError(err.message || ERROR_MESSAGES.RATING_LOAD_ERROR);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, []);

  // Фільтруємо користувачів за пошуковим запитом
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Обчислюємо загальну кількість сторінок після фільтрації
  const totalFilteredPages = Math.ceil(filteredUsers.length / itemsPerPage);
  
  // Отримуємо користувачів для поточної сторінки
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Змінюємо поточну сторінку
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="rating-loading" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        minHeight: '200px'
      }}>
        <div className="spinner" style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid var(--accent-color, #3498db)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '1rem'
        }}></div>
        <p style={{ color: 'var(--text-secondary, #666)' }}>{t('common.loading')} {t('rating.title')}...</p>
        <style>{
          `@keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }`
        }</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rating-error" style={{
        padding: '2rem',
        textAlign: 'center',
        color: '#e74c3c',
        backgroundColor: '#fde8e8',
        borderRadius: '8px',
        margin: '1rem 0',
        border: '1px solid #f5c6cb'
      }}>
        <p style={{ marginBottom: '1rem' }}>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: 'var(--accent-color, #3498db)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'background-color 0.2s',
            ':hover': {
              backgroundColor: '#2980b9'
            }
          }}
        >
          {t('common.tryAgain')}
        </button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="no-data">
        <p>{INFO_MESSAGES.NO_RATING_DATA}</p>
      </div>
    );
  }

  return (
    <div className="rating-container">
      <div className="rating-header">
        <h2>{t('rating.title')}</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder={t('rating.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Скидаємо на першу сторінку при пошуку
            }}
            className="search-input"
          />
        </div>
      </div>
      
      <div className="table-responsive">
        <table className="rating-table">
          <thead>
            <tr>
              <th>#</th>
              <th>{t('rating.columns.user')}</th>
              <th>{t('rating.columns.rating')}</th>
              <th>{t('rating.columns.level')}</th>
              <th>{t('rating.columns.progress')}</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id} className={user.isCurrentUser ? 'current-user' : ''}>
                  <td>{user.position}</td>
                  <td className="user-info">
                    <div className="user-avatar">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.username} />
                      ) : (
                        <div className="avatar-placeholder">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="user-details">
                      <span className="username">{user.username}</span>
                      {user.email && <span className="email">{user.email}</span>}
                    </div>
                  </td>
                  <td className="rating-value">{user.rating} балів</td>
                  <td>{user.level || 'Beginner'}</td>
                  <td className="achievements">
                    {user.achievements && user.achievements.length > 0 ? (
                      <div className="achievement-badges">
                        {user.achievements.slice(0, 3).map((achievement) => (
                          <span key={achievement.id} className="badge" title={achievement.description}>
                            {achievement.name}
                          </span>
                        ))}
                        {user.achievements.length > 3 && (
                          <span className="badge more" title="Ще досягнення">
                            +{user.achievements.length - 3}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="no-achievements">Ще немає досягнень</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-results">
                  {t('common.noResults')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalFilteredPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className="pagination-button"
            title={t('pagination.firstPage')}
          >
            &laquo;
          </button>
          
          {Array.from({ length: Math.min(5, totalFilteredPages) }, (_, i) => {
            // Відображаємо до 5 кнопок пагінації, поточна сторінка в середині
            let pageNum;
            if (totalFilteredPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalFilteredPages - 2) {
              pageNum = totalFilteredPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => paginate(pageNum)}
                className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => paginate(totalFilteredPages)}
            disabled={currentPage === totalFilteredPages}
            className="pagination-button"
            title={t('pagination.lastPage')}
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default RatingTable;
