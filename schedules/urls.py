from django.conf.urls import url, include
from django.contrib.auth import views as auth_views
from django.urls import path

from . import views
app_name = 'schedules'
urlpatterns = [
    path('new/<int:pk>/', views.new, name="new"),
 
]