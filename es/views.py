
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.views.generic import TemplateView
from django.contrib.auth import get_user_model
from django.conf import settings
from django.shortcuts import redirect


def home(request):

    return render(request, 'home.html', {})
        
def login_success(request):
    """
    Redirects users based on whether they are in the admins group
    """
    if request.user.pos == 'owner':
        # user is an admin
        return redirect("/business/home/")
    elif request.user.pos == 'emp':
        return redirect("/employee/home/")
    else:
        return redirect("home/")
