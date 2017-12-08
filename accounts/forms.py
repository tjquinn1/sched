from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import AuthenticationForm
from django.forms.widgets import PasswordInput, TextInput
from django import forms
from . import models
from .models import Biz
from.models import Emp

class UserCreateForm(UserCreationForm):
    class Meta:
        fields = ("email", "password1", "password2", "first_name", "last_name")
        model = get_user_model()
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["email"].widget.attrs.update({'class': 'form-control', 'placeholder': 'Email'})
        self.fields["first_name"].widget.attrs.update({'class': 'form-control', 'placeholder': 'First Name'})
        self.fields["last_name"].widget.attrs.update({'class': 'form-control', 'placeholder': 'Last Name'})
        self.fields["password1"].widget.attrs.update({'class': 'form-control', 'placeholder': 'Password'})
        self.fields["password2"].widget.attrs.update({'class': 'form-control', 'placeholder': 'Reenter Password'})


class BizForm(forms.ModelForm):
    class Meta:
        model = models.Biz
        fields = [
            'name',
            
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["name"].widget.attrs.update({'class': 'form-control', 'placeholder': 'Name'})
        

class PartialUserForm(forms.ModelForm):
    class Meta:
        model = get_user_model()
        fields = [

        ]

class RedeemForm(forms.ModelForm):
    class Meta:
        model = Biz
        fields = {
            'code',
        }

        widgets = {
            'code': TextInput(attrs={'cols': 80, 'rows': 20}),
        }

class EmpForm(forms.ModelForm):
    class Meta:
        model = Emp
        fields = {
            'sunday_start',
            'sunday_end',
            'monday_start',
            'monday_end',
            'tuesday_start',
            'tuesday_end',
            'wednesday_start',
            'wednesday_end',
            'thursday_start',
            'thursday_end',
            'friday_start',
            'friday_end',
            'saturday_start',
            'saturday_end',
            
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["sunday_start"].widget.attrs.update({'class': 'TimeInput'})
        self.fields["sunday_start"].widget.attrs.update({'class': 'form-control'})
        self.fields["sunday_end"].widget.attrs.update({'class': 'form-control'})
        self.fields["monday_start"].widget.attrs.update({'class': 'form-control'})
        self.fields["monday_end"].widget.attrs.update({'class': 'form-control'})
        self.fields["tuesday_start"].widget.attrs.update({'class': 'form-control'})
        self.fields["tuesday_end"].widget.attrs.update({'class': 'form-control'})
        self.fields["wednesday_start"].widget.attrs.update({'class': 'form-control'})
        self.fields["wednesday_end"].widget.attrs.update({'class': 'form-control'})
        self.fields["thursday_start"].widget.attrs.update({'class': 'form-control'})
        self.fields["thursday_end"].widget.attrs.update({'class': 'form-control'})
        self.fields["friday_start"].widget.attrs.update({'class': 'form-control'})
        self.fields["friday_end"].widget.attrs.update({'class': 'form-control'})
        self.fields["saturday_start"].widget.attrs.update({'class': 'form-control'})
        self.fields["saturday_end"].widget.attrs.update({'class': 'form-control'})

class BizPartialForm(forms.ModelForm):
    class Meta:
        model = models.Biz
        fields = [
            
        ]