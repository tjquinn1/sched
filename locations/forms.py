from django import forms
from . import models


class LocationForm(forms.ModelForm):
    class Meta:
        model = models.Location
        fields = [
            'name',
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
            
        ]


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["name"].widget.attrs.update({'class': 'form-control', 'placeholder': 'Name'})
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
        
        