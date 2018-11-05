"""es URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url, include
from django.urls import path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings
from . import views
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers
from accounts import views as accountViews
from . import views


router = routers.DefaultRouter()
router.register(r'users', accountViews.UserViewSet)



urlpatterns = [
    path("^", include(router.urls)),
    path("^api-auth/", include('rest_framework.urls', namespace='rest_framework')),
    path("admin/", admin.site.urls),
    path("accounts/", include("accounts.urls", namespace='accounts')),
    path("schedules/", include("schedules.urls", namespace='schedules')),
    path("locations/", include("locations.urls", namespace='locations')),
    path("business/", include("business.urls", namespace='business')),
    path("employee/", include("employee.urls", namespace='employee')),
    path("^accounts/", include("django.contrib.auth.urls")),
    path('home/', views.home, name='home'),
    path('login_success/', views.login_success, name='login_succes')
]


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)