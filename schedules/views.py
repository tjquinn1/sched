from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from locations.models import Location
from accounts.models import Biz, Emp
import json


def create(request, pk):
    biz = get_object_or_404(Biz, owner=request.user.id)
    print(biz)
    locations = Location.objects.filter(biz_id=biz)
    emps = Emp.objects.filter(biz_id=biz)
    l = []
    sf = []
    for emp in emps:
        j = {}
        j['id'] = emp.emp_id
        sf.append(emp.emp_id)
        j['sunday_start'] = emp.sunday_start
        j['sunday_end'] = emp.sunday_end
        j['monday_start'] = emp.monday_start
        j['monday_end'] = emp.monday_end
        j['tuesday_start'] = emp.tuesday_start
        j['tuesday_end'] = emp.tuesday_end
        j['wednesday_start'] = emp.wednesday_start
        j['wednesday_end'] = emp.wednesday_end
        j['thursday_start'] = emp.thursday_start
        j['thursday_end'] = emp.thursday_end
        j['friday_start'] = emp.friday_start
        j['friday_end'] = emp.friday_end
        j['saturday_start'] = emp.saturday_start
        j['saturday_end'] = emp.saturday_end
        l.append(j)

    emps_length = len(emps)
    context ={
        'locations':locations, 
        'emps':emps, 
        'emps_length':emps_length, 
        'l':l,
        'sf':sf
    }
    return render(request, 'schedules/create.html', context)

