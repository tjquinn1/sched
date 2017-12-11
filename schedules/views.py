from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render


def create(request):
    
    return render(request, 'schedules/create.html', {'form':form})