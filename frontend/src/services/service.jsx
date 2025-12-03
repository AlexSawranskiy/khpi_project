// Імпортуємо всі сервіси з api.service.jsx
import {
  CourseService,
  LessonService,
  ExerciseService,
  TaskService,
  UserService,
  AchievementService
} from './api.service';

// Експортуємо всі сервіси для зручного імпорту
const service = {
  ...CourseService,
  ...LessonService,
  ...ExerciseService,
  ...TaskService,
  ...UserService,
  ...AchievementService,
};

export default service;