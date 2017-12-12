from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from locations.models import Location
from accounts.models import Biz


def home(request):
    biz = get_object_or_404(Biz, owner=request.user.id)
    print(biz)
    locations = Location.objects.filter(biz_id=biz)
    return render(request, 'business/home.html', {'locations':locations})


