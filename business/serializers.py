from rest_framework import serializers
from business.models import Biz

class BizSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Biz
        fields = ('owner', 'name', 'created', 'code')