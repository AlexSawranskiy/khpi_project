import { toastError, toastSuccess } from "./toast.constants";

const API_URL = process.env.REACT_APP_API_URL;

const AuthService = {
  loginUser: async (username, password, navigate) => {
    try {
      const response = await fetch(`${API_URL}api/token/`, {
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

  logout: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  },

  isAuthenticated: () => {
    const access = localStorage.getItem("access");
    return !!access;
  },
};

export default AuthService;
export const loginUser = AuthService.loginUser;
export const registerUser = AuthService.registerUser;