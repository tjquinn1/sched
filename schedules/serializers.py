from rest_framework import serializers

from locations.models import Location
from accounts.models import Biz, Emp

from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = get_user_model()
        fields = (
            'id',
            'first_name',
        )
        depth = 1

class LocationSerializer(serializers.ModelSerializer):
    emps = Emp.objects.filter(biz_id=biz)
    emps_length = len(emps)
    class Meta:
        fields = (
            'biz',
            'emps_length'
            'name',
            'sunday_start',
            'sunday_end',
            'monday_start',
            'monday_end',
            'tuesday_start',
            'tuesday_end',
            'wednesday_start',
            'wednesday_end',
            'thursday_start',
            'thursday_end',
            'friday_start',
            'friday_end',
            'saturday_start',
            'saturday_end',

        )
        model = Location

class BizSerializer(serializers.ModelSerializer):
    fields = (

    )
    class Meta:
        model = Biz

class EmpSerializer(serializers.ModelSerializer):
    user = UserSerializer(source='emp')
    
   
    class Meta:
        model = Emp
        fields = (
        'emp',
        'user',
        'sunday_start',
        'sunday_end',
        'monday_start',
        'monday_end',
        'tuesday_start',
        'tuesday_end',
        'wednesday_start',
        'wednesday_end',
        'thursday_start',
        'thursday_end',
        'friday_start',
        'friday_end',
        'saturday_start',
        'saturday_end',

    )
    depth = 1


