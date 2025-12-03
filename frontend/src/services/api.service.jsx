import axios from 'axios';
import { ERROR_MESSAGES } from '../constants/errorMessages';

const API_URL = process.env.REACT_APP_API_URL;

// Створюємо екземпляр axios з базовим URL та заголовками
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Додаємо інтерцептор для додавання токену до кожного запиту
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Обробка помилок
export const handleError = (error, customMessage = null) => {
  if (error.response) {
    // Запит був зроблений, але сервер відповів з кодом помилки
    console.error('Помилка відповіді:', error.response.data);
    console.error('Статус відповіді:', error.response.status);
    console.error('Заголовки відповіді:', error.response.headers);
    
    // Обробка різних HTTP статусів
    let errorMessage = customMessage || error.response.data.detail || ERROR_MESSAGES.SERVER_ERROR;
    
    switch (error.response.status) {
      case 400:
        errorMessage = error.response.data.detail || ERROR_MESSAGES.VALIDATION_ERROR;
        break;
      case 401:
        errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
        // Можна додати автоматичний вихід з системи
        if (localStorage.getItem('access')) {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          // Перенаправлення на сторінку входу
          window.location.href = '/login';
        }
        break;
      case 403:
        errorMessage = ERROR_MESSAGES.FORBIDDEN;
        break;
      case 404:
        errorMessage = ERROR_MESSAGES.RESOURCE_NOT_FOUND;
        break;
      case 500:
        errorMessage = ERROR_MESSAGES.SERVER_ERROR;
        break;
      default:
        errorMessage = error.response.data.detail || ERROR_MESSAGES.UNKNOWN_ERROR;
    }
    
    return Promise.reject({
      message: errorMessage,
      status: error.response.status,
      data: error.response.data,
    });
  } else if (error.request) {
    // Запит був зроблений, але не було отримано відповіді
    console.error('Не вдалося отримати відповідь від сервера:', error.request);
    return Promise.reject({
      message: ERROR_MESSAGES.NETWORK_ERROR,
    });
  } else {
    // Сталася помилка під час налаштування запиту
    console.error('Помилка при налаштуванні запиту:', error.message);
    return Promise.reject({
      message: ERROR_MESSAGES.UNKNOWN_ERROR,
      details: error.message,
    });
  }
};

// Функції для роботи з курсами
export const CourseService = {
  // Отримати список всіх курсів
  getAllCourses: async () => {
    try {
      const response = await api.get('courses/list/');
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Отримати деталі курсу за ID
  getCourseById: async (courseId) => {
    try {
      const response = await api.get(`courses/${courseId}/`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

// Функції для роботи з уроками
export const LessonService = {
  // Отримати всі уроки для курсу
  getLessonsByCourse: async (courseId) => {
    try {
      const response = await api.get(`courses/${courseId}/`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Позначити урок як завершений
  markLessonAsCompleted: async (lessonId) => {
    try {
      const response = await api.post(`courses/lesson/${lessonId}/complete/`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

// Функції для роботи з вправами
export const ExerciseService = {
  // Отримати всі вправи для уроку
  getExercisesByLesson: async (lessonId) => {
    try {
      const response = await api.get(`courses/${lessonId}/exercises/`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Отримати завдання для вправи
  getTasksByExercise: async (exerciseId) => {
    try {
      const response = await api.get(`courses/tasks/${exerciseId}/`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Позначити вправу як завершену
  markExerciseAsCompleted: async (exerciseId) => {
    try {
      const response = await api.post(`courses/exercise/${exerciseId}/complete/`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

// Функції для роботи з завданнями
export const TaskService = {
  // Отримати завдання за ID
  getTaskById: async (taskId) => {
    try {
      const response = await api.get(`courses/task/${taskId}/`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Відправити відповідь на завдання
  submitTaskAnswer: async (taskId, answer) => {
    try {
      const response = await api.post(`courses/task/${taskId}/submit/`, { answer });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

// Функції для роботи з профілем користувача
export const UserService = {
  // Отримати профіль користувача
  getUserProfile: async (userId) => {
    try {
      const response = await api.get(`api/profile/${userId}/`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Оновити профіль користувача
  updateUserProfile: async (userId, userData) => {
    try {
      const response = await api.put(`api/profile/${userId}/`, userData);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Отримати рейтинг користувачів
  getUsersRating: async () => {
    try {
      const response = await api.get('api/rating/');
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

// Функції для роботи з досягненнями
export const AchievementService = {
  // Отримати всі досягнення користувача
  getUserAchievements: async (userId) => {
    try {
      const response = await api.get(`api/achievements/${userId}/`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Отримати всі доступні досягнення
  getAllAchievements: async () => {
    try {
      const response = await api.get('api/achievements/');
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

export default api;
