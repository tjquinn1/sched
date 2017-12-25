import graphene
from graphene_django import DjangoObjectType

from .models import Location
from accounts.models import Biz, User
from accounts.schema import BizType

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
        

    def mutate(self, info, name, sundayStart, sundayEnd, mondayStart, mondayEnd,tuesdayStart, tuesdayEnd, wednesdayStart, wednesdayEnd,thursdayStart, thursdayEnd,fridayStart, fridayEnd,saturdayStart, saturdayEnd):
        user = get_user(info) or None
        biz  = Biz.objects.filter(owner_id=user.id).first()
        if not biz:
            raise Exception('Biz not found!')
        
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