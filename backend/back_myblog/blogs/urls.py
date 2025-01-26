from django.urls import path
from . import views

app_name = 'blogs' 

urlpatterns = [
    path('', views.BlogListAPI.as_view(), name='blog-list'),
    path('<int:id>/', views.BlogDetailAPI.as_view(), name='blog-detail'),
    path('<int:id>/comments/', views.CommentCreateAPI.as_view(), name='comment-create'),
    path('comments/<int:pk>/', views.CommentEditAPI.as_view(), name='comment-edit'),
    path('comments/', views.CommentListAPI.as_view(), name='comment-list'),
    path('docs/', views.DocsView.as_view(), name='docs'),
]