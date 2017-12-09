from django.conf.urls import url, include
from django.contrib.auth import views as auth_views

from . import views
app_name = 'accounts'
urlpatterns = [
    # url(r"login/$", views.LoginView.as_view(), name="login"),
    url(r"^logout/$", views.logout_view, name="logout"),
    url(r"signup/$", views.SignUp.as_view(), name="signup"),
    url(r'edit/$', views.Edit, name='edit'),
    url(r'pre/$', views.pre, name='pre'),
    url(r'^biz/$', views.biz, name='biz'),
    url(r'^emp/$', views.emp, name='emp'),
    url(r'^login/$', views.custom_login, name='login'),
]