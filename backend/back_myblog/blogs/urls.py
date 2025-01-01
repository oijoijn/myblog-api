from django.urls import path, include 
from rest_framework.routers import DefaultRouter
from . import views

urlpatterns = [
    path('list/', views.BlogList.as_view()),
    path('detail/<int:id>/', views.BlogDetail.as_view()),
    path('detail/<int:id>/comments/', views.CommentCreate.as_view()),
]