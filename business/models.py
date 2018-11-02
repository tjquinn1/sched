from django.db import models
from django.utils import timezone
from django.conf import settings

# Create your models here.
class Biz(models.Model):
    owner = models.ForeignKey(to=settings.AUTH_USER_MODEL, blank=True, null=True, related_name='owner', on_delete=models.CASCADE)
    name = models.CharField(null=False, blank=False, max_length=100)
    created = models.DateTimeField(default=timezone.now)
    code = models.CharField(max_length=6, null=False, default='')