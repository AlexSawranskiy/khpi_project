import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Exercise.css";
import { toast } from "react-toastify";

function Exercise() {
  const { lessonId } = useParams();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedExercises, setCompletedExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}courses/${lessonId}/exercises/`
        );
        if (!response.ok) throw new Error("Не вдалося завантажити вправи");
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error(error);
        toast.error("Помилка при завантаженні вправ 😢");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [lessonId]);

  const handleComplete = async (exerciseId) => {
    const token = localStorage.getItem("access");
    if (!token) {
      toast.warning("Увійдіть, щоб зберігати прогрес ⚠️");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}courses/exercise/${exerciseId}/complete/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Вправу позначено як пройдену ✅");
        setCompletedExercises((prev) => [...prev, exerciseId]);
      } else {
        const data = await response.json();
        toast.error(data.detail || "Не вдалося позначити вправу");
      }
    } catch (error) {
      toast.error("Помилка підключення до сервера");
    }
  };

  const goToTasks = (exerciseId) => {
    navigate(`/tasks/${exerciseId}`);
  };

  if (loading) return <p className="loading">Завантаження вправ...</p>;

  return (
    <div className="exercise-page">
      <h1>🧩 Вправи</h1>
      {exercises.length === 0 ? (
        <p className="no-exercises">Поки що немає вправ для цього уроку 😅</p>
      ) : (
        <div className="exercise-list">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card">
              <h2>{exercise.title}</h2>
              <p>{exercise.description}</p>

              <div className="exercise-actions">
                <button
                  className="task-btn"
                  onClick={() => goToTasks(exercise.id)}
                >
                  Перейти до завдань 📘
                </button>

                <button
                  className={`complete-btn ${
                    completedExercises.includes(exercise.id) ? "done" : ""
                  }`}
                  onClick={() => handleComplete(exercise.id)}
                  disabled={completedExercises.includes(exercise.id)}
                >
                  {completedExercises.includes(exercise.id)
                    ? "Пройдено ✅"
                    : "Позначити як пройдену"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Exercise;
