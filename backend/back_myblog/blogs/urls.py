from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.BlogListAPI.as_view()),
    path('user/comments/list/', views.CommentListAPI.as_view()),
    path('<int:id>/detail/', views.BlogDetailAPI.as_view()),
    path('<int:id>/comments/create/', views.CommentCreateAPI.as_view()),
    path('<int:pk>/comments/edit/', views.CommentEditAPI.as_view()),

    # docs
    path('docs/', views.DocsView.as_view(), name='swagger-ui'),
]