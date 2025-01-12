from django.urls import path 
from . import views

urlpatterns = [
    path('signup/', views.SignUpAPI.as_view()),
    path('passwordchange/', views.PasswordChangeViewAPI.as_view()),
]