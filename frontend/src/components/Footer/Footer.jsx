import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about">Про нас</a>
          <a href="/contact">Контакти</a>
          <a href="/privacy">Політика конфіденційності</a>
        </div>
        <div className="footer-copyright">
          &copy; {currentYear} Всі права захищені
        </div>
      </div>
    </footer>
  );
};

export default Footer;