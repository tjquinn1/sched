from django.contrib.auth import logout
from django.contrib.auth import login as auth_login
from django.contrib.auth.forms import AuthenticationForm
from django.urls import reverse_lazy
from django.views import generic
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render
from . import forms
from django.template import RequestContext
from django.contrib.auth import authenticate
from django.http import HttpResponseRedirect
import random
import string
from .models import Biz
from django.contrib import messages


def custom_login(request):
    form = forms.CustomLoginForm()
    
    if request.method == 'POST':
        form = forms.CustomLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            user = authenticate(email=username, password=password)
            if user is not None:
                auth_login(request, user)
                messages.success(request, "Welcome {}".format(request.user.first_name))
                return HttpResponseRedirect('/login_success/')
            else:
                messages.error(request, "Your user name or password is incorect")
    return render(request, 'registration/login.html', {'form': form})





def logout_view(request):
    logout(request)
    return redirect("/home/")


class SignUp(generic.CreateView):
    form_class = forms.UserCreateForm
    success_url = "accounts/pre/"
    template_name = "accounts/signup.html"
    def form_valid(self, form):
        valid = super(SignUp, self).form_valid(form)
        email, password = form.cleaned_data.get('email'), form.cleaned_data.get('password1')
        new_user = authenticate(email=email, password=password)
        auth_login(self.request, new_user)
        return valid

@login_required    
def Edit(request): 
    form = forms.UserCreateForm(instance=request.user)
    
    if request.method == 'POST':
        form = forms.UserCreateForm(instance=request.user, data=request.POST, files=request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Updated {}".format(form.cleaned_data['name']))
            return HttpResponseRedirect('/')
    return render(request, 'accounts/signup.html', {'form': form})


@login_required
def biz(request):
    form = forms.BizForm()
    code = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(6))
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = forms.BizForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            biz = form.save(commit=False)
            biz.owner = request.user
            biz.code = code
            biz.save()
            pos = pos.save(commit=False)
            pos.pos = 'owner'
            pos.save()
            # redirect to a new URL:
            return HttpResponseRedirect('/locations/add/')

    return render(request, 'registration/biz.html', {'form': form})


def pre(request):
    return render(request, 'registration/pre.html', {})

def emp(request):
    form = forms.RedeemForm()
    empForm = forms.EmpForm()
    pos = forms.PartialUserForm(instance=request.user)
    if request.method == 'POST':
        form = forms.RedeemForm(request.POST)
        empForm = forms.EmpForm(request.POST)
        
        f = form.save(commit=False)
        e = empForm.save(commit=False)
        pos = pos.save(commit=False)
        b = form['code'].value()
        print(b)
        bizz = get_object_or_404(Biz, code=b)
        e.biz = bizz
        e.emp = request.user
        e.save()
        if e.biz is not None:
            pos.pos = "emp"
            
            pos.save()
        return HttpResponseRedirect('/home/')

        
    
    
    
    
    return render(request, 'registration/emp.html', {'form':form, 'empForm':empForm})