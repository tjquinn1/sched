import graphene
from graphene_django import DjangoObjectType

from schedules.models import Schedule
from accounts.models import Biz, Emp
from accounts.schema import get_user, UserType, BizType, EmpType


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

    #2
    class Arguments:
        startTime = graphene.Int()
        endTime = graphene.Int()
        location = graphene.Int()
        emp = graphene.Int()


    #3
    def mutate(self, info, startTime, endTime, location, emp):
        schedule = Schedule(startTime=startTime, endTime=endTime, location=location, emp=emp)
        schedule.save()

        return CreateSchedule(
            id=schedule.id,
            startTime=schedule.start_time,
            endTime=schedule.end_time,
            location=schedule.location,
            emp = schedule.emp
        )


#4
class Mutation(graphene.ObjectType):
    create_schedule = CreateSchedule.Field()