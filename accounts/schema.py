import graphene
from graphene_django import DjangoObjectType

from accounts.models import User, Emp, Biz
from django.contrib.auth import authenticate
import random
import string

def get_user(info):
    token = info.context.session.get('token')

    if not token:
        return

    try:
        user = User.objects.get(token=token)
        return user
    except:
        raise Exception('User not found!')

class UserType(DjangoObjectType):
    class Meta:
        model = User

class EmpType(DjangoObjectType):
    class Meta:
        model = Emp

class BizType(DjangoObjectType):
    class Meta:
        model = Biz



class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        firstName = graphene.String(required=True)
        lastName = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, firstName, lastName, password, email):
        user = User(
            email=email,
            last_name=lastName,
            first_name = firstName
        )
        user.set_password(password)
        user.save()

        return CreateUser(user=user)

class LogIn(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        email = graphene.String()
        password = graphene.String()

    def mutate(self, info, email, password):
        user = authenticate(username=email, password=password)

        if not user:
            raise Exception('Invalid username or password!')

        info.context.session['token'] = user.token
        return LogIn(user=user)

class CreateEmp(graphene.Mutation):
    emp = graphene.Field(EmpType)
    biz = graphene.Field(BizType)
    user = graphene.Field(UserType)
    
    

    class Arguments:
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
        code = graphene.String()

    def mutate(self, info, code, sundayStart, sundayEnd, mondayStart, mondayEnd,tuesdayStart, tuesdayEnd, wednesdayStart, wednesdayEnd,thursdayStart, thursdayEnd,fridayStart, fridayEnd,saturdayStart, saturdayEnd):
        user = get_user(info) or None

        biz  = Biz.objects.filter(code=code).first()
        if not biz:
            raise Exception('Invalid Code!')
        
        emp = Emp(
            user = user,
            biz = biz,
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


        emp.save()

        return CreateEmp(emp=emp, biz=biz, user=user)



class CreateBiz(graphene.Mutation):
    id = graphene.Int()
    name = graphene.String()
    code = graphene.String()
    owner = graphene.Field(UserType)
    

    class Arguments:
        name = graphene.String()


    def mutate(self, info, name):
        user = get_user(info) or None
        code = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(6))
        biz = Biz(
            code = code,
            name = name,
            owner = user
        )

        biz.save()

        return CreateBiz(
            id= biz.id,
            name = biz.name,
            code = biz.code,
            owner = biz.owner
        )

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    login = LogIn.Field()
    create_emp = CreateEmp.Field()
    create_biz = CreateBiz.Field()

class Query(graphene.ObjectType):
    me = graphene.Field(UserType)
    users = graphene.List(UserType)

    def resolve_users(self, info):
        return User.objects.all()
    
    def resolve_me(self, info):
        user = get_user(info)
        if not user:
            raise Exception('Not logged!')

        return user


