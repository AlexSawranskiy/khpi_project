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
      return response.data;
    } catch (error) {
      return handleError(error, 'Не вдалося завантажити рейтинг користувачів');
    }
  },

  /**
   * Отримати рейтинг користувача за його ID
   * @param {number} userId - ID користувача
   * @returns {Promise<Object>} Об'єкт з даними користувача та його рейтингом
   */
  getUserRating: async (userId) => {
    try {
      const response = await api.get(`api/rating/${userId}/`);
      return response.data;
    } catch (error) {
      return handleError(error, 'Не вдалося завантажити рейтинг користувача');
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
      const response = await api.post(`api/rating/${userId}/update/`, { points });
      return response.data;
    } catch (error) {
      return handleError(error, 'Не вдалося оновити рейтинг користувача');
    }
  },

  /**
   * Отримати топ N користувачів за рейтингом
   * @param {number} limit - Кількість користувачів у топі (за замовчуванням 10)
   * @returns {Promise<Array>} Масив об'єктів з даними топових користувачів
   */
  getTopUsers: async (limit = 10) => {
    try {
      const response = await api.get(`api/rating/top/?limit=${limit}`);
      return response.data;
    } catch (error) {
      return handleError(error, 'Не вдалося завантажити топ користувачів');
    }
  },
};

export default RatingService;
