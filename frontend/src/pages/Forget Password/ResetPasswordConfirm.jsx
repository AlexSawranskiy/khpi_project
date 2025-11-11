import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./ForgetPassword.css";
import { resetPasswordConfirm } from "../../services/Auth.service";
import { toastError } from "../../services/toast.constants";

function ResetPasswordConfirm() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}api/reset-password/${token}/`
        );
        if (response.ok) {
          setValid(true);
        } else {
          const data = await response.json();
          toastError(data.detail || "Недійсне або прострочене посилання");
        }
      } catch {
        toastError("Помилка сервера");
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await resetPasswordConfirm(token, password, confirm, navigate);
    setLoading(false);
  };

  if (!valid) {
    return (
      <div className="wrapper">
        <div className="password-reset-container">
          <h2>Посилання недійсне або прострочене 😢</h2>
            <Link to="/"><button className="btn">Повернутися на головну</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="forget-container">
      <div className="wrapper">
        <button className="close-btn" onClick={() => navigate("/")}>
          X
        </button>
        <h1>Новий пароль</h1>
        <p className="subtitle">
          Введіть свій новий пароль, щоб завершити відновлення.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="password"
              placeholder="Новий пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Підтвердьте пароль"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Оновлюємо..." : "Змінити пароль"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordConfirm;
