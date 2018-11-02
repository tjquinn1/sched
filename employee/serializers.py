from rest_framework import serializers
from employee.models import Emp

class EmpSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Emp
        fields = ('user', 'biz', 'created')