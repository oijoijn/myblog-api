from django.urls import path
from . import views

app_name = 'accounts' 

urlpatterns = [
    path('signup/', views.SignUpAPI.as_view(), name='signup'),
    path('passwordchange/', views.PasswordChangeViewAPI.as_view(), name='passwordchange'),
]