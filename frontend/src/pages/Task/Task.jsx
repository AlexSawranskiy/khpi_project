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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [creditsEarned, setCreditsEarned] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('access');
        const url = `${process.env.REACT_APP_API_URL}courses/tasks/${exerciseId}/`;
        console.log('1. Fetching tasks from:', url);
        console.log('2. Using token:', token ? 'Token exists' : 'No token');
        
        console.log('Full URL:', url);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });
        
        console.log('3. Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('4. Error response:', errorText);
          throw new Error('Не вдалося завантажити завдання');
        }
        
        const data = await response.json();
        console.log('5. Received tasks data:', data);
        console.log('6. Is data an array?', Array.isArray(data));
        console.log('7. Data length:', data.length);
        
        const tasksArray = Array.isArray(data) ? data : [];
        console.log('8. Tasks array to set:', tasksArray);
        
        setTasks(tasksArray);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error('Помилка при завантаженні завдань');
        setLoading(false);
      }
    };

    fetchTasks();
  }, [exerciseId]);

  const handleAnswerSelect = async (taskId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [taskId]: answer
    }));

    // Auto-submit the answer when an option is selected
    try {
      setIsSubmitting(true);
      setShowFeedback(false);
      
      const token = localStorage.getItem('access');
      const response = await fetch(`${process.env.REACT_APP_API_URL}courses/task/${taskId}/submit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ answer })
      });

      if (!response.ok) {
        throw new Error('Failed to submit answer');
      }

      const data = await response.json();
      
      // Show feedback
      setIsAnswerCorrect(data.is_correct);
      setCorrectAnswer(data.correct_answer);
      setCreditsEarned(data.credits_earned || 0);
      setTotalCredits(data.total_credits || 0);
      setShowFeedback(true);
      
      // Show toast message
      if (data.is_correct) {
        toast.success('Правильно! +5 кредитів');
      } else {
        toast.error('Неправильна відповідь. Спробуйте ще раз.');
      }
      
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Помилка при збереженні відповіді');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextTask = () => {
    setShowFeedback(false);
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      handleCompleteExercise();
    }
  };

  const submitExerciseScore = async (exerciseId, score) => {
    const token = localStorage.getItem('access');
    if (!token) return false;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}api/exercise/${exerciseId}/apply-score/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ score })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error('Error applying score:', error);
        return false;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting score:', error);
      return false;
    }
  };

  const handleCompleteExercise = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      toast.warning('Увійдіть, щоб зберігати прогрес');
      return;
    }

    try {
      // First mark the exercise as completed
      const completeUrl = `${process.env.REACT_APP_API_URL}courses/exercise/${exerciseId}/complete/`;
      console.log('Completing exercise at:', completeUrl);
      
      const completeResponse = await fetch(completeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({})
      });

      if (completeResponse.ok) {
        // Calculate total score (5 points per correct answer)
        const totalScore = Object.values(userAnswers).filter(Boolean).length * 5;
        
        // Submit the score to update user's rating
        if (totalScore > 0) {
          const scoreResult = await submitExerciseScore(exerciseId, totalScore);
          if (scoreResult) {
            toast.success(`Вітаємо! Ви заробили ${totalScore} балів рейтингу!`);
          }
        }
        
        toast.success('Вправу успішно завершено!');
        setIsCompleted(true);
      } else {
        const data = await completeResponse.json();
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
    console.log('9. No tasks to display. Tasks state:', tasks);
    return <div className="no-tasks">Немає завдань для цієї вправи. Перевірте консоль для додаткової інформації.</div>;
  }

  if (isCompleted) {
    return (
      <div className="task-completed">
        <h2>Вітаємо! 🎉</h2>
        <p>Ви успішно завершили всі завдання цієї вправи!</p>
        <button 
          className="back-to-exercises" 
          onClick={() => navigate(-1)} // Go back to the previous page
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
          {currentTask.options && currentTask.options.map((option, index) => {
            const isSelected = userAnswers[currentTask.id] === option;
            let optionClass = 'option';
            
            if (showFeedback) {
              if (isSelected) {
                optionClass += isAnswerCorrect ? ' correct-answer' : ' incorrect-answer';
              } else if (option === correctAnswer) {
                optionClass += ' correct-answer';
              }
            } else if (isSelected) {
              optionClass += ' selected';
            }
            
            return (
              <div 
                key={index}
                className={optionClass}
                onClick={() => !isSubmitting && handleAnswerSelect(currentTask.id, option)}
                disabled={isSubmitting}
              >
                {option}
              </div>
            );
          })}
        </div>
        
        {showFeedback && (
          <div className={`feedback ${isAnswerCorrect ? 'correct' : 'incorrect'}`}>
            {isAnswerCorrect ? (
              <div className="feedback-message">
                <span className="feedback-icon">✓</span>
                <span>Правильно! +5 кредитів</span>
              </div>
            ) : (
              <div className="feedback-message">
                <span className="feedback-icon">✗</span>
                <span>Неправильно. Правильна відповідь: {correctAnswer}</span>
              </div>
            )}
            <div className="total-credits">
              Усього кредитів: {totalCredits}
            </div>
          </div>
        )}

        <div className="task-actions">
          <button 
            className="next-btn"
            onClick={handleNextTask}
            disabled={!userAnswers[currentTask.id] || isSubmitting}
          >
            {isSubmitting ? 'Зберігаємо...' : (currentTaskIndex === tasks.length - 1 ? 'Завершити' : 'Далі')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;