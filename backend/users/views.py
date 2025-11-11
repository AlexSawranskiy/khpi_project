from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from django.core.mail import send_mail
from django.conf import settings
import secrets
from datetime import timedelta
from django.utils import timezone

@api_view(['POST'])
def register_user(request):
  username = request.data.get('username')
  email = request.data.get('email')
  password = request.data.get('password')

  if not username or not password or not email:
    return Response({'detail': 'Усі поля обов’язкові'}, status=status.HTTP_400_BAD_REQUEST)

  if User.objects.filter(username=username).exists():
    return Response({'detail': 'Такий користувач вже існує'}, status=status.HTTP_400_BAD_REQUEST)

  user = User.objects.create_user(username=username, email=email, password=password)
  user.save()
  return Response({'detail': 'Реєстрація успішна'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def user_profile(request, user_id):
  try:
    user = User.objects.get(id=user_id)
  except User.DoesNotExist:
    return Response({'detail': 'Користувача не знайдено'}, status=status.HTTP_404_NOT_FOUND)

  data = {
    'id': user.id,
    'username': user.username,
    'email': user.email,
    'date_joined': user.date_joined,
    'rating': user.rating,
  }
  return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_users_rating(request):
  users = User.objects.all().order_by('-rating')
  data = [
    {
      'id': user.id,
      'username': user.username,
      'rating': user.rating,
    }
      for user in users
  ]
  return Response(data, status=status.HTTP_200_OK)
  
@api_view(['POST'])
def reset_password(request):
  email = request.data.get('email')

  if not email:
    return Response({'detail': 'Email обов’язковий'}, status=status.HTTP_400_BAD_REQUEST)

  try:
    user = User.objects.get(email=email)
  except User.DoesNotExist:
    return Response({'detail': 'Користувача з таким email не знайдено'}, status=status.HTTP_404_NOT_FOUND)

  token = secrets.token_urlsafe(32)
  user.reset_token = token
  user.reset_token_created_at = timezone.now()
  user.save()

  reset_link = f"{settings.FRONTEND_URL}/reset-password/{token}"

  send_mail(
    'Відновлення паролю',
    f'Для скидання паролю перейдіть за посиланням:\n{reset_link}\n\nПосилання дійсне 1 годину.',
    settings.DEFAULT_FROM_EMAIL,
    [email],
    fail_silently=False,
  )

  return Response({'detail': 'Лист для відновлення паролю відправлено'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def validate_reset_token(request, token):
  try:
    user = User.objects.get(reset_token=token)
  except User.DoesNotExist:
    return Response({'detail': 'Невірний або застарілий токен'}, status=status.HTTP_400_BAD_REQUEST)

  if not user.reset_token_created_at or timezone.now() - user.reset_token_created_at > timedelta(hours=1):
    return Response({'detail': 'Термін дії токена закінчився'}, status=status.HTTP_400_BAD_REQUEST)

  return Response({'detail': 'Токен дійсний'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def reset_password_confirm(request, token):
  new_password = request.data.get('password')

  if not new_password:
    return Response({'detail': 'Новий пароль обов’язковий'}, status=status.HTTP_400_BAD_REQUEST)

  try:
    user = User.objects.get(reset_token=token)
  except User.DoesNotExist:
    return Response({'detail': 'Недійсний або прострочений токен'}, status=status.HTTP_400_BAD_REQUEST)

  if not user.reset_token_created_at or timezone.now() - user.reset_token_created_at > timedelta(hours=1):
    return Response({'detail': 'Термін дії токена закінчився'}, status=status.HTTP_400_BAD_REQUEST)

  user.set_password(new_password)
  user.reset_token = None
  user.reset_token_created_at = None
  user.save()

  return Response({'detail': 'Пароль успішно змінено'}, status=status.HTTP_200_OK)