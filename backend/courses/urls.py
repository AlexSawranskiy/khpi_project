from django.urls import path
from .views import view_courses_list, view_lessons_list, view_exercises_list, view_task, view_tasks_list, mark_lesson_complete, mark_exercise_completed 

urlpatterns = [
  path('list/', view_courses_list),
  path('<int:course_id>/', view_lessons_list),
  path('<int:lesson_id>/exercises/', view_exercises_list),
  path('task/<int:task_id>/', view_task),
  path('tasks/<int:exercise_id>/', view_tasks_list),
  path('lesson/<int:lesson_id>/complete/', mark_lesson_complete),
  path('exercise/<int:exercise_id>/complete/', mark_exercise_completed),
]