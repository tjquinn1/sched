from django.db import models
from locations.models import Location

# Create your models here.
class Schedule(models.Model):
    location = models.ForeignKey(Location,null=False, blank=False, on_delete=models.CASCADE)
    