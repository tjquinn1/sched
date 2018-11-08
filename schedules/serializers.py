from rest_framework import serializers
from schedules.models import Schedule

class ScheduleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Schedule
        fields = ('location', 'emp', 'date', 'start_time', 'end_time')

