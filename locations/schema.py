
from graphene_django import DjangoObjectType
from django.shortcuts import get_object_or_404
from .models import Location
from accounts.models import Biz, User
from accounts.schema import BizType
from accounts.schema import UserType
from accounts.schema import EmpType
from django.contrib.auth.decorators import login_required
from django.contrib.sessions.backends.db import SessionStore

def get_user(info):
    token = info.context.session.get('token')

    if not token:
        return

    try:
        user = User.objects.get(token=token)
        return user
    except:
        raise Exception('User not found!')


class LocationType(DjangoObjectType):
    class Meta:
        model = Location

class CreateLocation(graphene.Mutation):
    location = graphene.Field(LocationType)
    biz = graphene.Field(BizType)
    id = graphene.Int()
    
    

    class Arguments:
        name = graphene.String()
        sundayStart = graphene.Int()
        sundayEnd = graphene.Int()
        mondayStart = graphene.Int()
        mondayEnd = graphene.Int()
        tuesdayStart = graphene.Int()
        tuesdayEnd = graphene.Int()
        wednesdayStart = graphene.Int()
        wednesdayEnd = graphene.Int()
        thursdayStart = graphene.Int()
        thursdayEnd = graphene.Int()
        fridayStart = graphene.Int()
        fridayEnd = graphene.Int()
        saturdayStart = graphene.Int()
        saturdayEnd = graphene.Int()
        user = graphene.Int()
        

    def mutate(self, info, name, user, sundayStart, sundayEnd, mondayStart, mondayEnd,tuesdayStart, tuesdayEnd, wednesdayStart, wednesdayEnd,thursdayStart, thursdayEnd,fridayStart, fridayEnd,saturdayStart, saturdayEnd):
        biz  = get_object_or_404(Biz, owner=user)
        
        location = Location(
            biz = biz,
            name = name,
            sunday_start = sundayStart,
            sunday_end = sundayEnd,
            monday_start = mondayStart,
            monday_end = mondayEnd,
            tuesday_start = tuesdayStart,
            tuesday_end = tuesdayEnd,
            wednesday_start = wednesdayStart,
            wednesday_end = wednesdayEnd,
            thursday_start = thursdayStart,
            thursday_end = thursdayEnd,
            friday_start = fridayStart,
            friday_end = fridayEnd,
            saturday_start = saturdayStart,
            saturday_end = saturdayEnd
        )


        location.save()

        return CreateLocation(location=location, biz=biz)



class Mutation(graphene.ObjectType):
    create_location = CreateLocation.Field()

class Query(graphene.ObjectType):
    location = graphene.Field(LocationType, location=graphene.Int())
    bizLocations = graphene.List(LocationType,
                                    biz=graphene.Int())
    def resolve_bizLocations(self, info, **kwargs):
        #print(dir(info.context.user))
        #print(info)
        biz = kwargs.get('biz')
        if id is not None:
            return Location.objects.filter(biz=biz)
        


    def resolve_location(self, info, **kwargs):
        print(kwargs)
        location = kwargs.get('location')
        if id is not None:
            return Location.objects.get(id=location)