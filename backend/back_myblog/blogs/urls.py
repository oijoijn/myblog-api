from django.urls import path
from . import views

app_name = 'blogs' 

urlpatterns = [
    path('list/', views.BlogListAPI.as_view(), name='blog-list'),
    path('<int:id>/detail/', views.BlogDetailAPI.as_view(), name='blog-detail'),
    path('<int:id>/comments/create/', views.CommentCreateAPI.as_view(), name='comment-create'),
    path('<int:pk>/comments/edit/', views.CommentEditAPI.as_view(), name='comment-edit'),
    path('user/comments/list/', views.CommentListAPI.as_view(), name='comment-list'),
    # path('docs/', views.DocsView.as_view(), name='docs'),
]
