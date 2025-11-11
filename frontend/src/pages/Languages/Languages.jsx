import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Languages.css";

function Languages() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [startedCourses, setStartedCourses] = useState(
    JSON.parse(localStorage.getItem("startedCourses")) || []
  );

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}courses/list/`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Помилка при завантаженні курсів:", error);
        setLoading(false);
      });
  }, []);

  const handleSelect = (courseId) => {
    setSelectedCourse((prev) => (prev === courseId ? null : courseId));
  };

  const handleStartCourse = (courseId) => {
    if (!startedCourses.includes(courseId)) {
      const updated = [...startedCourses, courseId];
      setStartedCourses(updated);
      localStorage.setItem("startedCourses", JSON.stringify(updated));
    }
    navigate(`/lessons/${courseId}`);
  };

  if (loading) return <p className="loading">Завантаження курсів...</p>;

  return (
    <div className="languages-page">
      <h1>🌍 Виберіть курс</h1>

      <div className="courses-container">
        {courses.map((course) => {
          const isStarted = startedCourses.includes(course.id);
          const isSelected = selectedCourse === course.id;

          return (
            <div key={course.id} className="course-card">
              <h2>{course.title}</h2>

              <div
                className="course-logo-container"
                onClick={() => handleSelect(course.id)}
              >
                {course.logo && (
                  <img
                    src={`${process.env.REACT_APP_API_URL.replace("api/", "")}${course.logo}`}
                    alt={`${course.title} logo`}
                    className="course-logo"
                  />
                )}
              </div>

              {isSelected && (
                <div className="course-details">
                  <p className="course-description">{course.description}</p>
                  <button
                    className={`start-btn ${isStarted ? "continue" : ""}`}
                    onClick={() => handleStartCourse(course.id)}
                  >
                    {isStarted ? "Продовжити курс ➡️" : "Почати курс 🚀"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Languages;
