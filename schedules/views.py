from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from locations.models import Location
from business.models import Biz
from employee.models import Emp
import json


def create(request, pk):
    biz = get_object_or_404(Biz, owner=request.user.id)
    location = get_object_or_404(Location, pk=pk)
    locations = Location.objects.filter(biz_id=biz)

    print(location.sunday_start)
    emps = Emp.objects.filter(biz_id=biz)
    l = []
    sf = []
    d = {}
    d['name'] = location.name
    d['sunday_start'] = location.sunday_start
    d['sunday_end'] = location.sunday_end
    d['monday_start'] = location.monday_start
    d['monday_end'] = location.monday_end
    d['tuesday_start'] = location.tuesday_start
    d['tuesday_end'] = location.tuesday_end
    d['wednesday_start'] = location.wednesday_start
    d['wednesday_end'] = location.wednesday_end
    d['thursday_start'] = location.thursday_start
    d['thursday_end'] = location.thursday_end
    d['friday_start'] = location.friday_start
    d['friday_end'] = location.friday_end
    d['saturday_start'] = location.saturday_start
    d['saturday_end'] = location.saturday_end
    
    for emp in emps:
        j = {}
        j['id'] = emp.user_id
        sf.append(emp.user_id)
        j['first_name'] = emp.user.first_name
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
        'sf':sf,
        'd': d
    }
    return render(request, 'schedules/create.html', context)

