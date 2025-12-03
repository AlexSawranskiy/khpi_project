export default {
  // Sidebar translations
  sidebar: {
    menu: 'Меню',
    home: 'Головна',
    achievements: 'Досягнення',
    rating: 'Рейтинг',
    courses: 'Курси',
    settings: 'Налаштування',
    profile: 'Профіль'
  },
  
  // Language translations
  language: {
    ukrainian: 'Українська',
    english: 'Англійська',
    selectLanguage: 'Оберіть мову'
  },
  
  // Settings translations
  settings: {
    title: 'Налаштування',
    profile: {
      title: 'Профіль',
      description: 'Змінити інформацію про профіль'
    },
    theme: {
      title: 'Темна тема',
      description: 'Увімкнути темний режим'
    },
    language: {
      title: 'Мова',
      description: 'Оберіть мову інтерфейсу',
      ukrainian: 'Українська',
      english: 'Англійська'
    },
    notifications: {
      title: 'Сповіщення',
      description: 'Керування сповіщеннями'
    },
    security: {
      title: 'Безпека',
      description: 'Змінити пароль та налаштування безпеки'
    },
    logout: 'Вийти'
  },
  
  // Login translations
  login: {
    title: 'Вхід',
    username: 'Ім\'я користувача',
    password: 'Пароль',
    forgotPassword: 'Забули пароль?',
    loginButton: 'Увійти',
    noAccount: 'Немає облікового запису?',
    register: 'Зареєструватися'
  },
  
  // Common UI elements
  common: {
    loading: 'Завантаження...',
    save: 'Зберегти',
    cancel: 'Скасувати',
    edit: 'Редагувати',
    delete: 'Видалити',
    confirm: 'Підтвердити',
    back: 'Назад',
    next: 'Далі',
    previous: 'Назад',
    search: 'Пошук',
    noResults: 'Нічого не знайдено',
    tryAgain: 'Спробувати знову',
    error: 'Сталася помилка',
    success: 'Успішно',
    warning: 'Попередження',
    info: 'Інформація',
    days: 'днів'
  },
  
  // Home page
  home: {
    title: 'Головна',
    welcome: 'Вітаємо на головній сторінці!',
    description1: 'Ви увійшли до системи вивчення іноземних мов — простору, де навчання стає цікавим, а результати легко відстежувати. Тут ви можете переглядати свої оцінки, аналізувати досягнення та стежити за власним рівнем володіння мовою.',
    description2: 'У розділі «Мої досягнення» ви знайдете пройдені теми, виконані завдання та нагороди за успішні результати. Сторінка «Оцінки» дозволяє бачити детальний прогрес, а «Рівень знань» — допоможе оцінити, наскільки ви наблизились до своєї мети.',
    description3: 'Налаштуйте свій профіль у розділі «Налаштування», щоб зробити навчання ще комфортнішим. Ми раді вітати вас у нашій спільноті та бажаємо успіхів на шляху до вивчення іноземних мов!'
  },
  
  // Achievements page
  achievements: {
    title: 'Мої досягнення',
    subtitle: 'Відстежуйте свій прогрес та досягнення',
    loading: 'Завантаження досягнень...',
    loadError: 'Помилка завантаження досягнень',
    
    // Stats section
    lessons: 'Уроки',
    words: 'Слова',
    streak: 'Серія занять',
    days: 'днів',
    inARow: 'поспіль',
    completed: 'завершено',
    learned: 'вивчено',
    totalXP: 'Всього: {xp} XP',
    
    // Achievements section
    myAchievements: 'Ваші нагороди',
    earnedOn: 'Отримано',
    
    // Achievement titles and descriptions
    firstStep: 'Перший крок',
    firstStepDesc: 'Завершено перший урок',
    languageEnthusiast: 'Мовний ентузіаст',
    languageEnthusiastDesc: 'Завершено 10 уроків',
    wordMaster: 'Майстер слів',
    wordMasterDesc: 'Вивчено 100 слів',
    winningStreak: 'Серія перемог',
    winningStreakDesc: '5 днів поспіль навчання',
    perfectionist: 'Перфекціоніст',
    perfectionistDesc: 'Пройдено тест з 100% результатом'
  },
  
  // Progress page
  progress: {
    title: 'Ваш навчальний прогрес',
    description: 'Відстежуйте свій навчальний шлях і подивіться, як далеко ви просунулися!',
    completedLessons: 'Завершено уроків',
    wordsLearned: 'Слів вивчено',
    streak: 'Поточна серія',
    timeSpent: 'Витрачений час',
    achievements: 'Розблоковані досягнення',
    level: 'Поточний рівень',
    nextLevel: 'Наступний рівень',
    progressToNextLevel: 'Прогрес до наступного рівня',
    recentActivity: 'Нещодавня активність',
    noRecentActivity: 'Немає нещодавньої активності',
    startLearning: 'Почніть навчання, щоб побачити свій прогрес!'
  },

  // Rating page
  rating: {
    title: 'Рейтинг користувачів',
    updateMessage: 'Рейтинг оновлюється щогодини. Виконайте більше завдань, щоб піднятися в рейтингу!',
    yourLevel: 'Ваш рівень',
    searchPlaceholder: 'Пошук за ім\'ям або поштою...',
    columns: {
      user: 'Користувач',
      rating: 'Рейтинг',
      level: 'Рівень',
      progress: 'Прогрес'
    },
    timeRanges: {
      all: 'Весь час',
      month: 'За місяць',
      week: 'За тиждень'
    },
    levels: {
      beginner: 'Початківець',
      intermediate: 'Середній рівень',
      advanced: 'Просунутий',
      expert: 'Експерт',
      master: 'Майстер'
    }
  },
  
  // Pagination
  pagination: {
    firstPage: 'Перша сторінка',
    previous: 'Попередня',
    next: 'Наступна',
    lastPage: 'Остання сторінка',
    pageOf: 'Сторінка {current} з {total}'
  },

  // Profile page
  profile: {
    title: 'Профіль користувача',
    username: "Ім'я користувача",
    email: 'Електронна пошта',
    registrationDate: 'Дата реєстрації',
    rating: 'Рейтинг',
    userNotFound: 'Користувача не знайдено',
    loadError: 'Помилка завантаження профілю'
  },
  
  // Navigation
  navigation: {
    home: 'Головна',
    about: 'Про нас',
    contact: 'Контакти',
    dashboard: 'Панель керування',
    profile: 'Профіль',
    settings: 'Налаштування',
    logout: 'Вийти'
  },
  
  // Error messages
  errors: {
    required: 'Це поле обов\'язкове',
    invalidEmail: 'Будь ласка, введіть коректну email адресу',
    minLength: 'Мінімальна кількість символів: {min}',
    maxLength: 'Максимальна кількість символів: {max}',
    passwordsDontMatch: 'Паролі не співпадають',
    invalidCredentials: 'Невірне ім\'я користувача або пароль',
    networkError: 'Помилка мережі. Будь ласка, спробуйте пізніше.',
    serverError: 'Помилка сервера. Будь ласка, спробуйте пізніше.'
  }
};
