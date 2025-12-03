import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import "./Profile.css";
import AuthService from "../../services/Auth.service";

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user profile
        const profileResponse = await fetch(`${process.env.REACT_APP_API_URL}api/profile/${userId}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        
        if (!profileResponse.ok) {
          throw new Error(t('profile.userNotFound'));
        }
        
        const profileData = await profileResponse.json();
        
        // Fetch user rating
        const ratingResponse = await fetch(`${process.env.REACT_APP_API_URL}api/rating/`);
        const ratingData = await ratingResponse.json();
        
        // Find the current user in the rating data
        const userRating = ratingData.find(u => u.id === parseInt(userId));
        
        // Merge profile data with rating
        setUser({
          ...profileData,
          rating: userRating ? userRating.rating : 0
        });
        
        setLoading(false);
      } catch (err) {
        console.error(t('profile.loadError'), err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [userId, t]);

  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };

  if (loading) return <p>{t('common.loading')}...</p>;
  if (!user) return <p>{error || t('profile.userNotFound')}</p>;

  return (
    <div className="profile-page">
      <h1>{t('profile.title')}</h1>
      <div className="profile-card">
        <p><strong>{t('profile.username')}:</strong> {user.username}</p>
        <p><strong>{t('profile.email')}:</strong> {user.email}</p>
        <p><strong>{t('profile.registrationDate')}:</strong> {new Date(user.date_joined).toLocaleDateString()}</p>
        <p><strong>{t('profile.rating')}:</strong> {user.rating}</p>

        <button className="logout-btn" onClick={handleLogout}>
          {t('navigation.logout')}
        </button>
      </div>
    </div>
  );
}

export default Profile;
