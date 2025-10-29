from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
  rating = models.PositiveIntegerField(default=0)

  def __str__(self):
    return self.username
  
class Echievements(models.Model):
  name = models.CharField(max_length=100)
  logo = models.ImageField(upload_to='achievements/')
  description = models.TextField()
  users = models.ManyToManyField(User, related_name='achievements', blank=True)

  def __str__(self):
    return self.name