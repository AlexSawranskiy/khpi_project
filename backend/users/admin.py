from django.contrib import admin

# Register your models here.

from .models import User, Echievements

admin.site.register(User)
admin.site.register(Echievements)