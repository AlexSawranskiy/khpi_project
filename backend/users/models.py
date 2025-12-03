from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
  rating = models.IntegerField(default=0)
  reset_token = models.CharField(max_length=255, null=True, blank=True)
  reset_token_created_at = models.DateTimeField(null=True, blank=True)
  completed_exercises = models.JSONField(default=dict, blank=True, null=True)

  def __str__(self):
    return self.username
  
class Echievements(models.Model):
  name = models.CharField(max_length=100)
  logo = models.ImageField(upload_to='achievements/')
  description = models.TextField()
  users = models.ManyToManyField(User, related_name='achievements', blank=True)

  def __str__(self):
    return self.name