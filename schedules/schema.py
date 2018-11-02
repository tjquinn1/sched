import graphene
from graphene_django import DjangoObjectType

from schedules.models import Schedule
from locations.models import Location
from accounts.models import Emp
from accounts.models import Biz, Emp
from accounts.schema import get_user, UserType, BizType, EmpType
from locations.schema import LocationType
from django.shortcuts import get_object_or_404


class ScheduleType(DjangoObjectType):
    class Meta:
        model = Schedule


class Query(graphene.ObjectType):
    schedules = graphene.List(ScheduleType)
    emps = graphene.List(EmpType)
    bizs = graphene.List(BizType)

    def resolve_schedules(self, info, **kwargs):
        return Schedule.objects.all()

class CreateSchedule(graphene.Mutation):
    schedule = graphene.Field(ScheduleType)
    location = graphene.Field(LocationType)
    emp = graphene.Field(EmpType)
    
    class Arguments:
        startTime = graphene.Int()
        endTime = graphene.Int()
        location = graphene.Int()
        emp = graphene.Int()
        date = graphene.String()


    def mutate(self, info, startTime, endTime, location, emp, date):
        loc = get_object_or_404(Location, id=location)
        ep = get_object_or_404(Emp, id=emp)
        if startTime is not 0:
            schedule = Schedule(
                start_time=startTime, 
                end_time=endTime, 
                location=loc, 
                emp=ep,
                date=date
                )
            
            schedule.save()

            return CreateSchedule(schedule=schedule)


#4
class Mutation(graphene.ObjectType):
    create_schedule = CreateSchedule.Field()