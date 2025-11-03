from django.urls import path
from .views import register_user, user_profile, get_users_rating

urlpatterns = [
    path('register/', register_user),
    path('profile/<int:user_id>/', user_profile),
    path('rating/', get_users_rating),
]
