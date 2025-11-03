import React, { useEffect, useState } from "react";
import "./Languages.css";

function Languages() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="languages-page">
      <h1>Виберіть курс</h1>

      <div className="courses-container">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h2>{course.title}</h2>
            <div className="course-logo-container">
              {course.logo && (
                <img
                  src={`${process.env.REACT_APP_API_URL.replace("api/", "")}${course.logo}`}
                  alt={`${course.title} logo`}
                  className="course-logo"
                />
              )}
            </div>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Languages;
