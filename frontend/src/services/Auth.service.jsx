import { toastError, toastSuccess } from "./toast.constants";

const API_URL = process.env.REACT_APP_API_URL;

const AuthService = {
  loginUser: async (username, password, navigate) => {
    try {
      const response = await fetch(`${API_URL}api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        toastSuccess("Вхід успішний!");
        navigate("/");
      } else {
        toastError("Невірний логін або пароль");
      }
    } catch (err) {
      toastError("Помилка підключення до сервера");
    }
  },

  registerUser: async (username, email, password, confirmPassword, navigate) => {
    if (password !== confirmPassword) {
      toastError("Паролі не співпадають");
      return;
    }

    try {
      const response = await fetch(`${API_URL}api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toastSuccess("Реєстрація успішна! Тепер увійдіть.");
        navigate("/login");
      } else {
        toastError(data.detail || "Помилка під час реєстрації");
      }
    } catch (err) {
      toastError("Помилка підключення до сервера");
    }
  },

  isAuthenticated: () => {
    const access = localStorage.getItem("access");
    return !!access;
  },

  getUserId: () => {
    const token = localStorage.getItem("access");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.user_id || null;
    } catch (error) {
      console.error("Помилка при декодуванні токена:", error);
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  },

  resetPassword: async (email) => {
    if (!email) {
      toastError("Будь ласка, введіть email");
      return;
    }

    try {
      const response = await fetch(`${API_URL}api/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toastSuccess("Лист із відновленням паролю відправлено!");
      } else {
        toastError("Не вдалося знайти користувача з таким email");
      }
    } catch (error) {
      toastError("Помилка сервера. Спробуйте пізніше.");
    }
  },

  resetPasswordConfirm: async (token, password, confirm, navigate) => {
  if (password !== confirm) {
    toastError("Паролі не співпадають");
    return;
  }
    
  try {
    const response = await fetch(`${API_URL}api/reset-password-confirm/${token}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (response.ok) {
      toastSuccess("Пароль успішно змінено!");
      navigate("/login");
    } else {
      toastError(data.detail || "Не вдалося змінити пароль");
    }
  } catch (err) {
    toastError("Помилка підключення до сервера");
  }
},
};

export default AuthService;
export const loginUser = AuthService.loginUser;
export const registerUser = AuthService.registerUser;
export const resetPassword = AuthService.resetPassword;
export const resetPasswordConfirm = AuthService.resetPasswordConfirm;