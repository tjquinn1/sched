from django.db import models
from locations.models import Location
from employee.models import Emp

# Create your models here.
class Schedule(models.Model):
    location = models.ForeignKey(Location,null=False, blank=False, on_delete=models.CASCADE)
    emp = models.ForeignKey(Emp, null=False, blank=False, default=0, on_delete=models.CASCADE)
    date = models.DateField(null=True)
    start_time = models.IntegerField(default=0)
    end_time = models.IntegerField(default=0)
    