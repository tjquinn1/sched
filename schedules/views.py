from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from locations.models import Location
from accounts.models import Biz, Emp
import json
from rest_framework import  viewsets
from . import serializers
from django.contrib.auth import get_user_model


def create(request, pk):
    biz = get_object_or_404(Biz, owner=request.user.id)
    location = get_object_or_404(Location, pk=pk)
    locations = Location.objects.filter(biz_id=biz)

    emps = Emp.objects.filter(biz_id=biz)
    
    context ={
    }
    return render(request, 'schedules/create.html', context)

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = serializers.LocationSerializer

class EmpViewSet(viewsets.ModelViewSet):
    queryset = Emp.objects.all()
    serializer_class = serializers.EmpSerializer

class UserViewSet(viewsets.ModelViewSet):
    User = get_user_model()
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
