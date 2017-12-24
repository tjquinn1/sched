from django.db import models
from locations.models import Location
from accounts.models import  Emp

# Create your models here.
class Schedule(models.Model):
    location = models.ForeignKey(Location,null=False, blank=False, on_delete=models.CASCADE)
    emp = models.ForeignKey(Emp, null=False, blank=False, on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.IntegerField()
    end_time = models.IntegerField()
    