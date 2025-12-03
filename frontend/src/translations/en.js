export default {
  // Sidebar translations
  sidebar: {
    menu: 'Menu',
    home: 'Home',
    achievements: 'Achievements',
    rating: 'Rating',
    courses: 'Courses',
    settings: 'Settings',
    profile: 'Profile'
  },
  
  // Language translations
  language: {
    ukrainian: 'Ukrainian',
    english: 'English',
    selectLanguage: 'Select language'
  },
  
  // Settings translations
  settings: {
    title: 'Settings',
    profile: {
      title: 'Profile',
      description: 'Edit profile information'
    },
    theme: {
      title: 'Dark Theme',
      description: 'Enable dark mode'
    },
    language: {
      title: 'Language',
      description: 'Select interface language',
      ukrainian: 'Ukrainian',
      english: 'English'
    },
    notifications: {
      title: 'Notifications',
      description: 'Manage notifications'
    },
    security: {
      title: 'Security',
      description: 'Change password and security settings'
    },
    logout: 'Logout'
  },
  
  // Login translations
  login: {
    title: 'Login',
    username: 'Username',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    loginButton: 'Login',
    noAccount: 'Don\'t have an account?',
    register: 'Register'
  },
  
  // Common UI elements
  common: {
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    search: 'Search',
    noResults: 'No results found',
    tryAgain: 'Try Again',
    error: 'An error occurred',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
    days: 'days'
  },
  
  // Home page
  home: {
    title: 'Home',
    welcome: 'Welcome to the Home Page!',
    description1: 'You have entered the foreign language learning system — a space where learning becomes interesting and results are easy to track. Here you can view your grades, analyze achievements, and monitor your language proficiency level.',
    description2: 'In the "My Achievements" section, you will find completed topics, assignments, and awards for successful results. The "Grades" page allows you to see detailed progress, and "Knowledge Level" will help you evaluate how close you are to your goal.',
    description3: 'Customize your profile in the "Settings" section to make learning even more comfortable. We are happy to welcome you to our community and wish you success on your language learning journey!'
  },
  
  // Achievements page
  achievements: {
    title: 'My Achievements',
    subtitle: 'Track your progress and achievements',
    loading: 'Loading achievements...',
    loadError: 'Error loading achievements',
    
    // Stats section
    lessons: 'Lessons',
    words: 'Words',
    streak: 'Learning Streak',
    days: 'days',
    inARow: 'in a row',
    completed: 'completed',
    learned: 'learned',
    totalXP: 'Total: {xp} XP',
    
    // Achievements section
    myAchievements: 'Your Awards',
    earnedOn: 'Earned on',
    
    // Achievement titles and descriptions
    firstStep: 'First Step',
    firstStepDesc: 'Completed first lesson',
    languageEnthusiast: 'Language Enthusiast',
    languageEnthusiastDesc: 'Completed 10 lessons',
    wordMaster: 'Word Master',
    wordMasterDesc: 'Learned 100 words',
    winningStreak: 'Winning Streak',
    winningStreakDesc: '5 days of learning in a row',
    perfectionist: 'Perfectionist',
    perfectionistDesc: 'Passed a test with 100% score'
  },
  
  // Progress page
  progress: {
    title: 'Your Learning Progress',
    description: 'Track your learning journey and see how far you\'ve come!',
    completedLessons: 'Completed Lessons',
    wordsLearned: 'Words Learned',
    streak: 'Current Streak',
    timeSpent: 'Time Spent',
    achievements: 'Achievements Unlocked',
    level: 'Current Level',
    nextLevel: 'Next Level',
    progressToNextLevel: 'Progress to next level',
    recentActivity: 'Recent Activity',
    noRecentActivity: 'No recent activity to show',
    startLearning: 'Start learning to see your progress!'
  },

  // Rating page
  rating: {
    title: 'User Rating',
    updateMessage: 'Rating updates every hour. Complete more tasks to move up in the ranking!',
    yourLevel: 'Your Level',
    searchPlaceholder: 'Search by name or email...',
    columns: {
      user: 'User',
      rating: 'Rating',
      level: 'Level',
      progress: 'Progress'
    },
    timeRanges: {
      all: 'All Time',
      month: 'This Month',
      week: 'This Week'
    },
    levels: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      expert: 'Expert',
      master: 'Master'
    }
  },
  
  // Pagination
  pagination: {
    firstPage: 'First page',
    previous: 'Previous',
    next: 'Next',
    lastPage: 'Last page',
    pageOf: 'Page {current} of {total}'
  },

  // Profile page
  profile: {
    title: 'User Profile',
    username: 'Username',
    email: 'Email',
    registrationDate: 'Registration Date',
    rating: 'Rating',
    userNotFound: 'User not found',
    loadError: 'Error loading profile'
  },
  
  // Navigation
  navigation: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout'
  },
  
  // Error messages
  errors: {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    minLength: 'Must be at least {min} characters',
    maxLength: 'Must be at most {max} characters',
    passwordsDontMatch: 'Passwords do not match',
    invalidCredentials: 'Invalid username or password',
    networkError: 'Network error. Please try again later.',
    serverError: 'Server error. Please try again later.'
  }
};
