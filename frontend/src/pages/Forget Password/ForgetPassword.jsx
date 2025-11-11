import React, { useState } from "react";
import "./ForgetPassword.css";
import { resetPassword } from "../../services/Auth.service";
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await resetPassword(email);

    setLoading(false);
    setEmail("");
  };

  return (
    <div className="forget-container">
      <div className="wrapper">
        <button className="close-btn" onClick={() => navigate("/")}>
          X
        </button>
        
        <h1>Відновлення паролю</h1>
        <p className="subtitle">
          Введіть свій email, щоб отримати посилання для відновлення паролю.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              placeholder="Введіть ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bx-envelope"></i>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Відправляємо..." : "Відновити пароль"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
