from django.http import HttpResponseRedirect
from django.shortcuts import render



def home(request):
    pants = "six"
    return render(request, 'employee/home.html', {'pants':pants})

