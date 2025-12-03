import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaTrophy, FaBook, FaCog, FaUser, FaSignInAlt, FaBars, FaTimes, FaStar } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Sidebar.css";
import AuthService from "../../services/Auth.service";
import { useLanguage } from "../../contexts/LanguageContext";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, language, changeLanguage } = useLanguage();
  const isAuthenticated = AuthService.isAuthenticated();
  const userId = AuthService.getUserId();

  // Define routes where sidebar should be hidden
  const hideSidebarRoutes = [
    "/login",
    "/register",
    "/forget-password",
    "/reset-password"
  ];

  // Check if current route is an auth route
  const isAuthRoute = hideSidebarRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Toggle sidebar on mobile
  const toggleSidebar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  // Don't render sidebar on auth routes
  if (isAuthRoute) {
    return null;
  }

  return (
    <>
      <button 
        className={`menu-toggle ${isAuthRoute ? 'd-none' : ''}`} 
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <h2>{t('sidebar.menu')}</h2>
        <ul>
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              <FaHome className="icon" />
              <span>{t('sidebar.home')}</span>
            </Link>
          </li>
          <li>
            <Link to="/achievements" className={isActive('/achievements') ? 'active' : ''}>
              <FaTrophy className="icon" />
              <span>{t('sidebar.achievements')}</span>
            </Link>
            <Link to="/rating" className={isActive('/rating') ? 'active' : ''}>
              <FaStar className="icon" />
              <span>{t('sidebar.rating')}</span>
            </Link>
          </li>
          <li>
            <Link to="/languages" className={isActive('/languages') ? 'active' : ''}>
              <FaBook className="icon" />
              <span>{t('sidebar.courses')}</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className={isActive('/settings') ? 'active' : ''}>
              <FaCog className="icon" />
              <span>{t('sidebar.settings')}</span>
            </Link>
          </li>

          {isAuthenticated ? (
            <li>
              <Link to={`/profile/${userId}`} className={isActive(`/profile/${userId}`) ? 'active' : ''}>
                <FaUser className="icon" />
                <span>{t('sidebar.profile')}</span>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className={isActive('/login') ? 'active' : ''}>
                <FaSignInAlt className="icon" />
                <span>{t('login.loginButton')}</span>
              </Link>
            </li>
          )}
          <li className="theme-toggle-container">
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
