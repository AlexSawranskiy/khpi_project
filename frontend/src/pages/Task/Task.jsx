import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Task.css';

function Task() {
  const { exerciseId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('access');
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}courses/exercise/${exerciseId}/tasks/`,
          {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
          }
        );
        
        if (!response.ok) throw new Error('Не вдалося завантажити завдання');
        
        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error('Помилка при завантаженні завдань');
        setLoading(false);
      }
    };

    fetchTasks();
  }, [exerciseId]);

  const handleAnswerSelect = (taskId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [taskId]: answer
    }));
  };

  const handleNextTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      handleCompleteExercise();
    }
  };

  const handleCompleteExercise = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      toast.warning('Увійдіть, щоб зберігати прогрес');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}courses/exercise/${exerciseId}/complete/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        toast.success('Вправу успішно завершено!');
        setIsCompleted(true);
      } else {
        const data = await response.json();
        toast.error(data.detail || 'Не вдалося зберегти прогрес');
      }
    } catch (error) {
      console.error(error);
      toast.error('Помилка збереження прогресу');
    }
  };

  const currentTask = tasks[currentTaskIndex];
  const progress = tasks.length > 0 ? Math.round(((currentTaskIndex) / tasks.length) * 100) : 0;

  if (loading) {
    return <div className="loading">Завантаження завдань...</div>;
  }

  if (tasks.length === 0) {
    return <div className="no-tasks">Немає завдань для цієї вправи</div>;
  }

  if (isCompleted) {
    return (
      <div className="task-completed">
        <h2>Вітаємо! 🎉</h2>
        <p>Ви успішно завершили всі завдання цієї вправи!</p>
        <button 
          className="back-to-exercises" 
          onClick={() => navigate(`/exercises/${exerciseId.split('_')[0]}`)}
        >
          Повернутися до вправ
        </button>
      </div>
    );
  }

  return (
    <div className="task-container">
      <div className="task-progress">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="progress-text">
          Завдання {currentTaskIndex + 1} з {tasks.length}
        </div>
      </div>

      <div className="task-card">
        <h2 className="task-question">{currentTask.question}</h2>
        
        <div className="task-options">
          {currentTask.options && currentTask.options.map((option, index) => (
            <div 
              key={index}
              className={`option ${userAnswers[currentTask.id] === option ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(currentTask.id, option)}
            >
              {option}
            </div>
          ))}
        </div>

        <div className="task-actions">
          <button 
            className="next-btn"
            onClick={handleNextTask}
            disabled={!userAnswers[currentTask.id]}
          >
            {currentTaskIndex === tasks.length - 1 ? 'Завершити' : 'Далі'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;