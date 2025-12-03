import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Lessons.css";
import { toast } from "react-toastify";

function Lessons() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}courses/${courseId}/`)
      .then((response) => response.json())
      .then((data) => {
        setLessons(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Помилка при завантаженні уроків:", error);
        setLoading(false);
      });
  }, [courseId]);

  const toggleLesson = (lessonId) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const goToExercises = (lessonId) => {
    navigate(`/${lessonId}/exercises`);
  };

  const markAsCompleted = async (lessonId) => {
    const token = localStorage.getItem("access");
    if (!token) {
      toast.warning("Увійдіть, щоб позначати уроки як пройдені");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}courses/lesson/${lessonId}/complete/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({})  // Send empty JSON object as body
        }
      );

      if (response.ok) {
        toast.success("Урок позначено як пройдений!");
        setCompletedLessons((prev) => [...prev, lessonId]);
      } else {
        const data = await response.json();
        toast.error("Помилка при позначенні уроку");
      }
    } catch (err) {
      toast.error("Помилка підключення до сервера");
    }
  };

  if (loading) return <p className="loading">Завантаження...</p>;

  return (
    <div className="lessons-page">
      <h1>📘 Уроки курсу</h1>

      <div className="lesson-list">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card">
            <h2 onClick={() => toggleLesson(lesson.id)} className="lesson-title">
              {lesson.title}
            </h2>

            {expandedLesson === lesson.id && (
              <div className="lesson-content">
                <div className="lesson-text">{lesson.content}</div>

                <div className="lesson-actions">
                  <button
                    className="exercise-btn"
                    onClick={() => goToExercises(lesson.id)}
                  >
                    Перейти до вправ 🧩
                  </button>

                  <button
                    className={`complete-btn ${
                      completedLessons.includes(lesson.id) ? "done" : ""
                    }`}
                    onClick={() => markAsCompleted(lesson.id)}
                    disabled={completedLessons.includes(lesson.id)}
                  >
                    {completedLessons.includes(lesson.id)
                      ? "Пройдено ✅"
                      : "Позначити як пройдений"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lessons;
