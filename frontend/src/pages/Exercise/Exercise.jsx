import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Exercise.css";
import { toast } from "react-toastify";

function Exercise() {
  const { lessonId } = useParams();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedExercises, setCompletedExercises] = useState([]);
  const navigate = useNavigate();

  const fetchCompletedExercises = useCallback(async () => {
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}courses/user/completed-exercises/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCompletedExercises(data.completed_exercises || []);
      }
    } catch (error) {
      console.error("Error fetching completed exercises:", error);
    }
  }, []);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access");
        
        const [exercisesResponse, completedResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_URL}courses/lesson/${lessonId}/exercises/`, {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
          }),
          fetchCompletedExercises()
        ]);
        
        if (!exercisesResponse.ok) {
          const errorData = await exercisesResponse.json().catch(() => ({}));
          throw new Error(errorData.detail || "Не вдалося завантажити вправи");
        }
        
        const data = await exercisesResponse.json();
        setExercises(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        toast.error(error.message || "Помилка при завантаженні вправ");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [lessonId, fetchCompletedExercises]);

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
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ exercise_id: exerciseId })
        }
      );

      if (response.ok) {
        toast.success("Вправу позначено як пройдену ✅");
        setCompletedExercises(prev => [...new Set([...prev, exerciseId])]);
        
        // Update the exercises list to reflect the completion status
        setExercises(prev => 
          prev.map(ex => 
            ex.id === exerciseId 
              ? { ...ex, is_completed: true } 
              : ex
          )
        );
      } else {
        const data = await response.json();
        toast.error(data.detail || "Не вдалося позначити вправу");
      }
    } catch (error) {
      console.error("Error marking exercise as complete:", error);
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
