from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.schemas import get_schema_view
from rest_framework import permissions

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('blogs/', include('blogs.urls')),
    path('accounts/', include('accounts.urls')),
    path('schema/', get_schema_view(
        version="1.0.0",
        public=True,
        permission_classes=[permissions.AllowAny],
        authentication_classes=[],
    ), name='schema'),  
]