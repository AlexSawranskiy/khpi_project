import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Profile.css";
import AuthService from "../../services/Auth.service";

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}api/profile/${userId}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Користувача не знайдено");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Помилка завантаження профілю:", err);
        setLoading(false);
      });
  }, [userId]);

  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };

  if (loading) return <p>Завантаження...</p>;
  if (!user) return <p>Користувача не знайдено</p>;

  return (
    <div className="profile-page">
      <h1>Профіль користувача</h1>
      <div className="profile-card">
        <p><strong>Ім'я користувача:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Дата реєстрації:</strong> {new Date(user.date_joined).toLocaleDateString()}</p>
        <p><strong>Рейтинг:</strong> {user.rating}</p>

        <button className="logout-btn" onClick={handleLogout}>
          Вийти
        </button>
      </div>
    </div>
  );
}

export default Profile;
