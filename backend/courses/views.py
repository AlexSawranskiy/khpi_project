from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Courses
from .models import Lessons
from .models import Exercises
from .models import Tasks
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from .models import UserLessonProgress, UserExerciseProgress

@api_view(['GET'])
def view_courses_list(request):
  courses = Courses.objects.all()
  data = [
    {
      'id': course.id,
      'title': course.title,
      'logo': course.logo.url if course.logo else None,
      'description': course.description,
    }
      for course in courses
  ]
  return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_lessons_list(request, course_id):
  try:
    course = Courses.objects.get(id=course_id)
  except Courses.DoesNotExist:
    return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

  lessons = course.lessons.all()
  data = [
    {
      'id': lesson.id,
      'title': lesson.title,
      'content': lesson.content,
    }
      for lesson in lessons
  ]
  return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_exercises_list(request, lesson_id):
    try:
        lesson = Lessons.objects.get(id=lesson_id)
    except Lessons.DoesNotExist:
        return Response({'detail': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)

    exercises = Exercises.objects.filter(lesson=lesson)
    data = [
        {
            'id': ex.id,
            'title': ex.title,
            'description': ex.description,
        }
        for ex in exercises
    ]
    return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_task(request, task_id):
  try:
    task = Tasks.objects.get(id=task_id)
  except Tasks.DoesNotExist:
    return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

  data = {
    'id': task.id,
    'question': task.question_text,
    'task_type': task.task_type,
    'correct_answer': task.correct_answer,
    'options': task.options,
  }
  return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_tasks_list(request, exercise_id):
  try:
    exercise = Exercises.objects.get(id=exercise_id)
  except Exercises.DoesNotExist:
    return Response({'error': 'Exercise not found'}, status=status.HTTP_404_NOT_FOUND)

  tasks = Tasks.objects.filter(exercise=exercise)
  data = [
    {
      'id': task.id,
      'question': task.question_text,
      'task_type': task.task_type,
      'correct_answer': task.correct_answer,
      'options': task.options,
      'exercise_id': exercise.id,
    }
      for task in tasks
  ]
  return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_lesson_complete(request, lesson_id):
    user = request.user

    try:
        lesson = Lessons.objects.get(id=lesson_id)
    except Lessons.DoesNotExist:
        return Response({'detail': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)

    progress, _ = UserLessonProgress.objects.get_or_create(user=user, lesson=lesson)

    progress.is_completed = True
    progress.progress_percent = 100.0
    progress.completed_at = timezone.now()
    progress.save()

    return Response({'detail': 'Lesson marked as completed'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_exercise_completed(request, exercise_id):
    user = request.user

    try:
        exercise = Exercises.objects.get(id=exercise_id)
    except Exercises.DoesNotExist:
        return Response({'detail': 'Exercise not found'}, status=status.HTTP_404_NOT_FOUND)

    progress, _ = UserExerciseProgress.objects.get_or_create(user=user, exercise=exercise)

    progress.is_completed = True
    progress.completed_at = timezone.now()
    progress.save()

    return Response({'detail': 'Exercise marked as completed'}, status=status.HTTP_200_OK)