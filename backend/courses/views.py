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
from django.db import transaction
from django.contrib.auth import get_user_model
from .models import UserProfile

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
def submit_answer(request, task_id):
    try:
        task = Tasks.objects.get(id=task_id)
    except Tasks.DoesNotExist:
        return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
    
    user_answer = request.data.get('answer')
    if not user_answer:
        return Response({'error': 'Answer is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    is_correct = str(user_answer).strip().lower() == str(task.correct_answer).strip().lower()
    credits_earned = 0
    
    # Update user's credits if answer is correct
    if is_correct:
        with transaction.atomic():
            user_profile, created = UserProfile.objects.get_or_create(user=request.user)
            user_profile.credits += 15
            user_profile.save()
            credits_earned = 15
    
    # Update exercise progress
    exercise = task.exercise
    user_exercise_progress, _ = UserExerciseProgress.objects.get_or_create(
        user=request.user,
        exercise=exercise
    )
    
    # Get all tasks for this exercise
    total_tasks = Tasks.objects.filter(exercise=exercise).count()
    completed_tasks = UserExerciseProgress.objects.filter(
        user=request.user,
        exercise=exercise,
        is_completed=True
    ).count()
    
    # Mark exercise as completed if all tasks are done
    if not user_exercise_progress.is_completed and completed_tasks + 1 >= total_tasks:
        user_exercise_progress.is_completed = True
        user_exercise_progress.completed_at = timezone.now()
        user_exercise_progress.save()
        
        # Update lesson progress if this was the last exercise
        lesson = exercise.lesson
        total_exercises = Exercises.objects.filter(lesson=lesson).count()
        completed_exercises = UserExerciseProgress.objects.filter(
            user=request.user,
            exercise__lesson=lesson,
            is_completed=True
        ).count()
        
        if completed_exercises >= total_exercises:
            lesson_progress, _ = UserLessonProgress.objects.get_or_create(
                user=request.user,
                lesson=lesson
            )
            lesson_progress.is_completed = True
            lesson_progress.progress_percent = 100.0
            lesson_progress.completed_at = timezone.now()
            lesson_progress.save()
    
    return Response({
        'is_correct': is_correct,
        'correct_answer': task.correct_answer,
        'credits_earned': credits_earned,
        'total_credits': request.user.userprofile.credits if hasattr(request.user, 'userprofile') else 0
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_completed_lessons(request):
    user = request.user
    completed_lessons = UserLessonProgress.objects.filter(
        user=user,
        is_completed=True
    ).values_list('lesson_id', flat=True)
    
    return Response({
        'completed_lessons': list(completed_lessons)
    }, status=status.HTTP_200_OK)


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