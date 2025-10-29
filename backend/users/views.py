from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User

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
