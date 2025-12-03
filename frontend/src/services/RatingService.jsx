import { handleError } from './api.service';
import api from './api.service';

const RatingService = {
  /**
   * Отримати рейтинг користувачів
   * @returns {Promise<Array>} Масив об'єктів з даними користувачів та їх рейтингом
   */
  getUsersRating: async () => {
    try {
      const response = await api.get('api/rating/');
      if (response.status === 200) {
        return response.data;
      }
      throw new Error('Некоректна відповідь від сервера');
    } catch (error) {
      console.error('Помилка при отриманні рейтингу користувачів:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Дані про помилку:', error.response.data);
        console.error('Статус помилки:', error.response.status);
        console.error('Заголовки помилки:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Не отримано відповіді від сервера. Можливо, проблема з мережею або CORS.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Помилка при налаштуванні запиту:', error.message);
      }
      return [];
    }
  },

  /**
   * Отримати рейтинг користувача за його ID
   * @param {number} userId - ID користувача
   * @returns {Promise<Object>} Об'єкт з даними користувача та його рейтингом
   */
  getUserRating: async (userId) => {
    try {
      const response = await api.get(`api/rating/`);
      if (response.status === 200) {
        const userData = response.data.find(user => user.id === parseInt(userId));
        if (userData) {
          return userData;
        }
        throw new Error('Користувача не знайдено');
      }
      throw new Error('Не вдалося отримати дані рейтингу');
    } catch (error) {
      console.error('Помилка при отриманні рейтингу користувача:', error);
      return null;
    }
  },

  /**
   * Оновити рейтинг користувача
   * @param {number} userId - ID користувача
   * @param {number} points - Кількість балів для додавання до рейтингу
   * @returns {Promise<Object>} Оновлений об'єкт з даними користувача
   */
  updateUserRating: async (userId, points) => {
    try {
      const response = await api.post(`api/users/exercise/apply-score/${userId}/`, { score: points });
      if (response.status === 200) {
        return response.data;
      }
      throw new Error('Не вдалося оновити рейтинг');
    } catch (error) {
      console.error('Помилка при оновленні рейтингу:', error);
      return { error: error.message || 'Помилка при оновленні рейтингу' };
    }
  },

  /**
   * Отримати топ N користувачів за рейтингом
   * @param {number} limit - Кількість користувачів у топі (за замовчуванням 10)
   * @returns {Promise<Array>} Масив об'єктів з даними топових користувачів
   */
  getTopUsers: async (limit = 10) => {
    try {
      const response = await api.get('api/rating/');
      if (response.status === 200) {
        // Сортуємо користувачів за рейтингом у спадному порядку та обмежуємо кількість
        return response.data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, limit);
      }
      throw new Error('Не вдалося завантажити топ користувачів');
    } catch (error) {
      console.error('Помилка при отриманні топу користувачів:', error);
      return [];
    }
  },
};

export default RatingService;
