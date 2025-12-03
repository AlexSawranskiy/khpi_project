import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/Auth.service';
import { useLanguage } from '../../contexts/LanguageContext';

function LoginUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await loginUser(username, password, navigate);
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <div className="wrapper">
        <button className="close-btn" onClick={() => navigate("/")}>
          <i className="bx bx-x"></i>
        </button>
        
        <h1>{t('login.title')}</h1>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-box">
            <input
              type="text"
              placeholder={t('login.username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <i className="bx bx-user"></i>
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder={t('login.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <div className="forget">
            <Link to="/forget-password">{t('login.forgotPassword')}</Link>
          </div>

          <button type="submit" className="btn">
            {t('login.loginButton')}
          </button>

          <div className="register-link">
            <p>
              <span style={{
                color: 'black',
                fontWeight: 'bold',
                textShadow: '0 0 2px white',
                display: 'inline-block',
                padding: '5px 0'
              }}>
                {t('login.noAccount')}
              </span>{' '}
              <Link to="/register" style={{
                color: 'var(--accent-color)',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>
                {t('login.register')}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginUser;
