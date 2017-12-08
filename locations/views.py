from django.shortcuts import get_object_or_404, render
from . import forms
from accounts.models import Biz
from django.http import HttpResponseRedirect

# Create your views here.
def add(request):
    form = forms.LocationForm()
    location = get_object_or_404(Biz, owner_id=request.user.id)
    # if this is a POST request we need to process the form data
    #if request.user.pos == 'owner':
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = forms.LocationForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            loc = form.save(commit=False)
            loc.biz = location
            loc.save()
            # redirect to a new URL:
            return HttpResponseRedirect('/home/')
    return render(request, 'locations/add.html', {'form':form})