from django.contrib import admin

# Register your models here.

from .models import Courses, Lessons, Exercises, Tasks, UserLessonProgress, UserExerciseProgress

admin.site.register(Courses)
admin.site.register(Lessons)
admin.site.register(Exercises)
admin.site.register(Tasks)
admin.site.register(UserLessonProgress)
admin.site.register(UserExerciseProgress)