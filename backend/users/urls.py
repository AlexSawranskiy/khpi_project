from django.urls import path
from .views import register_user, user_profile, get_users_rating, reset_password, reset_password_confirm, validate_reset_token, apply_exercise_score
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', register_user),
    path('profile/<int:user_id>/', user_profile),
    path('rating/', get_users_rating),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('reset-password/', reset_password),
    path('reset-password/<str:token>/', validate_reset_token),
    path('reset-password-confirm/<str:token>/', reset_password_confirm),
    path('exercise/<int:exercise_id>/apply-score/', apply_exercise_score),
]
