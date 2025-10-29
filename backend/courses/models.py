from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Courses(models.Model):
  title = models.CharField(max_length=100)
  description = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  students = models.ManyToManyField(User, related_name='courses')

  def __str__(self):
    return self.title

class Lessons(models.Model):
  course = models.ForeignKey(Courses, related_name='lessons', on_delete=models.CASCADE)
  title = models.CharField(max_length=100)
  content = models.TextField()

  def __str__(self):
    return self.title
  
class Exercises(models.Model):
  lesson = models.ForeignKey(Lessons, related_name='exercises', on_delete=models.CASCADE)
  title = models.CharField(max_length=100)
  description = models.TextField()

  def __str__(self):
    return self.title
  
class Tasks(models.Model):
  TASK_TYPES = [
    ('choice', 'Multiple Choice'),
    ('text', 'Text Input'),
  ]

  exercise = models.ForeignKey(Exercises, on_delete=models.CASCADE, related_name='tasks')
  question_text = models.TextField()
  task_type = models.CharField(max_length=20, choices=TASK_TYPES)
  correct_answer = models.CharField(max_length=255, blank=True, null=True)
  options = models.JSONField(default=list, blank=True, null=True)


  def __str__(self):
    return self.question