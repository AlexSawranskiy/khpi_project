import React, { createContext, useState, useContext, useEffect } from 'react';
import ukTranslations from '../translations/uk';
import enTranslations from '../translations/en';

const LanguageContext = createContext();

const translations = {
  ukrainian: ukTranslations,
  english: enTranslations
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ukrainian');

  // Load saved language from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'ukrainian';
    setLanguage(savedLanguage);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key) => {
    const keys = key.split('.');
    return keys.reduce((obj, key) => (obj && obj[key] !== undefined) ? obj[key] : key, translations[language]);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
