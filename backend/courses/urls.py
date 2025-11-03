from django.urls import path
from .views import view_courses_list, view_lessons_list, view_exercises_list, view_task, view_tasks_list

urlpatterns = [
  path('list/', view_courses_list),
  path('<int:course_id>/', view_lessons_list),
  path('exersise/<int:exercise_id>/', view_exercises_list),
  path('task/<int:task_id>/', view_task),
  path('tasks/<int:exercise_id>/', view_tasks_list),

]