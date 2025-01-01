from django.contrib import admin
from .models import Blog, BlogAndComment

admin.site.register(Blog)
admin.site.register(BlogAndComment)
